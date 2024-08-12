// Backend: index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User'); 
const Post = require('./models/Post') 
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const uploadMiddleware = multer(({dest:'uploads'}))
const fs = require('fs')
require('dotenv').config();


const app= express();
app.use('/uploads',express.static(__dirname+'/uploads')); 

const port = process.env.PORT || 4000;


app.use(cors({
    credentials: true,
    origin: 'https://blog-mern-ten.vercel.app'
  }));
app.use(express.json());
app.use(cookieParser());


mongoose.connect(process.env.MONGODB_URI)

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).json({'message': 'Username and password are required'});
    }
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return res.status(409).json({'message': 'Username already exists'});
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const userDoc = await User.create({username, password: hashedPwd});
        res.status(201).json({'success':`New user ${username} created!`});
    } catch (e) {
        res.status(500).json({ 'message': e.message });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required' });
    }
    try {
        const foundUser = await User.findOne({ username: username });
        if (!foundUser) {
            return res.status(401).json({ 'message': 'Unauthorized' });
        }
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            const token = jwt.sign(
                { id: foundUser._id, username: foundUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            
            res.cookie('token', token, { 
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 3600000 // 1 hour
            });

            res.json({
                id: foundUser._id,
                username: foundUser.username
            });
        } else {
            res.status(401).json({ 'message': 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ 'message': 'No token provided' });
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ 'message': 'Invalid token' });
        }
        res.json(decoded);
    });
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', { 
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(0)
    });
    res.json({ 'message': 'Logged out successfully' });
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    try {
        const BACKEND_URL = 'https://blog-mern-z9vc.onrender.com'; 
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);

        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ 'message': 'No token provided' });
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async (err, decoded) => {
            if (err) {
                return res.status(401).json({ 'message': 'Invalid token' });
            }
            const { title, summary, content } = req.body;
            const postDoc = await Post.create({
                title,
                summary,
                content,
                cover: `${BACKEND_URL}/${newPath}`,
                author:decoded.id,
            });
            res.json(postDoc); 
            
        });
       
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
    }
});

app.put('/post', uploadMiddleware.single('file'), async(req, res) => {
    let newPath = null;
    if (req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ 'message': 'No token provided' });
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ 'message': 'Invalid token' });
        }
        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        
        if (!postDoc) {
            return res.status(404).json({ 'message': 'Post not found' });
        }

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);
        
        if (!isAuthor) {
            return res.status(403).json({ 'message': 'You are not the author of this post' });
        }

        // Update the post
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        if (newPath) {
            postDoc.cover = newPath;
        }

        await postDoc.save();
        
        res.json(postDoc);
    });
});

app.get('/post', async (req, res) => {
    const posts = await Post.find().populate('author', ['username']).sort({createdAt:-1}).limit(20);
    const postsWithFullImageUrls = posts.map(post => ({
      ...post.toObject(),
      cover: post.cover.startsWith('http') ? post.cover : `${BACKEND_URL}/${post.cover}`
    }));
    res.json(postsWithFullImageUrls);
  });

app.get('/post/:id', async (req, res)=>{
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        try {
            const postDoc = await Post.findById(id);

            if (!postDoc) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Ensure the requesting user is the author
            if (postDoc.author.toString() !== decoded.id) {
                return res.status(403).json({ message: 'You are not the author of this post' });
            }

            // Attempt to delete the file
            const filePath = postDoc.cover;
            fs.unlink(filePath, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error deleting file');
                }

                // Only delete the post if file deletion was successful
                await Post.deleteOne({ _id: id });
                res.json({ message: 'Post and associated file deleted successfully' });
            });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
});


app.listen(4000);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user'); 
const Post = require('./models/Post') 
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const uploadMiddleware = multer(({dest:'uploads'}))
const fs = require('fs')
require('dotenv').config();


const app= express();


app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' // Replace with your React app's URL
  }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://kishorekumar:CmW0OOdztrUsmV2R@cluster0.ka4pzx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

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
        // If no existing user, create new user
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
        console.log(decoded);
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
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
        });
        res.json(postDoc); // Send only one response
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
    }
});

app.get('/post',async (req,res)=>{
    const posts = await Post.find();
    res.json(posts);
})



app.listen(4000);
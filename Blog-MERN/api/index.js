const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');  
const bcrypt = require('bcrypt');
const app= express();


app.use(cors());
app.use(express.json());

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

app.listen(4000);
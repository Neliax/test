const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/user');
const router = express.Router();

const secretKey = 'your_jwt_secret_key';

// Register route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send('User registered');
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).send('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;

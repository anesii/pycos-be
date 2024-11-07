// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const admin = require('./firebase');
const app = express();
const auth = require('./auth');

const router = express.Router();

// Sign Up
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password || password.length < 8) {
        return res.status(400).send('Invalid input');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in Firebase
    try {
        await admin.firestore().collection('users').add({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    // Fetch user from Firebase
    const userSnapshot = await admin.firestore().collection('users')
        .where('email', '==', usernameOrEmail)
        .get();

    if (userSnapshot.empty) {
        return res.status(404).send('User not found');
    }

    const user = userSnapshot.docs[0].data();

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send('Invalid credentials');
    }

    // Generate JWT (not implemented yet)
    res.send('Login successful');
});

// Logout
router.post('/logout', (req, res) => {
    // Invalidate JWT on the client side
    res.status(200).send('Logged out successfully');
});

module.exports = router;
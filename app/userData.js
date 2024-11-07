// userData.js
const express = require('express');
const admin = require('./firebase');

const router = express.Router();

// Store User Input
router.post('/store', async (req, res) => {
    const { userId, data } = req.body;

    // Validate input
    if (!userId || !data) {
        return res.status(400).send('Invalid input');
    }

    try {
        await admin.firestore().collection('userInputs').add({
            userId,
            data,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        res.status(201).send('Data stored successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error storing data');
    }
});

// Fetch User Input
router.get('/fetch/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const inputSnapshot = await admin.firestore().collection('userInputs')
            .where('userId', '==', userId)
            .get();

        if (inputSnapshot.empty) {
            return res.status(404).send('No data found');
        }

        const inputs = inputSnapshot.docs.map(doc => doc.data());
        res.status(200).json(inputs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

// Update Username
router.put('/update/username', async (req, res) => {
    const { userId, newUsername } = req.body;

    // Validate input
    if (!userId || !newUsername) {
        return res.status(400).send('Invalid input');
    }

    try {
        const userRef = admin.firestore().collection('users').doc(userId);
        await userRef.update({ username: newUsername });
        res.status(200).send('Username updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating username');
    }
});

// Update Password
router.put('/update/password', async (req, res) => {
    const { userId, newPassword } = req.body;

    // Validate input
    if (!userId || !newPassword || newPassword.length < 8) {
        return res.status(400).send('Invalid input');
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const userRef = admin.firestore().collection('users').doc(userId);
        await userRef.update({ password: hashedPassword });
        res.status(200).send('Password updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating password');
    }
});

module.exports = router;
// forum.js
const express = require('express');
const admin = require('./firebase');

const router = express.Router();

// Send Chat Message
router.post('/send', async (req, res) => {
    const { userId, message } = req.body;

    // Validate input
    if (!userId || !message) {
        return res.status(400).send('Invalid input');
    }

    try {
        await admin.firestore().collection('chats').add({
            userId,
            message,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        res.status(201).send('Message sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending message');
    }
});

// Fetch Chat Messages
router.get('/fetch', async (req, res) => {
    try {
        const chatSnapshot = await admin.firestore().collection('chats').orderBy('createdAt').get();

        const chats = chatSnapshot.docs.map(doc => doc.data());
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching messages');
    }
});

// Reply to Post (Assuming replies are stored in the same collection)
router.post('/reply', async (req, res) => {
    const { userId, message, parentId } = req.body;

    // Validate input
    if (!userId || !message || !parentId) {
        return res.status(400).send('Invalid input');
    }

    try {
        await admin.firestore().collection('chats').add({
            userId,
            message,
            parentId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        res.status(201).send('Reply sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending reply');
    }
});

// Like Chat Message
router.post('/like', async (req, res) => {
    const { userId, messageId } = req.body;

    // Validate input
    if (!userId || !messageId) {
        return res.status(400).send('Invalid input');
    }

    try {
        const chatRef = admin.firestore().collection('chats').doc(messageId);
        await chatRef.update({
            likes: admin.firestore.FieldValue.arrayUnion(userId),
        });
        res.status(200).send('Message liked successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error liking message');
    }
});

module.exports = router;
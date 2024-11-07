// exerciseSupplement.js
const express = require('express');
const admin = require('./firebase');

const router = express.Router();

// Fetch Exercises
router.get('/exercises/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const exercisesSnapshot = await admin.firestore().collection('exercises')
            .where('userId', '==', userId)
            .get();

        if (exercisesSnapshot.empty) {
            return res.status(404).send('No exercises found');
        }

        const exercises = exercisesSnapshot.docs.map(doc => doc.data());
        res.status(200).json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching exercises');
    }
});

module.exports = router;
// exerciseSupplement.js
const express = require('express');
const admin = require('./firebase');

const router = express.Router();


// Fetch Supplements
router.get('/supplements/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const supplementsSnapshot = await admin.firestore().collection('supplements')
            .where('userId', '==', userId)
            .get();

        if (supplementsSnapshot.empty) {
            return res.status(404).send('No supplements found');
        }

        const supplements = supplementsSnapshot.docs.map(doc => doc.data());
        res.status(200).json(supplements);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching supplements');
    }
});

module.exports = router;
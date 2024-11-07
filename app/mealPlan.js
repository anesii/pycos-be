// mealPlan.js
const express = require('express');
const axios = require('axios');
const admin = require('./firebase');

const router = express.Router();

// Generate Meal Plan
router.post('/generate', async (req, res) => {
    const { userId, goals } = req.body; // Assuming goals are sent from the frontend

    // Validate input
    if (!userId || !goals) {
        return res.status(400).send('Invalid input');
    }

    try {
        // Call Gemini API to generate meal plan
        const response = await axios.post('https://api.gemini.com/generate-meal-plan', {
            goals,
            apiKey: process.env.GEMINI_API_KEY, // Use your actual API key
        });

        const mealPlan = response.data;

        // Store meal plan in Firebase
        await admin.firestore().collection('mealPlans').add({
            userId,
            mealPlan,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        res.status(201).send('Meal plan generated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating meal plan');
    }
});

// Fetch Meal Plan
router.get('/fetch/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const mealPlanSnapshot = await admin.firestore().collection('mealPlans')
            .where('userId', '==', userId)
            .get();

        if (mealPlanSnapshot.empty) {
            return res.status(404).send('No meal plan found');
        }

        const mealPlans = mealPlanSnapshot.docs.map(doc => doc.data());
        res.status(200).json(mealPlans);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching meal plan');
    }
});

module.exports = router;
// In your backend server file (e.g., server.js)
const express = require('express');
const cors = require('cors');
const authRoutes = require('./auth');
const mealPlanRoutes = require('./mealPlan');
const exerciseRoutes = require('./exercise');
const supplementRoutes = require('./supplement');
const forumRoutes = require('./forum');
const userDataRoutes = require('./userData');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use('/api/auth', authRoutes);
app.use('/api/mealPlan', mealPlanRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/supplement', supplementRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/userData', userDataRoutes);

// Set up a basic route
app.get('/', (req, res) => {
    res.send('Hello World!'); // Respond with a message
});

// Start the server
// Start the server
const PORT = 3001; 
console.log(`Attempting to start server on port: ${PORT}`); // Log the port being used
app.listen(PORT, (err) => {
    if (err) {
        return console.error('Error starting server:', err); // Log any errors
    }
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server status
});
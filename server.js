// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const bookRoutes = require('./routes/bookRoutes');

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// --- Database Connection ---
// Fetches the MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI;

// Check if the MONGO_URI is defined
if (!mongoURI) {
  console.error("MONGO_URI is not defined in the .env file.");
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

// --- API Routes ---
// Use the book routes for any requests to /api/books
app.use('/api/books', bookRoutes);

// Simple route for the root URL to confirm the server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System API!');
});


// --- Server Initialization ---
// Fetches the port from environment variables, defaults to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

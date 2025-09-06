const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.create({ username, password, role });
        
        const token = generateToken(user);

        res.status(201).json({ success: true, token });
    } catch (error) {
        let message = 'Something went wrong. Please try again.';

        // --- IMPROVED ERROR HANDLING ---
        // Check for the MongoDB duplicate key error code
        if (error.code === 11000) {
            message = 'A user with that username already exists.';
        } else if (error.message) {
            // Use the more specific Mongoose validation error message if available
            message = error.message;
        }

        res.status(400).json({ success: false, message: message });
    }
};

// @desc    Login a user
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Please provide username and password' });
        }

        const user = await User.findOne({ username }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const token = generateToken(user);

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


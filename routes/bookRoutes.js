// Import required modules
const express = require('express');
const router = express.Router();

// Import controller functions
const {
  addBook,
  getAllBooks,
  borrowBook,
  returnBook
} = require('../controllers/bookController');

// --- Route Definitions ---

// @route   POST /api/books
// @desc    Add a new book
router.post('/', addBook);

// @route   GET /api/books
// @desc    Get all books (can be filtered by availability)
router.get('/', getAllBooks);

// @route   PATCH /api/books/:id/borrow
// @desc    Borrow a book
router.patch('/:id/borrow', borrowBook);

// @route   PATCH /api/books/:id/return
// @desc    Return a book
router.patch('/:id/return', returnBook);

// Export the router
module.exports = router;

// Import required modules
const express = require('express');
const router = express.Router();
const {
  addBook,
  getAllBooks,
  borrowBook,
  returnBook
} = require('../controllers/bookController');

// Import middleware
const { protect, authorize } = require('../middleware/authMiddleware');

// Only an Admin can add a book
router.post('/', protect, authorize('Admin'), addBook);

// Anyone can get books
router.get('/', getAllBooks);

// Any authenticated user can borrow or return
router.patch('/:id/borrow', protect, borrowBook);
router.patch('/:id/return', protect, returnBook);

// Export the router
module.exports = router;

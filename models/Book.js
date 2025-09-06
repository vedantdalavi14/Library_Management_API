// Import Mongoose
const mongoose = require('mongoose');

// Define the Schema for a book
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true // Removes whitespace from both ends of a string
  },
  author: {
    type: String,
    required: [true, 'Please provide an author'],
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'Please provide an ISBN'],
    unique: true, // Ensures ISBN is unique
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true // A new book is available by default
  }
}, {
  // Adds createdAt and updatedAt timestamps
  timestamps: true
});

// Create and export the Book model
// Mongoose will create a collection named 'books' in the database
module.exports = mongoose.model('Book', BookSchema);

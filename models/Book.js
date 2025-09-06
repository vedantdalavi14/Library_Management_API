const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Please provide an author'],
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'Please provide an ISBN'],
    unique: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Book', BookSchema);


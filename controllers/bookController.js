// Import the Book model
const Book = require('../models/Book');

// --- Controller Functions ---

/**
 * @desc    Add a new book to the library
 * @route   POST /api/books
 * @access  Public
 */
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn } = req.body;

    // Basic validation
    if (!title || !author || !isbn) {
      return res.status(400).json({ success: false, message: 'Please provide title, author, and ISBN' });
    }

    // Check if a book with the same ISBN already exists
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
        return res.status(400).json({ success: false, message: 'A book with this ISBN already exists' });
    }

    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      isbn,
      isAvailable: true // By default, a new book is available
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    // Respond with the created book data
    res.status(201).json({ success: true, data: savedBook });

  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Get all books, with an option to filter for available books
 * @route   GET /api/books or /api/books?status=available
 * @access  Public
 */
exports.getAllBooks = async (req, res) => {
  try {
    let query = {};

    // Check if the user wants to fetch only available books
    if (req.query.status === 'available') {
      query.isAvailable = true;
    }

    const books = await Book.find(query);

    res.status(200).json({ success: true, count: books.length, data: books });

  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

/**
 * @desc    Borrow a book
 * @route   PATCH /api/books/:id/borrow
 * @access  Public
 */
exports.borrowBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    // Check if the book exists
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Check if the book is already borrowed
    if (!book.isAvailable) {
      return res.status(400).json({ success: false, message: 'Book is already borrowed' });
    }

    // Update the book's availability status
    book.isAvailable = false;
    const updatedBook = await book.save();

    res.status(200).json({ success: true, message: `Successfully borrowed '${book.title}'`, data: updatedBook });

  } catch (error) {
    console.error("Error borrowing book:", error);
    // Handle potential CastError for invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Invalid book ID' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


/**
 * @desc    Return a book
 * @route   PATCH /api/books/:id/return
 * @access  Public
 */
exports.returnBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    // Check if the book exists
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    // Check if the book is already available
    if (book.isAvailable) {
      return res.status(400).json({ success: false, message: 'Book is already available' });
    }

    // Update the book's availability status
    book.isAvailable = true;
    const updatedBook = await book.save();

    res.status(200).json({ success: true, message: `Successfully returned '${book.title}'`, data: updatedBook });

  } catch (error) {
    console.error("Error returning book:", error);
    // Handle potential CastError for invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, message: 'Invalid book ID' });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

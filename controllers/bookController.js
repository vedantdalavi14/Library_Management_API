const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /api/books
exports.addBook = async (req, res) => {
    try {
        const { title, author, isbn } = req.body;
        const book = await Book.create({ title, author, isbn });
        res.status(201).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all books (with filter for availability)
// @route   GET /api/books
exports.getAllBooks = async (req, res) => {
    try {
        let query = {};
        if (req.query.status === 'available') {
            query.isAvailable = true;
        }
        const books = await Book.find(query);
        res.status(200).json({ success: true, count: books.length, data: books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Borrow a book
// @route   PATCH /api/books/:id/borrow
exports.borrowBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        if (!book.isAvailable) {
            return res.status(400).json({ success: false, message: 'Book is already borrowed' });
        }
        
        book.isAvailable = false;
        book.borrowedBy = req.user.id; // Assign the logged-in user's ID
        await book.save();
        
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Return a book
// @route   PATCH /api/books/:id/return
exports.returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        if (book.isAvailable) {
            return res.status(400).json({ success: false, message: 'Book is already available' });
        }

        // Check if the user trying to return the book is the one who borrowed it
        if (book.borrowedBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'You cannot return a book you did not borrow' });
        }

        book.isAvailable = true;
        book.borrowedBy = null; // Clear the borrower's ID
        await book.save();

        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


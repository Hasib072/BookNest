// backend/routes/bookRoutes.js

import express from 'express';
import { createBook, getBooks, getBookById } from '../controllers/bookController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import upload from '../middleware/upload.js';
import { Book } from '../models/bookModel.js';


const router = express.Router();

/**
 * @route   POST /api/books
 * @desc    Create a new book (Protected Route)
 * @access  Private/Admin
 */
router.post('/', verifyToken, upload.single('cover'), async (req, res) => {
    try {
        const { title, author, rating, description, tags, isFeatured, genre } = req.body;

        // Validate required fields
        if (!title || !author || !rating || !description || !genre) {
            return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
        }

        // Check if book already exists
        const existingBook = await Book.findOne({ title, author });
        if (existingBook) {
            return res.status(400).json({ success: false, message: 'Book already exists.' });
        }

        // Ensure an image was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Book cover image is required.' });
        }

        // Parse and validate 'rating'
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
            return res.status(400).json({ success: false, message: 'Rating must be a number between 0 and 5.' });
        }

        // Parse 'isFeatured' to Boolean
        const parsedIsFeatured = isFeatured === 'true' || isFeatured === true;

        // Create new book
        const newBook = new Book({
            title,
            author,
            rating: parsedRating,
            cover: `/uploads/book_covers/${req.file.filename}`, // Relative URL to access the image
            description,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isFeatured: parsedIsFeatured,
            genre,
        });

        await newBook.save();

        res.status(201).json({ success: true, message: 'Book created successfully.', book: newBook });
    } catch (error) {
        console.error('CreateBook Error:', error.message, error.stack);
        res.status(500).json({ success: false, message: 'Internal Server Error while creating book.', error: error.message });
    }
});

/**
 * @route   GET /api/books
 * @desc    Retrieve all books with search and filter functionality
 * @access  Public
 */
router.get('/', getBooks);

/**
 * @route   GET /api/books/:id
 * @desc    Retrieve a single book by ID
 * @access  Public
 */
router.get('/:id', getBookById);

export default router;

// backend/controllers/bookController.js

import { Book } from '../models/bookModel.js';

/**
 * @desc    Create a new book
 * @route   POST /api/books
 * @access  Private/Admin
 */
export const createBook = async (req, res) => {
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
        if (!req.file || !req.file.path) {
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
            cover: req.file.path, // Cloudinary URL
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
};

/**
 * @desc    Retrieve all books with search and filter
 * @route   GET /api/books
 * @access  Public
 */
export const getBooks = async (req, res) => {
    try {
        const { search, genre } = req.query;
        const query = {};

        if (search) {
            // Case-insensitive search on title and author
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
              ];
        }

        if (genre) {
            query.genre = genre;
        }

        const books = await Book.find(query).sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({ success: true, count: books.length, books });
    } catch (error) {
        console.error('GetBooks Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error while fetching books.' });
    }
};

/**
 * @desc    Retrieve a single book by ID
 * @route   GET /api/books/:id
 * @access  Public
 */
export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found.' });
        }

        res.status(200).json({ success: true, book });
    } catch (error) {
        console.error('GetBookById Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error while fetching the book.' });
    }
};

// backend/controllers/reviewController.js

import { Review } from '../models/reviewModel.js';
import { Book } from '../models/bookModel.js';
import asyncHandler from 'express-async-handler'; // To handle async errors

// @desc    Get reviews by book ID or user ID
// @route   GET /reviews?book=bookId OR /reviews?user=userId
// @access  Public
const getReviews = asyncHandler(async (req, res) => {
  const { book, user } = req.query;

  let filter = {};
  if (book) {
    filter.book = book;
  }
  if (user) {
    filter.user = user;
  }

  const reviews = await Review.find(filter)
    .populate('user', 'name') // Populate user's name
    .populate('book', 'title author cover'); // Populate book's title

  res.json({ reviews });
});

// @desc    Create a new review
// @route   POST /reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { book, rating, comment } = req.body;

  // Validate input
  if (!book || !rating || !comment) {
    res.status(400);
    throw new Error('Please provide book ID, rating, and comment');
  }

  // Check if the book exists
  const bookExists = await Book.findById(book);
  if (!bookExists) {
    res.status(404);
    throw new Error('Book not found');
  }

  // Check if the user has already reviewed the book
  const alreadyReviewed = await Review.findOne({ book, user: req.userID });
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this book');
  }

  // Create the review
  const review = await Review.create({
    book,
    user: req.userID,
    rating,
    comment,
  });

  // Update book's average rating and number of reviews
  const reviews = await Review.find({ book });
  const numReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / numReviews;

  bookExists.numReviews = numReviews;
  bookExists.averageRating = averageRating.toFixed(1);
  await bookExists.save();

  res.status(201).json({ message: 'Review added successfully' });
});

export { getReviews, createReview };

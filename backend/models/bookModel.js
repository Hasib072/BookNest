// backend/models/bookModel.js

import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Book title is required'],
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
        },
        rating: {
            type: Number,
            required: [true, 'Book rating is required'],
            min: [0, 'Rating must be at least 0'],
            max: [5, 'Rating cannot exceed 5'],
        },
        averageRating: {
            type: Number,
            default: 0,
            min: [0, 'Average rating cannot be less than 0'],
            max: [5, 'Average rating cannot exceed 5'],
          },
        numReviews: {
          type: Number,
          default: 0,
        },
        cover: {
            type: String,
            required: [true, 'Book cover image URL is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Book description is required'],
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        genre: {
            type: String,
            required: [true, 'Book genre is required'],
            trim: true,
            enum: [
                'Classic',
                'Fiction',
                'Drama',
                'Mystery',
                'Fantasy',
                'Non-Fiction',
                'Sci-Fi',
                'Biography',
                'Romance',
                'Thriller',
                // Add more genres as needed
            ],
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt fields
    }
);

// Virtual field to populate reviews
bookSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'book',
});

export const Book = mongoose.model('Book', bookSchema);

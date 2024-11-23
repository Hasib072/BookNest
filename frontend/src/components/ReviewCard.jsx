// frontend/src/components/ReviewCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import defaultBookCover from '../assets/bookplaceholder.png'; // Ensure you have a default cover image

const ReviewCard = ({ review }) => {
    const { book, rating, comment } = review;
    console.log(review);

    // Handle missing 'book' gracefully
    if (!book) {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
                {/* Placeholder for Missing Book */}
                <div className="md:w-1/4 w-full flex items-center justify-center bg-gray-200">
                    <p className="text-gray-500">Book Information Unavailable</p>
                </div>

                {/* Review Details */}
                <div className="p-4 md:w-3/4 w-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Unknown Book</h3>
                        <p className="text-gray-600 mb-2">by Unknown Author</p>
                        <div className="flex items-center mb-2">
                            {Array.from({ length: 5 }, (_, index) => (
                                <FaStar
                                    key={index}
                                    className={`${
                                        index < rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                />
                            ))}
                            <span className="ml-2 text-gray-700">{rating}/5</span>
                        </div>
                    </div>
                    <p className="text-gray-700 mt-2">{comment}</p>
                </div>
            </div>
        );
    }

    // Existing code for when 'book' exists
    const bookCover = book.cover
        ? `${import.meta.env.VITE_BACKEND_BASE_URI}${book.cover}`
        : defaultBookCover; // Use the default cover image

    const bookAuthor = book.author || 'Unknown Author'; // Fallback to 'Unknown Author' if missing

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            {/* Book Cover */}
            <div className="md:w-1/4 w-full">
                <img
                    src={bookCover}
                    alt={`${book.title} cover`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
            </div>

            {/* Review Details */}
            <div className="p-4 md:w-3/4 w-full flex flex-col justify-between">
                <div className='text-left'>
                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600 mb-2">by {bookAuthor}</p>
                    <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }, (_, index) => (
                            <FaStar
                                key={index}
                                className={`${
                                    index < rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                            />
                        ))}
                        <span className="ml-2 text-gray-700">{rating}/5</span>
                    </div>
                </div>
                <p className="text-gray-700 mt-2 text-left">{comment}</p>
            </div>
        </div>
    );
};

ReviewCard.propTypes = {
    review: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        book: PropTypes.shape({
            title: PropTypes.string.isRequired,
            author: PropTypes.string,
            cover: PropTypes.string,
        }).isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
    }).isRequired,
};

export default ReviewCard;

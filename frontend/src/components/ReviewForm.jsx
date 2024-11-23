// frontend/src/components/ReviewForm.jsx

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import API from '../api'; // Import the API instance

const ReviewForm = ({ bookId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // For success/error messages

  const submitReview = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '') {
      setMessage({ type: 'error', text: 'Please provide a rating and comment.' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      const reviewData = { book: bookId, rating, comment };
      await API.post('/reviews', reviewData);
      setRating(0);
      setComment('');
      setHover(null);
      setLoading(false);
      setMessage({ type: 'success', text: 'Review submitted successfully.' });
      onReviewSubmit(); // Refresh reviews after submission
    } catch (error) {
      setLoading(false);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to submit review.',
      });
    }
  };

  return (
    <form onSubmit={submitReview} className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">Add a Review</h3>

      {/* Rating */}
      <div className="flex items-center mb-4">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={`cursor-pointer focus:outline-none ${
                index <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
              aria-label={`Rate ${index} star${index > 1 ? 's' : ''}`}
            >
              <FaStar size={24} />
            </button>
          );
        })}
      </div>

      {/* Comment */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          required
          aria-label="Review comment"
        ></textarea>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;

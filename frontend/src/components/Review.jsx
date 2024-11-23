// frontend/src/components/Review.jsx

import React from 'react';
import { FaStar } from 'react-icons/fa';
import Highlighter from 'react-highlight-words'; // For highlighting search terms

const Review = ({ review, searchQuery }) => {
  // Split searchQuery into words for highlighting
  const searchWords = searchQuery ? searchQuery.trim().split(' ') : [];

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        {/* User Name */}
        <h4 className="text-md font-semibold">
          {review.user.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-md">{review.rating}</span>
        </div>
      </div>

      {/* Comment */}
      <p className="text-gray-700">
        <Highlighter
          highlightClassName="bg-yellow-200"
          searchWords={searchWords}
          autoEscape={true}
          textToHighlight={review.comment}
        />
      </p>

      {/* Timestamp */}
      <p className="text-sm text-gray-500 mt-2">
        {new Date(review.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Review;

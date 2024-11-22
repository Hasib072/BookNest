// frontend/src/components/BookOverview.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const BookOverview = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center">
      {/* Book Cover Image */}
      <img
        src={`${BACKEND_BASE_URI}${book.cover}`}
        alt={`${book.title} cover`}
        className="w-40 h-60 object-cover rounded-md mb-4 md:mb-0 md:mr-6 flex-shrink-0"
        loading="lazy"
      />
      
      {/* Book Details */}
      <div className="flex flex-col items-center md:items-start">
        <h3 className="text-lg font-lora font-semibold text-gray-800 mb-2 text-center md:text-left">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2 text-center md:text-left">
          by {book.author}
        </p>
        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-gray-700">
            {book.rating}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 text-center md:text-left">
          {book.description}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start">
          {book.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookOverview;

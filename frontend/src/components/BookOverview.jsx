// frontend/src/components/BookOverview.jsx
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

const BookOverview = ({ book, searchQuery }) => {
  // State to manage whether the description is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  // Description limit parameter
  const DESCRIPTION_LIMIT = 122; // Maximum number of characters to display in the description

  // Function to toggle the expanded state
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine if the description needs to be truncated
  const isLongDescription = book.description.length > DESCRIPTION_LIMIT;

  // Truncated description based on the limit
  const truncatedDescription = isLongDescription
    ? book.description.slice(0, DESCRIPTION_LIMIT) + '...'
    : book.description;

  const searchWords = searchQuery ? searchQuery.split(' ').filter(word => word) : [];

  return (
    <Link to={`/books/${book._id}`} className="w-full">
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
          <Highlighter
            highlightClassName="bg-yellow-200"
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={book.title}
          />
        </h3>
        <p className="text-sm text-gray-500 mb-2 text-center md:text-left">
          by 
          <Highlighter
            highlightClassName="bg-yellow-200"
            searchWords={searchWords}
            autoEscape={true}
            textToHighlight={book.author}
          />
        </p>
        <div className="flex items-center mb-4">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-sm font-medium text-gray-700">
            {book.rating}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-4 text-center md:text-left">
          {isExpanded || !isLongDescription
            ? book.description
            : truncatedDescription}
          {isLongDescription && (
            <span
              // onClick={toggleDescription}
              className="text-blue-500 cursor-pointer ml-1 hover:underline focus:outline-none"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Read less about the book' : 'Read more about the book'}
            >
              {isExpanded ? ' read less.' : ' read more.'}
            </span>
          )}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start">
          {book.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full mr-2 mb-2"
            >
              <Highlighter
              highlightClassName="bg-yellow-200"
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={tag}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default BookOverview;

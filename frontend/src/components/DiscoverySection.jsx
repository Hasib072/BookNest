// frontend/src/components/DiscoverySection.jsx

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // For prop type validation
import { Link } from 'react-router-dom'; // For navigation
import BookOverview from './BookOverview';
import Loader from './Loader'; // Ensure you have a Loader component

const DiscoverySection = ({ allBooks, loading, error }) => {
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [numberOfBooks, setNumberOfBooks] = useState(4); // Variable to set how many books to display

  // Define the categories
  const categories = [
    'Featured',
    'Fantasy',
    'Romance',
    'Science Fiction',
    'Young Adult',
    'Mystery & Crime',
    'Thriller & Suspense',
    'Non-Fiction',
  ];

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setNumberOfBooks(4); // Reset number of books when category changes
  };

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === 'Featured'
      ? allBooks.filter((book) => book.isFeatured)
      : allBooks.filter((book) => book.genre === selectedCategory);

  // Slice the books based on the numberOfBooks variable
  const booksToDisplay = filteredBooks.slice(0, numberOfBooks);

  // Optional: If you decide to keep "Load More" functionality in the future
  /*
  const handleLoadMore = () => {
    setNumberOfBooks((prev) => prev + 4);
  };
  */

  return (
    <section className="py-12 bg-gray-100 min-h-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-lora font-bold text-center text-gray-600 mb-6">
          Recently Discovered
        </h2>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-lg p-2 flex flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`m-2 px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-yellow-400 hover:text-white transition-colors duration-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Book Overview Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="flex justify-center items-center col-span-full">
              <Loader /> {/* Display loader while fetching */}
            </div>
          ) : error ? (
            <div className="text-red-500 text-center col-span-full">{error}</div>
          ) : booksToDisplay.length > 0 ? (
            booksToDisplay.map((book) => (
              <BookOverview key={book._id} book={book} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No books found in this category.
            </p>
          )}
        </div>

        {/* View More Button */}
        {filteredBooks.length > numberOfBooks && (
          <div className="mt-8 flex justify-center">
            <Link
              to="/explore"
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors duration-300"
            >
              View More
            </Link>
          </div>
        )}

        {/* Optional: Uncomment if you want to keep "Load More" functionality */}
        {/*
        {filteredBooks.length > numberOfBooks && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
        */}
      </div>
    </section>
  );
};

// Prop type validation
DiscoverySection.propTypes = {
  allBooks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      isFeatured: PropTypes.bool,
      averageRating: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

DiscoverySection.defaultProps = {
  loading: false,
  error: null,
};

export default DiscoverySection;

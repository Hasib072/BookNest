// frontend/src/components/DiscoverySection.jsx
import React, { useState } from 'react';
import booksData from '../data/booksData';
import BookOverview from './BookOverview';

const DiscoverySection = () => {
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
  };

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === 'Featured'
      ? booksData.filter((book) => book.isFeatured)
      : booksData.filter((book) => book.genre === selectedCategory);

  // Slice the books based on the numberOfBooks variable
  const booksToDisplay = filteredBooks.slice(0, numberOfBooks);

  return (
    <section className="py-12 bg-gray-100 min-h-screen">
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
          {booksToDisplay.length > 0 ? (
            booksToDisplay.map((book) => (
              <BookOverview key={book.id} book={book} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No books found in this category.
            </p>
          )}
        </div>

        {/* Load More Button (Optional) */}
        {filteredBooks.length > numberOfBooks && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setNumberOfBooks(numberOfBooks + 4)}
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition-colors duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DiscoverySection;

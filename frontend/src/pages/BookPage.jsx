// frontend/src/pages/BookPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api'; // Axios instance
import Loader from '../components/Loader';
import { FaStar } from 'react-icons/fa';
import Highlighter from 'react-highlight-words'; // For highlighting search terms

const BookPage = () => {
  const { id } = useParams(); // Extract the book ID from the URL
  const [book, setBook] = useState(null); // State to store book details
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await API.get(`/books/${id}`); // Fetch book by ID
        setBook(response.data.book); // Assuming the backend returns { book: {...} }
        setLoading(false);
      } catch (err) {
        console.error('Fetch Book Error:', err);
        setError(err.response?.data?.message || 'Failed to fetch book details.');
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <Loader />; // Display loader while fetching
  }

  if (error) {
    return (
      <div className="error-message text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="no-book text-center mt-10">
        Book not found.
      </div>
    );
  }

  return (
    <div className="book-page-container">
      {/* Banner Section */}
      <div
        className="relative w-full min-h-96 bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_BACKEND_BASE_URI}${book.cover})`,
        }}
      >
        {/* Overlay for Blur and Darken Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
        {/* Content within the Banner */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
          <div className='block sm:hidden h-20 container mx-auto px-4 items-center justify-center'></div>
            {/* Left Side: Book Cover */}
            <img
              src={`${import.meta.env.VITE_BACKEND_BASE_URI}${book.cover}`}
              alt={`${book.title} cover`}
              className="w-40 h-60 object-cover rounded-md shadow-lg mb-4 md:mb-0 md:mr-8"
              loading="lazy"
            />

            {/* Right Side: Book Details */}
            <div className="text-center md:text-left text-white">
              {/* Genre */}
              <p className="text-sm uppercase tracking-wide mb-2">
                {book.genre}
              </p>

              {/* Book Title */}
              <h1 className="text-3xl font-bold mb-2">
                {book.title}
              </h1>

              {/* Author and Rating */}
              <div className="flex items-center justify-center md:justify-start">
                {/* Author */}
                <p className="text-md mr-4">
                  by {book.author}
                </p>

                {/* Rating */}
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-md">{book.rating}</span>
                </div>
              </div>
            </div>
            <div className='block sm:hidden h-20 container mx-auto px-4 items-center justify-center'></div>
          </div>
        </div>
      </div>

        <div className='mx-auto w-[70%]'>

            {/* Description Section */}
            <div className="container mx-auto px-4 py-8">
              {/* Description Title */}
              <h2 className="text-2xl font-semibold mb-4 text-left">
                Description
              </h2>

              {/* Book Description */}
              <p className="text-gray-700 leading-relaxed text-justify">
                {book.description}
              </p>
            </div>

      </div>
    </div>
  );
};

export default BookPage;

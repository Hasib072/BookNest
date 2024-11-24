// frontend/src/pages/BookPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api'; // Axios instance
import Loader from '../components/Loader';
import { FaStar } from 'react-icons/fa';
import Review from '../components/Review'; // Import Review component
import ReviewForm from '../components/ReviewForm'; // Import ReviewForm component
import FooterComponent from '../components/FooterComponent';

const BookPage = () => {
  const { id } = useParams(); // Extract the book ID from the URL
  const [book, setBook] = useState(null); // State to store book details
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [loading, setLoading] = useState(true); // State for loading book data
  const [error, setError] = useState(null); // State for book errors

  const [userProfile, setUserProfile] = useState(null); // State to store user profile
  const [isUserLoading, setIsUserLoading] = useState(true); // State for loading user data
  const [userError, setUserError] = useState(null); // State for user errors

  const [hasReviewed, setHasReviewed] = useState(false); // State to track if user has reviewed

  // Fetch Book Details
  const fetchBook = async () => {
    try {
      const response = await API.get(`/books/${id}`); // Fetch book by ID
      setBook(response.data.book); // Assuming the backend returns { book: {...} }
    } catch (err) {
      console.error('Fetch Book Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch book details.');
    }
  };

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const response = await API.get(`/reviews?book=${id}`); // Fetch reviews for the book
      setReviews(response.data.reviews);
    } catch (err) {
      console.error('Fetch Reviews Error:', err);
      // Optionally set an error state for reviews
    }
  };

  // Fetch User Profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get('/users/profile'); // Adjust the endpoint as needed
        setUserProfile(response.data.user);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // User is not authenticated
          setUserProfile(null);
        } else {
          console.error('Fetch User Profile Error:', err);
          setUserError(err.response?.data?.message || 'Failed to fetch user profile.');
        }
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch Book and Reviews
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchBook();
      await fetchReviews();
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // Check if the user has already reviewed the book
  useEffect(() => {
    if (userProfile && reviews.length > 0) {
      const alreadyReviewed = reviews.some(
        (review) => review.user && review.user._id === userProfile._id
      );
      setHasReviewed(alreadyReviewed);
    } else {
      setHasReviewed(false);
    }
  }, [reviews, userProfile]);

  // Combined function to fetch both reviews and book
  const handleReviewSubmit = async () => {
    await fetchReviews();
    await fetchBook();
  };

  // Determine the state for review submission
  let reviewSection = null;

  // Properly log the user object
  console.log("AuthCheck User:", userProfile); // Proper logging

  if (isUserLoading || loading) {
    return <Loader />; // Display loader while fetching user profile or book data
  }

  // If there's a book error, display it
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

  if (userError) {
    // If there's a user error other than 401, display it
    return (
      <div className="error-message text-red-500 text-center mt-10">
        {userError}
      </div>
    );
  }

  if (!userProfile) {
    // User is not logged in
    reviewSection = (
      <p className="text-gray-600 mb-4">
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>{' '}
        to write a review.
      </p>
    );
  } else if (userProfile && !userProfile.isVerified) {
    // User is logged in but not verified
    reviewSection = (
      <p className="text-gray-600 mb-4">
        Your account is not verified.{' '}
        <Link to="/verify" className="text-blue-500 hover:underline">
          Verify your account
        </Link>{' '}
        to write a review.
      </p>
    );
  } else if (hasReviewed) {
    // User has already reviewed the book
    reviewSection = (
      <p className="text-gray-600 mb-4">
        You have already reviewed this book.
      </p>
    );
  } else {
    // User is logged in, verified, and has not reviewed the book
    reviewSection = (
      <ReviewForm bookId={id} onReviewSubmit={handleReviewSubmit} />
    );
  }

  return (
    <>
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
            {/* Spacer for Small Screens */}
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
              <h1 className="text-3xl font-lora font-bold mb-2">
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
                  <span className="text-md">{book.averageRating}</span>
                  <span className="text-sm text-gray-300 ml-1">
                    ({book.numReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Spacer for Small Screens */}
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

      {/* Reviews Section */}
      <div className="container mx-auto w-[70%] px-4 py-8">
        {/* Reviews Title */}
        <h2 className="text-2xl font-semibold mb-4 text-left">
          Reviews
        </h2>

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <Review key={review._id} review={review} searchQuery="" />
          ))
        )}

        {/* Conditional Review Section */}
        {reviewSection}
      </div>

    </div>
    <FooterComponent/>
    </>
  );
};

export default BookPage;

// frontend/src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TopRatedSection from '../components/TopRatedSection';
import DiscoverySection from '../components/DiscoverySection';
import API from '../api'; // Import your Axios instance
import Loader from '../components/Loader'; // Ensure you have a Loader component
import FooterComponent from '../components/FooterComponent';


const Home = () => {
  const [allBooks, setAllBooks] = useState([]); // State for all fetched books
  const [topRatedBooks, setTopRatedBooks] = useState([]); // State for top-rated books
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Function to fetch all books
  const fetchAllBooks = async () => {
    try {
      const response = await API.get('/books'); // Fetch all books from /api/books
      if (response.data.success) {
        setAllBooks(response.data.books);
      } else {
        setError('Failed to fetch books.');
      }
    } catch (err) {
      console.error('Fetch All Books Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch books.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllBooks();
    };

    fetchData();
  }, []);

  // Sort books by averageRating in descending order and select top 10
  useEffect(() => {
    if (allBooks.length > 0) {
      const sortedBooks = [...allBooks].sort(
        (a, b) => b.averageRating - a.averageRating
      );
      const top10Books = sortedBooks.slice(0, 10);
      setTopRatedBooks(top10Books);
      setLoading(false);
    }
  }, [allBooks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader /> {/* Display loader while fetching */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  return (
    <>
      <HeroSection />

      {/* Top Rated Section */}
      <TopRatedSection
        topRatedBooks={topRatedBooks}
        loading={loading}
        error={error}
      />

      {/* Discovery Section */}
      <DiscoverySection
        allBooks={allBooks}
        loading={loading}
        error={error}
      />
      <FooterComponent/>
    </>
  );
};

export default Home;

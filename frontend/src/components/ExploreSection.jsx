// frontend/src/components/ExploreSection.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import backgroundImage from '../assets/booknestHero03.webp'; // Primary Background Image
import './HeroSection.css'; // Import the CSS file (if needed for additional styles)
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { FaSearch } from "react-icons/fa"; // Import Search Icon
import API from '../api'; // Axios instance
import BookOverview from './BookOverview'; // Import the BookOverview component
import BookLoader from './BookLoader';
import debounce from 'lodash/debounce'; // Import debounce from lodash
import { useSearchParams } from 'react-router-dom'; // Import useSearchParams

const ExploreSection = () => {
    const [searchParams, setSearchParams] = useSearchParams(); // Initialize useSearchParams
    const initialSearch = searchParams.get('search') || ''; // Get 'search' param or default to ''
    const initialGenre = searchParams.get('genre') || 'All'; // Get 'genre' param or default to 'All'
    
    const [searchQuery, setSearchQuery] = useState(initialSearch); // Initialize search input with URL param
    const [genre, setGenre] = useState(initialGenre); // Initialize genre with URL param
    const [books, setBooks] = useState([]); // State for books
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for errors
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    
    const BOOKS_PER_PAGE = 8; // Number of books per page

    // List of genres for the filter dropdown
    const genres = [
        'All',
        'Classic',
        'Fiction',
        'Drama',
        'Mystery',
        'Fantasy',
        'Non-Fiction',
        'Sci-Fi',
        'Biography',
        'Romance',
        'Thriller',
        // Add more genres as needed
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true,
        });
        
    }, []);

    // Debounced fetchBooks function to prevent excessive API calls
    const debouncedFetchBooks = useCallback(
        debounce(() => {
            fetchBooks();
        }, 500), 
        [searchQuery, genre]
    );

    useEffect(() => {
        // Update URL search params
        const params = {};
        if (searchQuery.trim() !== '') {
            params.search = searchQuery.trim();
        }
        if (genre && genre !== 'All') {
            params.genre = genre;
        }
        setSearchParams(params);

        // Reset to first page when search query or genre changes
        setCurrentPage(1);

        // Fetch books whenever searchQuery or genre changes with debounce
        debouncedFetchBooks();

        // Cleanup the debounce on unmount
        return debouncedFetchBooks.cancel;
    }, [searchQuery, genre, debouncedFetchBooks, setSearchParams]);

    // Function to fetch books from the backend
    const fetchBooks = async () => {
        setLoading(true);
        console.log("fetch start Set to True");
        setError(null);
        try {
            // Construct query parameters
            const params = {};
            if (searchQuery.trim() !== '') params.search = searchQuery.trim();
            if (genre && genre !== 'All') params.genre = genre;

            const response = await API.get('/books', { params });
            setBooks(response.data.books);
            setLoading(false);
            console.log("Set to False");
        } catch (err) {
            console.error("Fetch Books Error:", err);
            setError(err.response?.data?.message || "Failed to fetch books.");
            setLoading(false);
            console.log("Set to False");
        }
    };

    // Handler for search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handler for genre change
    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };

    // Calculate total pages
    const totalPages = useMemo(() => {
        return Math.ceil(books.length / BOOKS_PER_PAGE);
    }, [books.length]);

    // Get current books for the page
    const currentBooks = useMemo(() => {
        const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
        const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
        return books.slice(indexOfFirstBook, indexOfLastBook);
    }, [currentPage, books]);

    // Handler for page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generate page numbers for pagination controls
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-md mx-1 ${
                        currentPage === i
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <>
            <div
                className="hero-container relative flex flex-col items-center justify-center bg-gray-100"
                style={{ 
                    minHeight: '400px',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} 
                data-aos="fade-in"
            >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col items-center w-full px-4">
                    
                    {/* Hero Text */}
                    <h1 className="text-5xl md:text-7xl font-lora font-bold text-white text-center mt-30 mb-6">
                        Discover New Worlds
                    </h1>
                    
                    {/* Subheading */}
                    <h2 className="mt-4 text-lg md:text-2xl text-white drop-shadow-lg font-noto text-center max-w-2xl">
                        "Embark on a journey through captivating stories and unexplored adventures."
                    </h2>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center min-h-[500px]'>
                {/* Search and Filter Bar */}
                <form 
                    className="px-8 py-2 mt-8 w-full max-w-[32rem] flex flex-col md:flex-row items-center" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchBooks(); // Immediate fetch on form submission
                    }}
                >
                    {/* Search Input */}
                    <div className="relative w-full md:w-3/4">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
                        <input
                            type="text"
                            placeholder="Search for book, author, or tag..."
                            className="w-full pl-10 pr-4 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    
                    {/* Genre Filter */}
                    <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-1/4">
                        <select
                            value={genre}
                            onChange={handleGenreChange}
                            className="w-full px-4 py-2 border border-yellow-500 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            {genres.map((g, index) => (
                                <option key={index} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Search Button (Optional) */}
                    {/* <button
                        type="submit"
                        className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        aria-label="Search"
                    >
                        Search
                    </button> */}
                </form>

                {/* Books Listing */}
                <div className="mt-10 w-full max-w-6xl px-4 min-h-[450px] flex flex-col items-center">
                    {loading ? (
                        <BookLoader />
                        //<p className='hidden'>loading..</p>
                    ) : error ? (
                        <div className="text-red-500 text-center min-h-[450px]">{error}</div>
                    ) : books.length === 0 ? (
                        <div className="text-center min-h-[450px]">No books found.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                {currentBooks.map(book => (
                                    <BookOverview key={book._id} book={book} searchQuery={searchQuery} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center items-center space-x-2">
                                    {/* Previous Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 rounded-md ${
                                            currentPage === 1
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white'
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    {/* Page Numbers */}
                                    {renderPageNumbers()}

                                    {/* Next Button */}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 rounded-md ${
                                            currentPage === totalPages
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-yellow-400 hover:text-white'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );

};

export default ExploreSection;

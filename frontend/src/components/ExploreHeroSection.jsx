// frontend/src/components/ExploreHeroSection.jsx
import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/booknestHero03.webp'; // Primary Background Image
import './HeroSection.css'; // Import the CSS file (if needed for additional styles)
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { Link } from 'react-router-dom';
import logo from '../assets/BookNestLogoW.png';
import { FaSearch } from "react-icons/fa"; // Import Search Icon

const ExploreHeroSection = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  // Handler for form submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Placeholder for future search functionality
    console.log('Search Query:', searchQuery);
  };

  return (
    <div
      className="hero-container relative flex items-center justify-center bg-gray-100"
      style={{ 
        height: '500px',
        maxHeight: '500px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} 
      data-aos="fade-in"
    >
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        
        {/* Hero Text */}
        <h1 className="text-7xl font-lora font-bold text-white text-center mt-10 mb-10">
          Discover New Worlds
        </h1>
        
        {/* Subheading */}
        <h2 className="mt-4 text-xl md:text-2xl text-white drop-shadow-lg font-noto text-center max-w-2xl">
          "Embark on a journey through captivating stories and unexplored adventures."
        </h2>
        
        {/* Search Bar */}
        <form className="mt-8 w-full max-w-md" onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for books..."
              className="w-full pl-10 pr-4 py-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600 transition-colors duration-300"
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExploreHeroSection;

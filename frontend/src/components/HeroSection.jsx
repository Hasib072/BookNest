// frontend/src/components/HeroSection.jsx

import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/booknestHero01.webp'; // Primary Background Image
import overlayImage from '../assets/booknestHero02.webp'; // Overlay Image for Effects
import './HeroSection.css'; // Import the CSS file
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa"; // Import Search Icon
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/BookNestLogoW.png';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  // Handler for form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // Navigate to /explore with search query as URL parameter
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Optional: Clear the search input after navigation
    }
  };

  return (
    <div
      className="hero-container relative flex items-center justify-center bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        height: '540px',
        maxHeight: '540px' 
      }} 
      data-aos="fade-in"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Overlay Image with Clip-Path Hover Effect */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out hero-overlay ${
          isHovered ? 'hovered' : ''
        }`}
        style={{ backgroundImage: `url(${overlayImage})` }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:pl-[10%] w-full px-4">
        {/* Left Side: Logo and Text */}
        <div className="text-center md:text-left md:w-1/2">
          {/* Logo */}
          <img
            className="h-50 w-auto"
            src={logo}
            alt="BookNest Logo"
          />
          
          {/* Tagline */}
          <h2 className="mt-4 text-xl md:text-2xl text-white drop-shadow-lg font-semibold font-noto">
            "Dive into a world of endless stories and imagination."
          </h2>
          
          {/* Search Bar */}
          <form className="mt-8 flex justify-center md:justify-start" onSubmit={handleSearch}>
            <div className="relative w-full max-w-md">
              {/* Search Input */}
              <input
                type="text"
                placeholder="book, author, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-yellow-100 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-100"
                required
              />
              
              {/* Search Icon */}
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              
              {/* Search Button */}
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
    </div>
  );
};

export default HeroSection;

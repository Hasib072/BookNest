// frontend/src/components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/booknestHero01.png'; // Primary Background Image
import overlayImage from '../assets/booknestHero02.png'; // Overlay Image for Effects
import './HeroSection.css'; // Import the CSS file
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { Link } from 'react-router-dom';
import logo from '../assets/BookNestLogoW.png';


const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  return (
    <div
      className="hero-container relative flex items-center justify-center bg-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        height: '680px',
        maxHeight: '680px' 
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
        {/* Hero Text */}
        <div className="text-center md:text-left md:w-1/2">
            <img
                className="h-50 w-auto"
                src={logo}
                alt="BookNest Logo"
              />
          <h2 className="mt-4 text-xl md:text-2xl text-white drop-shadow-lg font-semibold">
            "Dive into a world of endless stories and imagination."
          </h2>
        
          
          {/* Call-to-Action Buttons */}
          <div className='mt-8'>
            <div className="inline mr-5">
              <a
                href="https://drive.google.com/file/d/1jnAoG139EZbv-depo5SgV7gcCMIk8zkN/view"
                className="inline-block px-2 md:px-6 py-3 border-solid border-yellow-500 border-2 text-white font-semibold rounded-md shadow hover:bg-yellow-600/50 hover:text-white transition duration-300" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                VIEW BROCHURE
              </a>
            </div>
            <div className="inline">
              <Link
                to="/contact"
                className="inline-block px-2 md:px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md shadow hover:bg-yellow-600/50 hover:text-white transition duration-300"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Other Content can go here if needed */}
    </div>
  );
};

export default HeroSection;

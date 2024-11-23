// frontend/src/components/ExploreSection.jsx

import React, { useState, useEffect, useCallback } from 'react';
import backgroundImage from '../assets/booknestHero03.webp';
import './HeroSection.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;


const BookHeaderSection = ({ book }) => {
    
    return (
        <>
            <div
                className="hero-container relative flex flex-col items-center justify-center bg-gray-100"
                style={{ 
                    minHeight: '200px',
                    backgroundImage: `url(${BACKEND_BASE_URI}${book.cover})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} 
                data-aos="fade-in"
            >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col items-center w-full px-4">
                    
                    
                </div>
            </div>
        </>
    );

};

export default BookHeaderSection;

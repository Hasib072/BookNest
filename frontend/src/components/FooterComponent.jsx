// src/components/Footer.jsx

import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import logo from '../assets/BookNestLogo.png'; // Ensure the path is correct
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <footer className="bg-[#dcc3a1] text-black md:px-20 mt-24"> {/* Cream background and black text */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap">
          {/* Column 1: Logo and Description */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0 pr-5">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="BookNest Logo" className="w-60 mb-4" />
            </Link>
            {/* Company Name */}
            {/* <h4 className="text-[1rem] font-semibold mb-2 text-left">BookNest</h4> */}
            {/* Description */}
            <p className="text-gray-700 text-sm text-left">
              BookNest is your go-to platform for discovering, reviewing, and sharing your favorite books. We connect readers with the stories they love and provide a community for book enthusiasts.
            </p>
            {/* Social Media Icons */}
            <div className='mt-6 flex space-x-4'>
              <a href='#' className='text-black hover:text-blue-400' target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className='inline text-2xl' />
              </a>
              <a href='#' className='text-black hover:text-blue-400' target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className='inline text-2xl' />
              </a>
              <a href='#' className='text-black hover:text-pink-600' target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <RiInstagramFill className='inline text-2xl' />
              </a>
              <a href='#' className='text-black hover:text-blue-600' target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn className='inline text-2xl' />
              </a>
            </div>
          </div>
          
          {/* Column 2: Know More */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">Know More</h4>
            <ul>
              <li className="mb-2">
                <Link to="/about" className="text-black hover:text-gray-700 text-sm">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/features" className="text-black hover:text-gray-700 text-sm">Features</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-black hover:text-gray-700 text-sm">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-black hover:text-gray-700 text-sm">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-black hover:text-gray-700 text-sm">FAQs</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Our Services */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">Our Services</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-700 text-sm text-black">Book Reviews</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-700 text-sm text-black">Reading Lists</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-700 text-sm text-black">Author Interviews</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-700 text-sm text-black">Community Forums</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-700 text-sm text-black">Book Recommendations</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700 text-sm text-black">Events</a>
              </li>
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-4 text-gray-700">More Links</h4>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-700 text-sm text-black">Submit a Review</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-700 text-sm text-black">Become a Member</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact Us */}
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-4 text-gray-700">Contact Us</h4>
            <ul>
              <li className="mb-2">
                <a href="tel:+1234567890" className="hover:text-gray-700 text-sm text-black">Phone: +1 (234) 567-890</a>
              </li>
              <li>
                <a href="mailto:support@booknest.com" className="hover:text-gray-700 text-sm text-black">Email: support@booknest.com</a>
              </li>
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-4 text-gray-700">Address</h4>
            <p className="text-sm text-gray-700">
              123 Book Street, Reading City, Knowledge State, 45678.
            </p>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left: Company Motto */}
          <p className="text-sm text-gray-700 mb-4 md:mb-0">
            BookNest offers a comprehensive platform for book enthusiasts to connect, share, and discover new reads.
          </p>
          
          {/* Middle: Legal Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-sm hover:text-gray-700 text-black">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-gray-700 text-black">Terms of Use</a>
            <a href="#" className="text-sm hover:text-gray-700 text-black">Legal</a>
            <a href="#" className="text-sm hover:text-gray-700 text-black">License</a>
          </div>
          
          {/* Right: Copyright */}
          <p className="text-sm text-gray-700 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import logo from '../assets/BookNestLogoW.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once while scrolling down
    });
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  
  

  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY > 30) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
      }, 10); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-[1000] top-0 transition-opacity duration-500 ease-in-out ${
        showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bg-transparent md:bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-down" >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img
                className="h-8 w-auto"
                src={logo}
                alt="BookNest Logo"
              />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex space-x-4 items-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                      : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                  }
                  onClick={closeMobileMenu}
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reviews"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                      : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                  }
                  onClick={closeMobileMenu}
                >
                  REVIEW
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                      : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                  }
                  onClick={closeMobileMenu}
                >
                  CATEGORIES
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/authors"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                      : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                  }
                  onClick={closeMobileMenu}
                >
                  AUTHORS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                      : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                  }
                  onClick={closeMobileMenu}
                >
                  ABOUT
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto border-solid border-yellow-500 border-2'
                      : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto border-solid border-yellow-500 border-2'
                  }
                  onClick={closeMobileMenu}
                >
                  LOGIN
                </NavLink>
              </li>
              {/* Dark Mode Toggle */}
              {/* <li>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
                  aria-label="Toggle Dark Mode"
                >
                  {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
                </button>
              </li> */}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={handleToggle}
              type="button"
              className="text-gray-300 hover:text-white focus:outline-none hover:outline-yellow hover:border-yellow-500 focus:text-white"
              aria-label="Toggle menu"
              aria-expanded={isMobile}
              aria-controls="mobile-menu"
            >
              {isMobile ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div id="mobile-menu" className="md:hidden bg-[#022c4b] text-center transition duration-300 ease-in-out">
          <ul className="px-12 pt-2 pb-3 space-y-1 sm:px-20 z-[1000]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                    : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                }
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                    : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                }
                onClick={closeMobileMenu}
              >
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                    : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                }
                onClick={closeMobileMenu}
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/authors"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                    : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                }
                onClick={closeMobileMenu}
              >
                Authors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                    : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                }
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-yellow-500 px-3 py-2 rounded-md text-base font-bold'
                    : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base font-bold border-solid border-yellow-500 border-2'
                }
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
            </li>
            {/* Mobile Dark Mode Toggle
            <li className="mt-4">
              <button
                onClick={toggleDarkMode}
                className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-800" />}
              </button>
            </li> */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

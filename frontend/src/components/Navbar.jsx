// frontend/src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import logo from '../assets/BookNestLogoSW.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import API from '../api'; // Ensure you have an Axios instance set up

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once while scrolling down
    });
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [user, setUser] = useState(null); // User data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Toggle mobile menu
  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  // Handle Dark Mode Toggle (Optional)
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implement further dark mode logic if necessary
  };

  // Fetch authentication status on component mount
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await API.get('/check-auth', { withCredentials: true });
        if (response.data.success) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.log('Auth Check:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await API.post('/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUser(null);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.log('Logout Error:', error);
      // Optionally, display an error message to the user
    }
  };

  // Hide Navbar on Scroll (Optional)
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
      }, 10); // Debounce scroll event
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    // Optionally, display a loading indicator while checking auth status
    return null; // Or a spinner/loading component
  }

  return (
    <nav
      className={`fixed w-full z-[1000] top-0 transition-opacity duration-500 ease-in-out ${
        showNavbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } bg-transparent md:bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-down">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center" onClick={closeMobileMenu}>
              <img className="h-8 w-auto" src={logo} alt="BookNest Logo" />
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
                  to="/explore"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-yellow-500 hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                      : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                  }
                  onClick={closeMobileMenu}
                >
                  EXPLORE
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
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-yellow-500 hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                          : 'text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto'
                      }
                      onClick={closeMobileMenu}
                    >
                      PROFILE
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto border-solid border-yellow-500 border-2'
                        : 'text-white px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto border-solid border-yellow-500 border-2 bg-yellow-500'
                    }
                    onClick={closeMobileMenu}
                  >
                    LOGIN
                  </NavLink>
                </li>
              )}
              {/* Dark Mode Toggle (Optional) */}
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
                to="/explore"
                className={({ isActive }) =>
                  isActive
                    ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                    : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                }
                onClick={closeMobileMenu}
              >
                Explore
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
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                        : 'block text-white hover:text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto'
                    }
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-yellow-500 px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto border-solid border-yellow-500 border-2'
                      : 'block text-white px-3 py-2 rounded-md text-base tracking-[0.2rem] font-noto border-solid border-yellow-500 border-2 bg-yellow-500'
                  }
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              </li>
            )}
            {/* Mobile Dark Mode Toggle (Optional)
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

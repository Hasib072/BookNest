// frontend/src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUserCircle } from 'react-icons/fa';
import { MdExplore } from 'react-icons/md';
import { TbWriting } from 'react-icons/tb';
import { AiFillInfoCircle } from 'react-icons/ai';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
  const [user, setUser] = useState(null); // User data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Toggle mobile menu (if needed for additional mobile interactions)
  const handleToggle = () => {
    setIsMobile(!isMobile);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobile(false);
  };

  // Fetch authentication status on component mount
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await API.get('/auth/check-auth', { withCredentials: true });
        if (response.data.success) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
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
      await API.post('/auth/logout', {}, { withCredentials: true });
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
                  {/* <li>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm tracking-[0.2rem] font-noto"
                    >
                      LOGOUT
                    </button>
                  </li> */}
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
          <div className="hidden">
            <button
              onClick={handleToggle}
              type="button"
              className="text-black hover:text-yellow-500 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobile}
              aria-controls="mobile-menu"
            >
              {isMobile ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <ul className="flex justify-around items-center h-16">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col items-center text-yellow-500'
                  : 'flex flex-col items-center text-black hover:text-yellow-500'
              }
              onClick={closeMobileMenu}
            >
              <FaHome size={20} />
              <span className="text-xs">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col items-center text-yellow-500'
                  : 'flex flex-col items-center text-black hover:text-yellow-500'
              }
              onClick={closeMobileMenu}
            >
              <MdExplore size={20} />
              <span className="text-xs">Explore</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/authors"
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col items-center text-yellow-500'
                  : 'flex flex-col items-center text-black hover:text-yellow-500'
              }
              onClick={closeMobileMenu}
            >
              <TbWriting size={20} />
              <span className="text-xs">Authors</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col items-center text-yellow-500'
                  : 'flex flex-col items-center text-black hover:text-yellow-500'
              }
              onClick={closeMobileMenu}
            >
              <AiFillInfoCircle size={20} />
              <span className="text-xs">About</span>
            </NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? 'flex flex-col items-center text-yellow-500'
                    : 'flex flex-col items-center text-black hover:text-yellow-500'
                }
                onClick={closeMobileMenu}
              >
                <FaUserCircle size={20} />
                <span className="text-xs">Profile</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'flex flex-col items-center text-yellow-500'
                    : 'flex flex-col items-center text-black hover:text-yellow-500'
                }
                onClick={closeMobileMenu}
              >
                <FaUserCircle size={20} />
                <span className="text-xs">Login</span>
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

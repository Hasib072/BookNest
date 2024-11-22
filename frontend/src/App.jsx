import React from 'react'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import VerifyEmail from './pages/VerifyEmail';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import SplashScreen from './components/SplashScreen';
import { preloadImages } from './utils/preloadImages';
import API from './api'; // Ensure you have an API utility for making HTTP requests
import { useContext, useEffect } from 'react';
import { LoadingContext } from './context/LoadingContext';

function App() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    const loadApp = async () => {
      try {
        // Fetch books data from your API
        const response = await API.get('/books'); // Adjust the endpoint as needed
        const books = response.data.books;

        // Extract image URLs
        const imageUrls = books.map(book => book.cover); // Assuming 'cover' is the relative path

        // Prepend backend base URL
        const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URI || 'http://localhost:5001';
        const fullImageUrls = imageUrls.map(url => `${backendBaseUrl}${url}`);

        // Preload images
        await preloadImages(fullImageUrls);

        // Optionally, wait for a short duration
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second
      } catch (error) {
        console.error('Error loading app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadApp();
  }, [setIsLoading]);

  return (
    <>
      <SplashScreen show={isLoading} />
      {!isLoading && (
        <AuthProvider>
          <Navbar /> {/* Navbar appears on all pages */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<VerifyEmail />} />

            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="/explore" element={<Explore />} />
            </Route>

            {/* Catch-all Route for 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      )}
    </>
  )
}

export default App

// frontend/src/pages/Profile.jsx

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import backgroundImage from '../assets/booknestHero03.webp'; // Primary Background Image
import API from '../api'; // Ensure you have an Axios instance set up

const Profile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout: contextLogout, isAuthLoading } = useContext(AuthContext);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await API.post('/logout', {}, { withCredentials: true });
      contextLogout(); // Update AuthContext
      navigate('/login'); // Redirect to login page after logout
    } catch (err) {
      console.log('Logout Error:', err);
      // Optionally, display an error message to the user
    }
  };

  if (isAuthLoading) {
    // Display a loading indicator while checking auth status
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Your Profile</h2>
        <div className="flex flex-col items-center">
          {/* User Avatar */}
          <div className="w-24 h-24 mb-4">
            <img
              src={user.avatar || '/default-avatar.png'} // Provide a default avatar if none exists
              alt={`${user.name}'s avatar`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {/* User Information */}
          <div className="w-full">
            <p className="mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}
            </p>
            <p className="mb-4">
              <strong>Role:</strong> {user.role}
            </p>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          {/* Optional: Edit Profile Button */}
          {/* <button
            onClick={() => navigate('/edit-profile')}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Profile
          </button> */}
        </div>
        {/* Optional: Error Message */}
        {/* {error && <p className="text-red-500 text-center mt-4">{error}</p>} */}
      </div>
    </div>
  );
};

export default Profile;

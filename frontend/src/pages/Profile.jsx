// frontend/src/pages/Profile.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import backgroundImage from '../assets/booknestHero03.webp'; // Primary Background Image
import API from '../api'; // Axios instance
import Loader from '../components/Loader'; // Import the Loader component
import AddBookModal from '../components/AddBookModal'; // Import the AddBookModal component

const Profile = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout: contextLogout, isAuthLoading } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [books, setBooks] = useState([]); // State to manage book list

    // Handle Logout
    const handleLogout = async () => {
        try {
            await API.post('/auth/logout'); // Calls /api/auth/logout
            contextLogout(); // Update AuthContext
            navigate('/login'); // Redirect to login page after logout
        } catch (err) {
            console.error('Logout Error:', err);
            // Optionally, display an error message to the user
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get('/users/profile'); // Calls /api/users/profile
                setProfile(response.data.user);
                setLoading(false);
            } catch (err) {
                console.error("Fetch Profile Error:", err);
                setError(err.response?.data?.message || "Failed to fetch profile.");
                setLoading(false);
            }
        };
        fetchProfile();
    }, [isLoggedIn, navigate]);

    // Function to handle adding a new book to the list
    const handleBookAdded = (newBook) => {
        setBooks(prevBooks => [newBook, ...prevBooks]);
    };

    if (isAuthLoading || loading) {
        // Display the Loader component while loading
        return <Loader />;
    }

    if (error) {
        return (
            <div
                className="min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg">
                    <p className="text-red-500 text-xl">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Your Profile</h2>
                <div className="flex flex-col items-center">
                    {/* User Information */}
                    <div className="w-full">
                        <p className="mb-2 text-lg">
                            <strong>Name:</strong> {profile.name}
                        </p>
                        <p className="mb-2 text-lg">
                            <strong>Email:</strong> {profile.email}
                        </p>
                        <p className="mb-2 text-lg">
                            <strong>Last Login:</strong> {new Date(profile.lastLogin).toLocaleString()}
                        </p>
                        <p className="mb-4 text-lg">
                            <strong>Role:</strong> {profile.role}
                        </p>

                        {/* Add Book Button for Admins */}
                        {profile.role === 'admin' && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            >
                                Add New Book
                            </button>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* AddBookModal Component */}
            <AddBookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBookAdded={handleBookAdded}
            />
        </div>
    );
};

export default Profile;

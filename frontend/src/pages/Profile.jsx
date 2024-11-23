// frontend/src/pages/Profile.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import backgroundImage from '../assets/booknestHero03.webp'; // Primary Background Image
import userPlaceholder from '../assets/user-placeholder.jpg'; // User Placeholder Image
import API from '../api'; // Axios instance
import Loader from '../components/Loader'; // Import the Loader component
import AddBookModal from '../components/AddBookModal'; // Import the AddBookModal component
import ReviewCard from '../components/ReviewCard'; // Import the ReviewCard component
import FooterComponent from '../components/FooterComponent';

const Profile = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout: contextLogout, isAuthLoading } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [reviews, setReviews] = useState([]); // State to manage user reviews

    // Handle Logout
    const handleLogout = async () => {
        try {
            await API.post('/auth/logout'); // Calls /api/auth/logout
            contextLogout(); // Update AuthContext
            navigate('/login'); // Redirect to login page after logout
        } catch (err) {
            console.error('Logout Error:', err);
            // Optionally, display an error message to the user
            // For example, set an error state or use an alert
            setError('Failed to logout. Please try again.');
        }
    };

    // Fetch User Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await API.get('/users/profile'); // Calls /api/users/profile
                setProfile(response.data.user);
                setLoading(false);
                console.log("User profile fetched:", response.data.user);
            } catch (err) {
                console.error("Fetch Profile Error:", err);
                setError(err.response?.data?.message || "Failed to fetch profile.");
                setLoading(false);
            }
        };
        fetchProfile();
    }, [isLoggedIn, navigate]);

    // Fetch User Reviews with 1-second delay
    useEffect(() => {
        if (!profile || !profile._id) return; // Ensure profile is loaded

        const fetchReviews = async () => {
            try {
                console.log("Fetching reviews of user:", profile.name, profile._id);
                const response = await API.get(`/reviews?user=${profile._id}`); // Calls /api/reviews?user=<user_id>
                setReviews(response.data.reviews);
                console.log("Reviews fetched:", response.data.reviews);
            } catch (err) {
                console.error("Fetch Reviews Error:", err);
                setError(err.response?.data?.message || "Failed to fetch reviews.");
            }
        };

        // Set a 1000ms (1 second) delay before fetching reviews
        const timer = setTimeout(() => {
            fetchReviews();
        }, 1000);

        // Cleanup the timeout if the component unmounts or profile changes before the timeout completes
        return () => clearTimeout(timer);
    }, [profile]); // Runs whenever 'profile' changes

    // Function to handle adding a new book to the list
    const handleBookAdded = (newBook) => {
        // If you have a books state, you can update it here
        // For now, assuming reviews are separate
        console.log("New book added:", newBook);
        // Optionally, update the state or perform other actions
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
        <>
        
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Banner Section */}
            <div
                className="w-full h-64 md:h-80 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Profile Details Section */}
            <div className="w-full px-4 -mt-20 md:-mt-24 flex justify-center z-10">
                <div className="bg-gray-100 w-full max-w-4xl p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={profile.profileImage || userPlaceholder} // Use user's profile image if available
                            alt="User Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500"
                        />
                    </div>

                    {/* User Information */}
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center md:text-left">
                            {profile.name}
                        </h2>
                        <p className="text-gray-600 mb-1 text-center md:text-left">
                            <strong>Email:</strong> {profile.email}
                        </p>
                        <p className="text-gray-600 mb-1 text-center md:text-left">
                            <strong>Last Login:</strong> {new Date(profile.lastLogin).toLocaleString()}
                        </p>
                        <p className="text-gray-600 mb-4 text-center md:text-left">
                            <strong>Role:</strong> {profile.role}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row md:items-center">
                            {profile.role === 'admin' && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mb-2 md:mb-0 md:mr-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Add New Book
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* "My Reviews" Section */}
            <div className="flex-1 w-full px-4 py-8 bg-gray-50">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                    My Reviews
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
                    {reviews.length === 0 ? (
                        <p className="text-center text-gray-600">You have not reviewed any books yet.</p>
                    ) : (
                        reviews.map(review => (
                            <ReviewCard key={review._id} review={review} />
                        ))
                    )}
                </div>
            </div>

            {/* AddBookModal Component */}
            <AddBookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBookAdded={handleBookAdded}
            />
        </div>
        <FooterComponent/>
        </>
    );

};

export default Profile;

// frontend/src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.get('/check-auth');
                setUser(response.data.user);
            } catch (err) {
                console.log(err);
                setError('You are not authenticated. Please login.');
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await API.post('/logout');
            navigate('/login');
        } catch (err) {
            console.log(err);
            setError('Failed to logout. Please try again.');
        }
    };

    if (error) {
        return <p className="text-red-500 text-center mt-4">{error}</p>;
    }

    if (!user) {
        return <p className="text-center mt-4">Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <p>
                    <strong>Username:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}
                </p>
                <p>
                    <strong>Role:</strong> {user.role}
                </p>
                <button
                    onClick={handleLogout}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;

// frontend/src/pages/VerifyEmail.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const VerifyEmail = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await API.post('/verify-email', { code });
            setMessage(response.data.message);
            navigate('/profile');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Verification Code</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your verification code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Verify Email
                </button>
            </form>
            <p className="mt-4">
                Didn't receive a code?{' '}
                <Link to="/signup" className="text-blue-500">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default VerifyEmail;

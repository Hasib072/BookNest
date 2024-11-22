// frontend/src/pages/VerifyEmail.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';

const VerifyEmail = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const [resendError, setResendError] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsSubmitting(true);
        try {
            const response = await API.post('/auth/verify-email', { code });
            setMessage(response.data.message);
            // Redirect or further actions after verification
            // For example:
            // navigate('/profile');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        setResendMessage('');
        setResendError('');
        setIsResending(true);
        try {
            // Assume the user’s email is stored in localStorage or context
            const email = localStorage.getItem('userEmail'); // Example
            if (!email) {
                setResendError('User email not found. Please sign up again.');
                setIsResending(false);
                return;
            }

            const response = await API.post('/auth/resend-verification', { email });
            setResendMessage(response.data.message);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setResendError(err.response.data.message);
            } else {
                setResendError('An error occurred while resending the code. Please try again.');
            }
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col items-center mb-6">
                    <FaEnvelope className="text-yellow-500 text-4xl mb-2" />
                    <h2 className="text-3xl font-semibold text-center text-gray-800">
                        Verify Your Email
                    </h2>
                </div>
                <p className="text-center text-gray-600 mb-6">
                    Enter the verification code sent to your email address to activate your account.
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Verification Code Field */}
                    <div className="mb-4">
                        <label htmlFor="code" className="block text-gray-700 mb-2">
                            Verification Code
                        </label>
                        <input
                            type="text"
                            id="code"
                            name="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your verification code"
                            aria-describedby="code-helper-text"
                        />
                    </div>

                    {/* Success Message */}
                    {message && (
                        <p className="text-green-500 mb-4 text-center">
                            {message}
                        </p>
                    )}

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 mb-4 text-center">
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center ${
                            isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <FaSpinner className="animate-spin mr-2" /> : null}
                        {isSubmitting ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>

                {/* Resend Code Section */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Didn't receive a code?{' '}
                        <button
                            onClick={handleResend}
                            className={`text-yellow-500 hover:underline ${
                                isResending ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            disabled={isResending}
                        >
                            {isResending ? 'Resending...' : 'Resend Code'}
                        </button>
                    </p>
                    {resendMessage && (
                        <p className="text-green-500 mt-2">
                            {resendMessage}
                        </p>
                    )}
                    {resendError && (
                        <p className="text-red-500 mt-2">
                            {resendError}
                        </p>
                    )}
                </div>

                {/* Sign In Link */}
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-yellow-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmail;

// frontend/src/components/VerifyEmailModal.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import API from '../api';
import { FaEnvelope, FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';

const VerifyEmailModal = ({ email, onClose }) => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [resendMessage, setResendMessage] = useState('');
    const [resendError, setResendError] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const codeInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Focus the code input when the modal opens
        if (codeInputRef.current) {
            codeInputRef.current.focus();
        }

        // Handle Escape key to close the modal
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsSubmitting(true);
        try {
            const response = await API.post('/auth/verify-email', { code });
            setMessage(response.data.message);
            // Optionally, redirect to profile page after successful verification
            setTimeout(() => {
                onClose(); // Close the modal
                navigate('/'); // Uncomment if you have access to navigate
            }, 2000);
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
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-email-title"
            aria-describedby="verify-email-description"
        >
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg relative transform transition-transform duration-300 scale-100">
                {/* Close Button */}
                {/* <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close Verification Modal"
                >
                    &times;
                </button> */}

                <div className="flex flex-col items-center mb-6">
                    <FaEnvelope className="text-yellow-500 text-4xl mb-2" />
                    <h2 id="verify-email-title" className="text-2xl font-semibold text-center text-gray-800">
                        Verify Your Email
                    </h2>
                </div>
                <p id="verify-email-description" className="text-center text-gray-600 mb-6">
                    Enter the verification code sent to <strong>{email}</strong> to activate your account.
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
                            ref={codeInputRef}
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
                        <span
                            onClick={handleResend}
                            className={`text-yellow-500 hover:underline ${
                                isResending ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            disabled={isResending}
                        >
                            {isResending ? 'Resending...' : 'Resend Code'}
                        </span>
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
    VerifyEmailModal.propTypes = {
        email: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };

export default VerifyEmailModal;

// frontend/src/pages/Signup.jsx

import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import API from '../api.js'; // Import the Axios instance
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for password toggle
import VerifyEmailModal from '../components/VerifyEmailModal'; // Import the modal component


const Signup = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false, // State for terms and conditions
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
    const [formErrors, setFormErrors] = useState({}); // State for form validation errors
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [showVerifyModal, setShowVerifyModal] = useState(false); // State to control modal visibility
    const [userEmail, setUserEmail] = useState(''); // Store user's email for verification

    // Handle input changes and perform real-time validation
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: val });

        // Real-time validation
        switch (name) {
            case 'email':
                validateEmail(val);
                break;
            case 'password':
                validatePassword(val);
                if (formData.confirmPassword) {
                    validateConfirmPassword(formData.confirmPassword, val);
                }
                break;
            case 'confirmPassword':
                validateConfirmPassword(val, formData.password);
                break;
            case 'name':
                validateName(val);
                break;
            default:
                break;
        }
    };

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            email: emailRegex.test(email) ? '' : 'Invalid email address',
        }));
    };

    const validatePassword = (password) => {
        // Example: Minimum 6 characters, at least one number
        const passwordRegex = /^(?=.*\d).{6,}$/;
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            password: passwordRegex.test(password)
                ? ''
                : 'Password must be at least 6 characters and include a number',
        }));
    };

    const validateConfirmPassword = (confirmPassword, password) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword:
                confirmPassword === password ? '' : 'Passwords do not match',
        }));
    };

    const validateName = (name) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            name: name.trim() !== '' ? '' : 'Name is required',
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Final validation before submission
        const { name, email, password, confirmPassword, terms } = formData;
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (!terms) {
            setError('You must agree to the terms and conditions.');
            return;
        }
        if (Object.values(formErrors).some((msg) => msg !== '')) {
            setError('Please fix the errors in the form.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await API.post('/auth/signup', {
                name,
                email,
                password,
            });
            console.log(response.data);
            // Store user's email to use in verification modal
            setUserEmail(email);
            // Show verification modal
            setShowVerifyModal(true);
            // Optionally, store email in localStorage for persistence
            localStorage.setItem('userEmail', email);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                if (err.response.data.message === "User not verified. Please verify your email.") {
                    // User exists but is not verified, show the verification modal
                    console.log("user not verified opening vrification model");
                    setUserEmail(formData.email);
                    setShowVerifyModal(true);
                } else {
                    // Other error messages
                    setError(err.response.data.message);
                }
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowVerifyModal(false);
        // Optionally, navigate to the profile page or another page after closing the modal
        //navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2 text-left">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your full name"
                            aria-describedby="name-helper-text"
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2 text-left">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your email"
                            aria-describedby="email-helper-text"
                        />
                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 mb-2 text-left">
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your password"
                            aria-describedby="password-helper-text"
                        />
                        {/* Toggle Password Visibility */}
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="bg-transparent absolute right-2 top-14 transform -translate-y-1/2 text-gray-600 hover:text-yellow-500 focus:outline-none"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 text-left">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Re-enter your password"
                            aria-describedby="confirm-password-helper-text"
                        />
                        {/* Toggle Confirm Password Visibility */}
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="bg-transparent absolute right-2 top-14 transform -translate-y-1/2 text-gray-600 hover:text-yellow-500 focus:outline-none"
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {formErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                className="form-checkbox h-4 w-4 text-yellow-500"
                                required
                            />
                            <span className="ml-2 text-gray-700">
                                I agree to the{' '}
                                <Link to="/terms" className="text-yellow-500 hover:underline">
                                    Terms and Conditions
                                </Link>
                            </span>
                        </label>
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition-colors duration-300 ${
                            isLoading ? 'cursor-not-allowed opacity-50' : ''
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-yellow-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>

            {/* Verification Modal */}
            {showVerifyModal && (
                <VerifyEmailModal
                    email={userEmail}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Signup;

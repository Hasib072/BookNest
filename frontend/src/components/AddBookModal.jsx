// frontend/src/components/AddBookModal.jsx

import React, { useState, useEffect } from 'react';
import API from '../api';
import Loader from './Loader';
import { FaTimes } from 'react-icons/fa';
import defaultBookCover from '../assets/bookplaceholder.png'; // Default Placeholder Image

const AddBookModal = ({ isOpen, onClose, onBookAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        rating: '',
        description: '',
        tags: '',
        isFeatured: false,
        genre: '',
    });
    const [coverFile, setCoverFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(defaultBookCover); // Image Preview State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const genres = [
        'Classic',
        'Fiction',
        'Drama',
        'Mystery',
        'Fantasy',
        'Non-Fiction',
        'Sci-Fi',
        'Biography',
        'Romance',
        'Thriller',
        // Add more genres as needed
    ];

    // Handle input changes for text fields and checkbox
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle file input changes and set image preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCoverFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(defaultBookCover);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Validate required fields
        const { title, author, rating, description, genre } = formData;
        if (!title || !author || !rating || !description || !genre) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        // Validate rating
        const parsedRating = parseFloat(rating);
        if (isNaN(parsedRating) || parsedRating < 0 || parsedRating > 5) {
            setError('Rating must be a number between 0 and 5.');
            setLoading(false);
            return;
        }

        // Prepare form data
        const data = new FormData();
        data.append('title', title);
        data.append('author', author);
        data.append('rating', parsedRating);
        data.append('description', description);
        data.append('tags', formData.tags); // Comma-separated
        data.append('isFeatured', formData.isFeatured);
        data.append('genre', genre);
        
        if (coverFile) {
            data.append('cover', coverFile);
        }

        try {
            const response = await API.post('/books', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Book added successfully!');
            onBookAdded(response.data.book); // Callback to parent to refresh book list
            // Reset form fields
            setFormData({
                title: '',
                author: '',
                rating: '',
                description: '',
                tags: '',
                isFeatured: false,
                genre: '',
            });
            setCoverFile(null);
            setImagePreview(defaultBookCover);
        } catch (err) {
            console.error('AddBook Error:', err);
            setError(err.response?.data?.message || 'Failed to add book.');
        } finally {
            setLoading(false);
        }
    };

    // Close modal on 'Escape' key press
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            aria-modal="true"
            role="dialog"
            aria-labelledby="add-book-modal-title"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative transform transition-all sm:my-8 sm:align-middle">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="bg-transparent absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close Modal"
                >
                    <FaTimes size={20} />
                </button>

                <h2 id="add-book-modal-title" className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Add New Book
                </h2>

                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                        {success}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                    {/* Left Section: Cover Image Upload */}
                    <div className="flex flex-col items-center">
                        {/* Image Preview */}
                        <label htmlFor="cover" className="cursor-pointer">
                            <img
                                src={imagePreview}
                                alt="Cover Preview"
                                className="w-48 h-72 object-cover rounded-md shadow-md border border-gray-200"
                            />
                            <p className="mt-2 text-sm text-gray-600 text-center">Upload Book Cover</p>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            name="cover"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* Right Section: Form Fields */}
                    <div className="flex-1 flex flex-col space-y-4">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="sr-only">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Title*"
                                className="block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                required
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label htmlFor="author" className="sr-only">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Author*"
                                className="block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                required
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label htmlFor="rating" className="sr-only">Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                placeholder="Rating (0 - 5)*"
                                className="block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                min="0"
                                max="5"
                                required
                            />
                        </div>

                        {/* Genre */}
                        <div>
                            <label htmlFor="genre" className="sr-only">Genre</label>
                            <select
                                id="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                className="block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                placeholder="Select Genre*"
                                required
                            >
                                <option value="">Select Genre*</option>
                                {genres.map((g, index) => (
                                    <option key={index} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="sr-only">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description*"
                                rows="4"
                                className="block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                                required
                            ></textarea>
                        </div>

                        {/* Tags */}
                        <div>
                            <label htmlFor="tags" className="sr-only">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                placeholder="Tags (comma-separated)"
                                className="block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                            />
                        </div>

                        {/* Is Featured */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isFeatured"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                                Featured
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                disabled={loading}
                            >
                                {loading ? <Loader /> : 'Add Book'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;

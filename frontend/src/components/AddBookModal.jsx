// frontend/src/components/AddBookModal.jsx

import React, { useState } from 'react';
import API from '../api';
import Loader from './Loader';
import { FaTimes } from 'react-icons/fa';

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

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setCoverFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Validate required fields
        const { title, author, rating, description, genre } = formData;
        if (!title || !author || !rating || !description || !genre || !coverFile) {
            setError('Please fill in all required fields and upload a cover image.');
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
        data.append('cover', coverFile);

        try {
            const response = await API.post('/books', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess('Book added successfully!');
            onBookAdded(response.data.book); // Callback to parent to refresh book list
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
        } catch (err) {
            console.error('AddBook Error:', err);
            setError(err.response?.data?.message || 'Failed to add book.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close Modal"
                >
                    <FaTimes size={20} />
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Add New Book</h2>

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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                            Author<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating (0 - 5)<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                            min="0"
                            max="5"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        ></textarea>
                    </div>

                    {/* Tags */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                            placeholder="e.g., Classic,Fiction,Drama"
                        />
                    </div>

                    {/* Genre */}
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                            Genre<span className="text-red-500">*</span>
                        </label>
                        <select
                            id="genre"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-yellow-500 rounded-md shadow-sm p-2 focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        >
                            <option value="">Select Genre</option>
                            {genres.map((g, index) => (
                                <option key={index} value={g}>{g}</option>
                            ))}
                        </select>
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

                    {/* Cover Image */}
                    <div>
                        <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
                            Cover Image<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            name="cover"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-yellow-500 file:text-white
                            hover:file:bg-yellow-600"
                            required
                        />
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
                </form>
            </div>
        </div>
    );
};

export default AddBookModal;

// frontend/src/api.js
import axios from "axios";

const BACKEND_BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;

if (!BACKEND_BASE_URI) {
    throw new Error("VITE_BACKEND_BASE_URI is not defined in the environment variables.");
}

const API = axios.create({
    baseURL: BACKEND_BASE_URI + "/api/auth",
    withCredentials: true, // Allow sending cookies
});

// Optional: Add interceptors for requests and responses
API.interceptors.request.use(
    (config) => {
        // Modify request if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        // Handle responses
        return response;
    },
    (error) => {
        // Handle errors
        return Promise.reject(error);
    }
);

export default API;

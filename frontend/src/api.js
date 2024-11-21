// frontend/src/api.js
import axios from "axios";

const API = axios.create({
    baseURL: process.env.BACKEND_BASE_URI + "/api/auth",
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

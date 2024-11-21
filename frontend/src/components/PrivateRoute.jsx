// frontend/src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../api';

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await API.get('/check-auth');
                setAuthenticated(true);
            } catch (err) {
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <p className="text-center mt-4">Loading...</p>;
    }

    return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

// frontend/src/components/Loader.jsx

import React from 'react';
import './Loader.css'; // Import the updated Loader CSS

/**
 * Loader Component
 * 
 * Props:
 * - fullScreen (boolean): If true, renders the loader as a full-screen overlay.
 *                           If false, renders the loader within its parent container.
 */
const Loader = ({ fullScreen = false }) => {
    return (
        <div className={`loader ${fullScreen ? 'full-screen' : 'container'}`} role="status" aria-live="polite">
            <div className="jimu-primary-loading" aria-hidden="true"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;

// frontend/src/components/SplashScreen.jsx

import React from 'react';
import Loader from './Loader';
import logo from '../assets/BookNestLogo.png'; // Replace with your actual logo path
import { CSSTransition } from 'react-transition-group';
import './SplashScreen.css'; // Create this CSS file for transitions

const SplashScreen = ({ show }) => {
  return (
    <CSSTransition in={show} timeout={500} classNames="fade" unmountOnExit>
      <div
        className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
        role="status"
        aria-live="polite"
      >
        {/* <img src={logo} alt="BookNest Logo" className="h-48 w-auto mb-60 animate-pulse" /> */}
        <Loader fullScreen={true} />
        <span className="sr-only">Loading...</span>
      </div>
    </CSSTransition>
  );
};

export default SplashScreen;

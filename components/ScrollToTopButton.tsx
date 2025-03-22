'use client'; // This is a client component because it uses browser APIs for scrolling and visibility

import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Function to handle scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling animation
        });
    };

    // Function to toggle button visibility based on scroll position
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) { // Show button after scrolling down 300px (adjust as needed)
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility); // Cleanup on unmount
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`scroll-to-top-button ${isVisible ? 'scroll-to-top-button--visible' : ''}`}
            aria-label="Scroll to top"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    );
};

export default ScrollToTopButton;
import React, { useState, useEffect } from 'react';
import Image from "../assets/BackToTop.png"
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <img
          onClick={scrollToTop}
          src={Image}
          // Replace with the path to your custom image (PNG or SVG)
          alt="Back to top"
          className="fixed bottom-0.5 right-0.5 w-16 h-16 cursor-pointer z-10"
          aria-label="Back to top"
        />
      )}
    </>
  );
};

export default BackToTopButton;
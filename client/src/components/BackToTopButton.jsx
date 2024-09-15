import React, { useState, useEffect } from "react";
import Image from "../assets/BackToTop.png";
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

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed top-4 right-4 w-16 h-16 rounded-full bg-[#4B16B2] flex items-center justify-center cursor-pointer z-50"
          aria-label="Back to top"
        >
          <img src={Image} alt="Back to top" className="w-16 h-16" />
        </div>
      )}
    </>
  );
};

export default BackToTopButton;

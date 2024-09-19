import React, { useState, useEffect } from "react";
import Logo from "../assets/MilanLogoCopy.png";
import "./TitleAnimation.css";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30); // Adjust timing for smoother progress

    // Cleanup interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-white bg-transparent">
      <div className="flex flex-col items-center justify-center mb-10 lg:mb-20 scale-125 lg:scale-150">
        <img src={Logo} alt="Logo" className="w-1/2 mb-4" />
        <h1 className="text-[#E4CF63] text-4xl font-bold">MILAN</h1>
      </div>

      <div className="progress w-3/4 sm:w-1/2 md:w-2/5 mt-6">
        <div className="progress-value" style={{ width: `${progress}%` }}></div>
      </div>

      {/* <div className="loading-dots">
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
        <span className="dot dot3"></span>
      </div> */}
    </div>
  );
};

export default Loading;

import React, { useState, useEffect } from "react";
import LoadingAsset from "../assets/LoadingAsset.png";
import Logo from "../assets/MilanLogoCopy.png";

const Loading = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };

    handleResize(); // Check screen size on component mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center text-white ${
        isSmallScreen ? "" : "bg-transparent"
      }`}
      style={{
        backgroundImage: isSmallScreen
          ? `url(${LoadingAsset}), linear-gradient(to bottom, #120D27, #402B55, #6B5794)`
          : "none",
        backgroundSize: isSmallScreen ? "cover, cover" : "none",
        backgroundPosition: isSmallScreen ? "center, center" : "none",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <img src={Logo} alt="Logo" className="w-1/2 mb-4" />
        <h1 className="text-[#E4CF63] text-4xl font-bold">MILAN</h1>
      </div>
    </div>
  );
};

export default Loading;

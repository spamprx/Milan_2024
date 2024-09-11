import React from "react";
import Logo from "../assets/MilanLogoCopy.png";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white bg-transparent">
      <div className="flex flex-col items-center justify-center">
        <img src={Logo} alt="Logo" className="w-1/2 mb-4" />
        <h1 className="text-[#E4CF63] text-4xl font-bold">MILAN</h1>
      </div>
    </div>
    //   <div className="title-animation">
    //   <svg viewBox="0 -350 5000 1500" xmlns="http://www.w3.org/2000/svg">
    //     <text
    //       id="textPath"
    //       x="50%"
    //       y="60%"
    //       textAnchor="middle"
    //       fontSize="1500"
    //       fill="#fff"
    //       stroke="#fff"
    //       strokeWidth="70"
    //     >
    //       MILAN
    //     </text>
    //   </svg>
    // </div>
  );
};

export default Loading;

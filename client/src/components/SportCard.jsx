import React from "react";

const SportCard = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="bg-[#D9D9D9] w-1/2 h-1/5 lg:w-1/3 lg:h-1/2 text-gray-500 rounded-xl m-10">
        <div className="bg-[#DAA827] w-full h-3/4 rounded-t-xl flex flex-row justify-between px-2 lg:px-4">
          <div className="flex flex-col items-center w-1/3">
            <div className="bg-[#755400] opacity-50 w-full h-3/4 rounded-b-xl mb-2"></div>
            <p className="text-[#080808] text-md lg:text-2xl">HOSTEL</p>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <div className="bg-[#755400] opacity-50 w-full h-3/4 rounded-b-xl mb-2"></div>
            <p className="text-[#080808] text-md lg:text-2xl">HOSTEL</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-1/4">
          <p className="text-[#080808] text-xl lg:text-4xl font-bold">
            BASKETBALL
          </p>
        </div>
      </div>
    </div>
  );
};

export default SportCard;

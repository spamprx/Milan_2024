import React from "react";

const SportCard = ({ event }) => {
  return (
    <div className="flex justify-center items-center h-64 sm:h-80 lg:h-96 w-full px-2 sm:px-4">
      <div className="bg-[#D9D9D9] w-full h-full text-gray-500 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#DAA827] w-full h-3/4 rounded-t-xl flex flex-row justify-between p-2 sm:p-4">
          <div className="flex flex-col items-center w-1/3">
            <div className="bg-[#755400]/[0.50] opacity-50 w-full h-3/4 rounded-b-xl mb-2"></div>
            <p className="text-[#080808] text-xs sm:text-sm lg:text-lg font-semibold">
              {event.hostel1}
            </p>
          </div>
          <div className="flex flex-col items-center w-1/3">
            <div className="bg-[#755400]/[0.50] opacity-50 w-full h-3/4 rounded-b-xl mb-2"></div>
            <p className="text-[#080808] text-xs sm:text-sm lg:text-lg font-semibold">
              {event.hostel2}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center h-1/4">
          <p className="text-[#000] text-lg sm:text-xl lg:text-3xl font-extrabold">
            {event.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SportCard;

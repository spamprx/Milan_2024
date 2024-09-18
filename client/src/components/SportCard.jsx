import React from "react";
import HOSTEL_LOGOS from "../../public/HOSTEL_LOGOS/Hostel_Logo.json";
import Sponsors2 from "../assets/Sponsors2.jpeg";

const SportCard = ({ event }) => {
  const isAllBlocks = event.teams.toLowerCase() === "all blocks";
  const hostels = event.teams.split(",").map((hostel) => hostel.trim());

  const getHostelLogo = (hostelName) => {
    const hostel = HOSTEL_LOGOS[0].logo.find(
      (h) => h.name.toLowerCase() === hostelName.toLowerCase()
    );
    return hostel ? hostel.image : null;
  };

  return (
    <div className="flex justify-center items-center h-64 sm:h-80 lg:h-96 w-full px-2 sm:px-4">
      <div className="bg-[#D9D9D9] w-full h-full text-gray-500 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-[#DAA827] w-full h-3/4 rounded-t-xl flex flex-row justify-between p-2 sm:p-4">
          {isAllBlocks ? (
            <div className="flex flex-col items-center w-full">
              <div className="w-full h-3/4 rounded-b-xl mb-2">
                <img
                  src={Sponsors2}
                  alt="All Blocks"
                  className="w-full h-full object-contain rounded-b-xl"
                />
              </div>
              <p className="text-[#080808] text-xs sm:text-sm lg:text-lg font-semibold">
                All Blocks
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center w-1/3">
                <div className="w-full h-3/4 rounded-b-xl mb-2">
                  {getHostelLogo(hostels[0]) ? (
                    <img
                      src={getHostelLogo(hostels[0])}
                      alt={hostels[0]}
                      className="w-full h-full object-contain rounded-b-xl"
                    />
                  ) : (
                    <div className="bg-[#755400]/[0.50] opacity-50 w-full h-full rounded-b-xl mb-2"></div>
                  )}
                </div>
                <p className="text-[#080808] text-xs sm:text-sm lg:text-lg font-semibold">
                  {hostels[0]}
                </p>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <div className="w-full h-3/4 rounded-b-xl mb-2">
                  {getHostelLogo(hostels[1]) ? (
                    <img
                      src={getHostelLogo(hostels[1])}
                      alt={hostels[1]}
                      className="w-full h-full object-contain rounded-b-xl"
                    />
                  ) : (
                    <div className="bg-[#755400]/[0.50] opacity-50 w-full h-full rounded-b-xl mb-2"></div>
                  )}
                </div>
                <p className="text-[#080808] text-xs sm:text-sm lg:text-lg font-semibold">
                  {hostels[1]}
                </p>
              </div>
            </>
          )}
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

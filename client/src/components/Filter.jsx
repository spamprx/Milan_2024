import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const SportsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState("BASKETBALL");

  const sports = [
    "BASKETBALL",
    "BADMINTON",
    "FOOTBALL",
    "VOLLEYBALL",
    "TABLE TENNIS",
  ];

  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <div className="bg-indigo-900 rounded-lg overflow-hidden">
          <div
            className="px-4 py-2 bg-indigo-800 flex flex-col justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-row">
              <span className="text-gray-400 text-sm">SPORT CATEGORY</span>
              <ChevronDown
                className={`text-white mx-2 transition-transform ${
                  isOpen ? "transform rotate-180" : ""
                }`}
                size={20}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-semibold">{selectedSport}</span>
            </div>
          </div>
          {isOpen && (
            <div className="py-2">
              {sports.map((sport, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-white flex items-center space-x-2 hover:bg-indigo-800 cursor-pointer"
                  onClick={() => {
                    setSelectedSport(sport);
                    setIsOpen(false);
                  }}
                >
                  <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
                    {sport === selectedSport && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span>{sport}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportsMenu;

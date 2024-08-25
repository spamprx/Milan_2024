import React from "react";

const SportCard = () => {
  return (
    <div className="flex absolute items-center">
      <div className="bg-[#D9D9D9] text-gray-500 justify-around rounded-xl">
        <div className="bg-[#DAA827] rounded-t-xl">
          <div className="flex flex-row w-full justify-between">
            <div className="bg-[#B18820] w-1/2 rounded-b-xl ml-5" />
            <div className="bg-[#B18820] w-1/2 rounded-b-xl mr-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportCard;

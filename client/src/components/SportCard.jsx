import React from "react";

const SportCard = () => {
  return (
    <div className="flex absolute items-center mt-32">
      <div className="bg-white w-[35vw] h-[50vh] text-gray-500 rounded-xl">
        <div className="bg-yellow-500 w-[35vw] h-[40vh] rounded-t-xl">
          <div className="flex flex-row justify-between">
            <div className="bg-yellow-600 w-[13vw] h-[30vh] rounded-b-xl ml-5" />
            <div className="bg-yellow-600 w-[13vw] h-[30vh] rounded-b-xl mr-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportCard;

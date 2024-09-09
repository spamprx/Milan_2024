import React from "react";

const TeamMember = ({ name, personImage }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-1/2 overflow-hidden">
        <img
          src={personImage}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-[#4B16B2] w-auto px-4 py-2 rounded-br-xl rounded-tl-xl text-white text-center mt-4">
        {name}
      </div>
    </div>
  );
};

export default TeamMember;

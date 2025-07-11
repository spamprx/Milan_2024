import { useState } from "react";

const TeamMember = ({ name, personImage, isHead, isHr }) => {
  const [imageError, setImageError] = useState(false);
  // var person = personImage || "/TEAM/Coords/Missing.png";
  // console.log(person);

  var dummyImage = isHead
    ? "/TEAM/Heads/Missing.png"
    : "/TEAM/Coords/Missing.png";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="w-3/5 overflow-hidden">
        <img
          src={imageError ? dummyImage : personImage}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>

      <div
        className={`${
          isHead ? "bg-[#4B06B2]" : isHr ? "bg-[#DEB116]" : "bg-[#FF7900]"
        } w-auto px-4 py-2 rounded-br-xl rounded-tl-xl text-white text-sm lg:text-lg text-center mt-4`}
      >
        {name}
      </div>
    </div>
  );
};

export default TeamMember;

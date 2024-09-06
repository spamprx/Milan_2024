import React, { useEffect, useState } from "react";
import Image from "../assets/SponsorArrow.png";

function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/TEAM/Heads.json")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <div>
      <div className="OC"></div>
      {teams.map((domainData, index) => (
        <div
          key={domainData.name}
          className={`Domain${index + 1} justify-center flex flex-col`}
        >
          <div className="relative mx-auto w-screen text-white text-3xl font-bold flex items-center justify-center">
            <img
              src={Image}
              className="SponsorArrow w-full scale-y-50"
              alt="Sponsor Arrow"
            />
            <span className="absolute">{domainData.name}</span>
          </div>
          <div className="flex flex-row gap-6 justify-center mt-4">
            {domainData.heads.map((head, i) => (
              <div
                key={head}
                className="flex flex-col items-center scale-75 md:scale-90 space-y-2"
              >
                <img
                  src={`/TEAM/Heads/${head}.png`}
                  alt={head}
                  className="w-32 object-cover"
                  onError={(e) => {
                    e.target.src = `/TEAM/Heads/Missing.png`;
                    e.target.onerror = null;
                  }}
                />
                <div className="bg-[#4B16B2] rounded-tl-xl w-full rounded-br-xl text-white text-center">
                  {head}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Team;

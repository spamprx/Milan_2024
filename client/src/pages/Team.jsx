import React, { useEffect, useState } from "react";
import Image from "../assets/SponsorArrow.png";

function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/TEAM/Team.json")
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
          <div className="flex flex-col gap-6 justify-center mt-4">
            <div className="flex flex-row Heads justify-center">
              {domainData.heads.map((head, i) => (
                <div
                  key={head}
                  className="flex flex-col items-center mx-2 space-y-2"
                >
                  <img
                    src={`/TEAM/Heads/${head}.png`}
                    alt={head}
                    className="w-40 object-cover"
                    onError={(e) => {
                      e.target.src = `/TEAM/Heads/Missing.png`;
                      e.target.onerror = null;
                    }}
                  />
                  <div className="bg-[#4B16B2] rounded-tl-xl w-full p-1 rounded-br-xl text-white text-center">
                    {head}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col Coords justify-center">
              {domainData.coords
                .reduce((result, coord, i) => {
                  if (i % 6 === 0) result.push([]);
                  result[result.length - 1].push(coord);
                  return result;
                }, [])
                .map((coordGroup, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex flex-row gap-4 my-2 justify-center"
                  >
                    {coordGroup.map((coord) => (
                      <div
                        key={coord}
                        className="flex flex-col items-center scale-75 md:scale-90 space-y-4"
                      >
                        <img
                          src={`/TEAM/Coords/${coord}.png`}
                          alt={coord}
                          className="w-32 object-cover"
                          onError={(e) => {
                            e.target.src = `/TEAM/Coords/Missing.png`;
                            e.target.onerror = null;
                          }}
                        />
                        <div className="bg-[#FF7900] rounded-tl-xl w-full p-1 rounded-br-xl text-white text-center">
                          {coord}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Team;

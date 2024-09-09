import React, { useEffect, useState } from "react";
import Image from "../assets/SponsorArrow.png";
import TeamMember from "../components/TeamMember";
function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/TEAM/Team.json")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <div className="w-full px-4 min-h-screen">
      {teams.map((team) => (
        <div
          key={team.name}
          className="mb-12 flex flex-col items-center justify-center"
        >
          <div className="relative flex items-center justify-center h-4/5 w-screen p-10 mt-5 mb-10">
            <div className="absolute flex w-full h-full items-center justify-center">
              <img
                src={Image}
                alt="SponsorArrow"
                className="w-full scale-y-90 sm:scale-y-75 lg:scale-y-50"
              />
            </div>

            <p className="relative z-10 text-white text-center text-2xl sm:text-3xl lg:text-3xl">
              {team.name}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {team.heads.map((head) => (
                <TeamMember
                  key={head.name}
                  name={head.name}
                  personImage={head.image || "/TEAM/Heads/Missing.png"}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
              {team.coords.map((coord) => (
                <TeamMember
                  key={coord.name}
                  name={coord.name}
                  personImage={coord.image || "/TEAM/Coords/Missing.png"}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Team;

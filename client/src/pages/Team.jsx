import React, { useEffect, useState } from "react";
import Image from "../assets/SponsorArrow.png";
import TeamMember from "../components/TeamMember";
import OCText from "/public/TEAM/OC/OCText.png";
import OCBg from "/public/TEAM/OC/Addy_Bg.png";
import Milan_OC from "/public/TEAM/OC/Milan Oc.png";

function Team() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("/TEAM/Team.json")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <div className="w-screen min-h-screen">
      <div className="w-screen h-auto flex justify-center items-center my-8 md:my-12">
        <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto flex justify-center items-center m-2 sm:m-0">
          <img
            src={Milan_OC}
            className="w-full h-auto object-contain"
            alt="OC Text"
          />
        </div>
      </div>
      {teams.map((team) => (
        <div
          key={team.name}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative flex items-center justify-center h-4/5 w-screen my-10 md:my-16">
            <div className="absolute flex w-full h-full items-center justify-center">
              <img
                src={Image}
                alt="SponsorArrow"
                className="w-full scale-y-125 sm:scale-y-75 lg:scale-y-[65%]"
              />
            </div>

            <p className="relative z-10 text-white text-center text-xl sm:text-3xl lg:text-3xl">
              {team.name}
            </p>
          </div>

          <div className="flex items-center justify-center my-6 md:my-10">
            <div
              className={`w-full grid gap-8 ${
                team.heads.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
              }`}
            >
              {team.heads.map((head) => (
                <TeamMember
                  key={head.name}
                  name={head.name}
                  personImage={head.image || "/TEAM/Heads/Missing.png"}
                  isHead={true}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center my-10 md:my-16">
            <div
              className={`w-full grid gap-8 mt-10 ${
                team.coords.length < 3
                  ? "grid-cols-2"
                  : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
              }`}
            >
              {team.coords.map((coord) => (
                <TeamMember
                  key={coord.name}
                  name={coord.name}
                  personImage={coord.image || "/TEAM/Coords/Missing.png"}
                  isHead={false}
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../assets/SponsorArrow.png";
import TeamMember from "../components/TeamMember";
import Milan_OC from "/TEAM/OC/Milan Oc.png";
import Loading from "./Loading.jsx";

function Team() {
  const [teams, setTeams] = useState([]);
  const [hrCouncilMembers, setHRCouncilMembers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();
      try {
        const [teamResponse, hrCouncilResponse] = await Promise.all([
          fetch("/TEAM/Team.json"),
          fetch("/TEAM/HRCouncil.json"),
        ]);

        const teamData = await teamResponse.json();
        const hrCouncilData = await hrCouncilResponse.json();

        setTeams(teamData);
        setHRCouncilMembers(hrCouncilData[0].member);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(2000 - elapsedTime, 0);

        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-auto flex justify-center items-center my-8 md:my-12">
        <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-auto flex justify-center items-center m-2 sm:m-0">
          <img
            src={Milan_OC}
            className="w-full h-auto object-contain"
            alt="OC Text"
            loading="lazy"
          />
        </div>
      </div>

      {teams.map((team) => (
        <div
          key={team.name}
          className="flex flex-col items-center justify-center"
        >
          <div className="relative flex items-center justify-center h-4/5 w-full p-10 mt-5 mb-10">
            <div className="absolute flex w-full h-full items-center justify-center">
              <img
                src={Image}
                alt="SponsorArrow"
                className="w-full scale-y-125 sm:scale-y-75 lg:scale-y-[65%]"
                loading="lazy"
              />
            </div>

            <p className="relative z-10 text-white text-center text-xl sm:text-2xl lg:text-3xl">
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
                  isHr={false}
                  lazy={true}
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
                  isHr={false}
                  lazy={true}
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center h-4/5 w-full my-10 md:my-16">
          <div className="absolute flex w-full h-full items-center justify-center">
            <img
              src={Image}
              alt="SponsorArrow"
              className="w-full scale-y-125 sm:scale-y-75 lg:scale-y-[65%]"
              loading="lazy"
            />
          </div>

          <p className="relative z-10 text-white text-center text-xl sm:text-3xl lg:text-3xl">
            HR Council
          </p>
        </div>

        <div className="flex items-center justify-center my-6 md:my-10">
          <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {hrCouncilMembers.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center justify-center"
              >
                <TeamMember
                  name={member.name}
                  personImage={member.image || "/TEAM/Coords/Missing.png"}
                  isHead={false}
                  isHr={true}
                  lazy={true}
                />
                <p className="text-white text-center text-lg mt-2">
                  {member.hostel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
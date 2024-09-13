import React from "react";
import Subtract from "../assets/Subtract.svg";

function CardLiveScore({ match }) {
  const sport = match.sport;
  const team1 = match.team1;
  const team2 = match.team2;
  const score1 = match.score1;
  const score2 = match.score2;
  const ID = match.matchId.replace(/\D/g, "");
  const sportImage = `/CARD_ASSETS/${sport}.png`;

  return (
    <div className="relative scale-[0.7] md:scale-75 lg:scale-90">
      <div className="relative flex w-fit max-w-screen-sm bg-gradient-to-r from-[#D9d9d9] to-gray-400 rounded-lg">
        <img
          src={Subtract}
          alt="Subtract"
          className="flex-1 -translate-x-6 translate-y-3 z-20"
        />
        <div className="absolute inset-0 flex items-center translate-x-3 -translate-y-3 justify-center z-20 ">
          <div className="-translate-x-6 -translate-y-40 p-2 rounded-tr-xl rounded-bl-xl z-20">
            <div className="flex flex-col text-xs font-be-vietnam text-[#4B16B2]">
              TIME
              <span className="text-xl font-extrabold -translate-y-2">
                {match.startTime.slice(11, 16)}
              </span>
            </div>
          </div>
          <div className="flex flex-col -translate-y-2 gap-2 translate-x-7">
            <div className="bg-[#4B16B2] text-xl font-bold font-be-vietnam text-white ring-[#4B16B2] ring-1 -translate-y-32 p-2 rounded-tr-xl rounded-bl-xl z-20">
              LIVESCORE
            </div>
            <div className="text-md font-bold font-be-vietnam text-white -translate-y-16 p-2 rounded-tr-xl rounded-bl-xl z-20">
              MATCH : {ID}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center translate-x-20 translate-y-8 justify-center">
          <div className="bg-[#170734]/[0.57] w-1/4 h-1/4 z-10"></div>
          <div className="bg-[#170734]/[0.57] w-1/4 h-1/2 z-10"></div>
          <img
            src={sportImage}
            alt={sport}
            className="absolute w-1/2 translate-x-20"
          />
        </div>
        <div className="flex flex-row absolute inset-0 items-center justify-center z-30 -translate-x-16 -translate-y-12">
          <div className="flex flex-col translate-x-1 gap-2 z-10">
            <span className="text-4xl font-bold font-be-vietnam text-[#4B16B2] text-center -translate-y-2">
              {score1}
            </span>
            <span className="text-xs font-be-vietnam w-full text-[#F3F1F6]">
              {team1}
            </span>
            <hr className="w-16 border-1 border-[#F3F1F6]" />
            <span className="text-ld font-bold font-be-vietnam text-[#F3F1F6]">
              00
            </span>
          </div>
          <div className="flex flex-col -translate-x-1 gap-2">
            <span className="text-4xl font-bold font-be-vietnam text-white mb-6 -translate-y-2">
              :
            </span>
            <hr className="w-16 border-2" />
            <span className="text-xs font-semibold font-be-vietnam bg-[#F3F1F6] text-[#4B16B2] rounded-2xl my-1">
              Fouls
            </span>
          </div>
          <div className="flex flex-col -translate-x-4 gap-2">
            <span className="text-4xl font-bold font-be-vietnam text-[#4B16B2] text-center -translate-y-2">
              {score2}
            </span>
            <span className="text-xs font-be-vietnam w-full text-[#F3F1F6]">
              {team2}
            </span>
            <hr className="w-16 border-1 border-[#F3F1F6]" />
            <span className="text-ld font-bold font-be-vietnam text-[#F3F1F6]">
              00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardLiveScore;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { format } from 'date-fns';

const GameDetails = React.forwardRef(({ game }, ref) => {
  if (!game) return null;

  return (
    <>
      <div ref={ref} className="bg-white rounded-2xl shadow-lg">
        <div className="bg-[#4513AD] text-2xl text-white rounded-t-2xl p-2 font-extrabold text-center">
          {game.title}
          <p className="text-white text-sm text-center font-bold">{game.category}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#D1CCB6] ">
          <div className="space-y-2 px-4 text-center">
            <p>
              Teams:
              <br/><span className='font-bold'>{game.teams}</span>
            </p>
            
            <hr className="w-full h-[2px] mx-auto bg-black mt-5" />
            <p className="be-vietnam-pro ">
              Venue: <br /> <span className='font-bold'>{game.body}</span>
            </p>
            <hr className="w-full h-[2px] mx-auto bg-black" />
            <p className="be-vietnam-pro">
              Time: <br />
              <span className="text-2xl font-bold">{game.time}</span>
            </p>
            <hr className="w-full h-[2px] mx-auto bg-black" />
            <p className="be-vietnam-pro font-bold">WINNER:</p>
          </div>
          <div className="w-full bg-[#DEB116] p-4 rounded-b-2xl text-3xl font-bold">
            {game.winner || "Not decided"}
          </div>
        </div>
      </div>
      {/* <div className="bg-[#D1CCB6] rounded-lg border-8 border-black mt-4 shadow-lg p-4">
        <h4 className="font-semibold mb-4 text-center text-2xl">Block Metrics</h4>
        <div className="space-y-6">
          <div className="text-center">
            <p>No team-specific metrics available for this event.</p>
          </div>
        </div>
      </div> */}
    </>
  );
});

GameDetails.displayName = 'GameDetails';

export default GameDetails;
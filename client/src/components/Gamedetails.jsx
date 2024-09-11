import React from 'react';
import { Clock, MapPin, Users, Trophy } from 'lucide-react';

const GameDetails = React.forwardRef(({ game }, ref) => {
  if (!game) return null;

  return (
    <div ref={ref} className="max-w-xl mx-auto bg-[#2D1B69] rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#6B5794]/[0.84] text-white p-4">
        <h2 className="text-2xl font-bold text-center text-white">{game.title}</h2>
        <p className="text-center mt-1 text-white">{game.category}</p>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-2 items-center justify-between gap-4 mx-8">
          <InfoItem icon={<Users className="w-5 h-5" />} label="Teams" value={game.teams} />
          <div className="row-span-2 flex items-center ">
            <InfoItem icon={<MapPin className="w-5 h-5" />} label="Venue" value={game.body} />
          </div>
          <InfoItem icon={<Clock className="w-5 h-5" />} label="Time" value={game.time} />
        </div>
        
        <WinnerSection winner={game.winner} />
      </div>
    </div>
  );
});

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-[#DEB116]">{icon}</div>
    <div>
      <p className="text-sm text-purple-300">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  </div>
);

const WinnerSection = ({ winner }) => (
  <div className="mt-4 bg-[#3D2B79] rounded-lg p-3 flex items-center justify-between">
    <div className="flex items-center">
      <Trophy className="w-6 h-6 text-[#DEB116] mr-3" />
      <span className="text-purple-200 font-semibold">Winner</span>
    </div>
    <div className="bg-[#DEB116] p-3 rounded-lg">
      <p className="text-[#2D1B69] font-bold">{winner || "Not decided"}</p>
    </div>
  </div>
);

GameDetails.displayName = 'GameDetails';

export default GameDetails;
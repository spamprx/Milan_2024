import React from 'react';
import { ChartBar, Users, Trophy } from 'lucide-react';

const GameDetails = React.forwardRef(({ game , category }, ref) => {
    if (!game) return null;

    return (
        <div ref={ref} className="w-80 mx-auto bg-[#2D1B69] rounded-3xl scale-75 md:scale-100 shadow-lg overflow-hidden">
        <div className="bg-[#6B5794]/[0.84] text-white p-4">
            <h2 className="text-2xl font-bold text-center text-white truncate">{game.sport}</h2>
        </div>
        
        {category === "SPORTS" && (
            <div className="lg:p-6 p-4">
                <div className="grid grid-cols-2 items-center justify-between gap-2 lg:mx-4">
                    <InfoItem icon={<Users className="w-6 h-6" />} label="Team 1" value={game.team1} />
                    <InfoItem icon={<Users className="w-6 h-6" />} label="Team 2" value={game.team2} />
                    <InfoItem icon={<ChartBar className="w-6 h-6" />} label="Score 1" value={game.score1} />
                    <InfoItem icon={<ChartBar className="w-6 h-6" />} label="Score 2" value={game.score2} />
                </div>
                <WinnerSection winner={game.winner} />
            </div>
        )}
        {(category === "CULTURALS" || category === "SCI-TECH" )&& (
            <div className="lg:p-6 p-4 flex flex-col">
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    <div className="bg-[#DEB116] px-4 mx-4 w-fit rounded-xl">
                        <p className="text-[#2D1B69] font-bold">{game.team1 || "Not decided"}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center mt-6'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Trophy className="w-8 h-8 text-zinc-400" />
                        <div className="bg-[#DEB116] px-4 mx-4 w-fit rounded-xl">
                            <p className="text-[#2D1B69] font-bold">{game.team1 || "Not decided"}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Trophy className="w-8 h-8 text-amber-700" />
                        <div className="bg-[#DEB116] px-4 mx-4 w-fit rounded-xl">
                            <p className="text-[#2D1B69] font-bold">{game.team1 || "Not decided"}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
});

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2">
        <div className="text-[#DEB116]">{icon}</div>
        <div>
            <p className="text-sm text-purple-300">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    </div>
);

const WinnerSection = ({ winner }) => (
    <div className="mt-2 bg-[#3D2B79] rounded-xl py-2 px-3 flex items-center gap-4 justify-between">
        <div className="flex items-center">
            <Trophy className="w-6 h-6 text-[#DEB116] mr-3" />
            <span className="text-purple-200 font-semibold">Winner</span>
        </div>
        <div className="bg-[#DEB116] p-2 px-3 w-fit rounded-xl">
            <p className="text-[#2D1B69] font-bold">{winner || "Not decided"}</p>
        </div>
    </div>
);

GameDetails.displayName = 'GameDetails';

export default GameDetails;
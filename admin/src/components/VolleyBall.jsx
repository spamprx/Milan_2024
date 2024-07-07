import React from "react";
import ScoreCard from "./ScoreCard";

const Volleyball = ({ matchId, team1, team2, score1, score2 }) => {
  return (
    <ScoreCard matchId={matchId} team1={team1} team2={team2}>
      <div className="volleyball-score">
        <div>
          {team1}: {score1.join(" - ")}
        </div>
        <div>
          {team2}: {score2.join(" - ")}
        </div>
      </div>
    </ScoreCard>
  );
};

export default Volleyball;

import React from "react";
import ScoreCard from "./ScoreCard";

const Tennis = ({ matchId, team1, team2, score1, score2 }) => {
  return (
    <ScoreCard matchId={matchId} team1={team1} team2={team2}>
      <div className="tennis-score">
        <div>
          {team1}: {score1}
        </div>
        <div>
          {team2}: {score2}
        </div>
      </div>
    </ScoreCard>
  );
};

export default Tennis;

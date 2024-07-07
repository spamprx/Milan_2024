import React from "react";
import ScoreCard from "./ScoreCard";

const Cricket = ({
  matchId,
  team1,
  team2,
  score1,
  score2,
  wicket1,
  wicket2,
  over1,
  over2,
}) => {
  return (
    <ScoreCard matchId={matchId} team1={team1} team2={team2}>
      <div className="cricket-score">
        <div>
          {team1}: {score1}/{wicket1} ({over1} overs)
        </div>
        <div>
          {team2}: {score2}/{wicket2} ({over2} overs)
        </div>
      </div>
    </ScoreCard>
  );
};

export default Cricket;

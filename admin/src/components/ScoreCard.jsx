// eslint-disable-next-line react/prop-types
const ScoreCard = ({ matchId, team1, team2, children }) => {
  return (
    <div className="score-card">
      <h2>Match ID: {matchId}</h2>
      <h3>
        {team1} vs {team2}
      </h3>
      {children}
    </div>
  );
};

export default ScoreCard;

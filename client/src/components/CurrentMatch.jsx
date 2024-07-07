import React from "react";

const CurrentMatch = ({ selectedSport, currentMatches, onSportClick }) => {
  return (
    <div className="current-match-card">
      <h2>Live Scores</h2>
      {!selectedSport ? (
        <ul className="match-list">
          {currentMatches.map((match) => (
            <li key={match.Sport}>
              <button onClick={() => onSportClick(match.Sport)}>
                {`${match.Sport}: ${match.Team1} vs ${match.Team2}`}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="match-details" onClick={() => onSportClick(null)}>
          <h3>{selectedSport}</h3>
          {currentMatches
            .filter((m) => m.Sport === selectedSport)
            .map((match) => (
              <div key={match.Team1}>
                <p>
                  {match.Team1} vs {match.Team2}
                </p>
                <p>
                  Score: {match.Score1} - {match.Score2}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CurrentMatch;

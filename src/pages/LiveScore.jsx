import React, { useState, useEffect } from "react";
import LiveScoreTable from "../components/LivescoreTable";
import scores from "../scores.json";
import CurrentMatch from "../components/CurrentMatch";

function LiveScore() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null); // Track selected sport

  const games = scores;
  const blocknames = ["Team1", "Score1", "Team2", "Score2"];
  const points = games.map((game) => [
    game.Team1,
    game.Score1,
    game.Team2,
    game.Score2,
  ]);

  const handleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const handleFilteredGames = (games) => {
    setFilteredGames(games);
  };

  // Extract current matches from the scores.json
  useEffect(() => {
    const currentMatchesData = games.reduce((acc, game) => {
      const sport = game.Sport;
      if (!acc[sport]) {
        acc[sport] = game;
      }
      return acc;
    }, {});

    setCurrentMatches(Object.values(currentMatchesData));
  }, [games]);

  const handleSportClick = (sport) => {
    // Toggle selected sport and filter games
    setSelectedSport(sport === selectedSport ? null : sport);
  };

  return (
    <div className="table mx-auto py-8 px-4">
      <CurrentMatch
        selectedSport={selectedSport}
        currentMatches={currentMatches}
        onSportClick={handleSportClick}
      />

      <LiveScoreTable
        games={games}
        blocknames={blocknames}
        points={points}
        isFiltered={selectedSport ? selectedSport === "Cricket" : isFiltered}
        handleFilter={handleFilter}
        handleFilteredGames={handleFilteredGames}
        allGames={games.map((game) => game.Sport)}
        tag="Sport Scores"
        excludeCurrentMatches={currentMatches}
      />
    </div>
  );
}

export default LiveScore;

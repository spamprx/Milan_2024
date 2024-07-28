import React, { useState, useEffect } from "react";
import LiveScoreTable from "../components/LivescoreTable";
import scores from "../scores.json";
import axios from "axios";
import CurrentMatch from "../components/CurrentMatch";

function LiveScore() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);

  const games = scores;
  const blocknames = ["Team1", "Score1", "Team2", "Score2"];
  const points = games.map((game) => [
    game.Team1,
    game.Score1,
    game.Team2,
    game.Score2,
  ]);

  const fetchLiveMatches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/live-matches"
      );
      console.log("Live matches:", response.data);
      setLiveMatches(response.data);
    } catch (error) {
      console.error("Error fetching live matches:", error);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const handleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const handleFilteredGames = (games) => {
    setFilteredGames(games);
  };

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
    setSelectedSport(sport === selectedSport ? null : sport);
  };

  const matchesJSON = JSON.stringify(liveMatches, null, 2);

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
      <pre>{matchesJSON}</pre>
    </div>
  );
}

export default LiveScore;

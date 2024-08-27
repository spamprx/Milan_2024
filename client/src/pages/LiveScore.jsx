import React, { useState, useEffect } from "react";
import LiveScoreTable from "../components/LivescoreTable";
import scores from "../scores.json";
import axios from "axios";
import CurrentMatch from "../components/CurrentMatch";
import CardLiveScore from "../components/CardLiveScore";
import CardLiveScoreRev from "../components/CardLiveScoreRev";

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

  return (
    <div className="flex flex-col min-w-[375px] w-fit mx-auto justify-center h-fit">
      {/* Conditional rendering based on some condition */}
      {false ? (
        <>
          <CurrentMatch
            selectedSport={selectedSport}
            currentMatches={currentMatches}
            onSportClick={handleSportClick}
          />
          <LiveScoreTable
            games={games}
            blocknames={blocknames}
            points={points}
            isFiltered={
              selectedSport ? selectedSport === "Cricket" : isFiltered
            }
            handleFilter={handleFilter}
            handleFilteredGames={handleFilteredGames}
            allGames={games.map((game) => game.Sport)}
            tag="Sport Scores"
            excludeCurrentMatches={currentMatches}
          />
        </>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 scale-75 lg:scale-90 w-full gap-x-24 gap-y-32 justify-items-center">
        <CardLiveScoreRev />
        <CardLiveScore />
        <CardLiveScoreRev />
        <CardLiveScore />
        <CardLiveScoreRev />
        <CardLiveScore />
      </div>
    </div>
  );
}

export default LiveScore;

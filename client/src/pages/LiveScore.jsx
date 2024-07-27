import React, { useState, useEffect } from "react";
import LiveScoreTable from "../components/LivescoreTable";
// import scores from "../scores.json";
import axios from "axios";
import CurrentMatch from "../components/CurrentMatch";

const BACKEND_URL="https://backend-w6vj.onrender.com"

function LiveScore() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredGames, setFilteredGames] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [endedMatches, setEndedMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);

  // const games = scores;
  // const blocknames = ["Team1", "Score1", "Team2", "Score2"];
  // const points = games.map((game) => [
  //   game.Team1,
  //   game.Score1,
  //   game.Team2,
  //   game.Score2,
  // ]);

  const fetchLiveMatches = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/live-matches`
      );
      console.log("Live matches:", response.data);
      setLiveMatches(response.data);
    } catch (error) {
      console.error("Error fetching live matches:", error);
    }
  };

  const fetchEndedMatches = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/ended-matches`
      );
      console.log("Ended matches:", response.data);
      setEndedMatches(response.data);
    } catch (error) {
      console.error("Error fetching ended matches:", error);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
    fetchEndedMatches();
  }, []);

  const handleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const handleFilteredGames = (games) => {
    setFilteredGames(games);
  };

  useEffect(() => {
    const currentMatchesData = liveMatches.reduce((acc, game) => {
      const sport = game.Sport;
      if (!acc[sport]) {
        acc[sport] = game;
      }
      return acc;
    }, {});

    setCurrentMatches(Object.values(currentMatchesData));
  }, [liveMatches]);

  const handleSportClick = (sport) => {
    setSelectedSport(sport === selectedSport ? null : sport);
  };

  const matchesJSON = JSON.stringify(liveMatches, null, 2);

  const allSports = [
    ...new Set([
      ...endedMatches.map((match) => match.sport),
      ...liveMatches.map((match) => match.sport),
    ]),
  ];

  return (
    <div className="table mx-auto py-8 px-4">
      {/* <CurrentMatch
        selectedSport={selectedSport}
        currentMatches={currentMatches}
        onSportClick={handleSportClick}
      /> */}

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Live Matches</h2>
        {liveMatches.map((match, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded">
            <h3 className="text-lg font-semibold">Match ID: {match.matchId}</h3>
            <p>
              <strong>Sport:</strong> {match.sport}
            </p>
            <p>
              <strong>Team 1:</strong> {match.team1}
            </p>
            <p>
              <strong>Score 1:</strong> {match.score1}
            </p>
            <p>
              <strong>Wicket 1:</strong> {match.wicket1}
            </p>
            <p>
              <strong>Over 1:</strong> {match.over1}
            </p>
            <p>
              <strong>Team 2:</strong> {match.team2}
            </p>
            <p>
              <strong>Score 2:</strong> {match.score2}
            </p>
            <p>
              <strong>Wicket 2:</strong> {match.wicket2}
            </p>
            <p>
              <strong>Over 2:</strong> {match.over2}
            </p>
            {/* <p>
              <strong>Start Time:</strong> {match.startTime}
            </p> */}
          </div>
        ))}
      </div>

      <LiveScoreTable
        // games={liveMatches}
        endedMatches={endedMatches}
        // blocknames={blocknames}
        // points={points}
        isFiltered={selectedSport ? selectedSport === "Cricket" : isFiltered}
        handleFilter={handleFilter}
        handleFilteredGames={handleFilteredGames}
        allGames={allSports}
        tag="Sport Scores"
        // excludeCurrentMatches={currentMatches}
      />
      {/* <pre>{matchesJSON}</pre> */}
    </div>
  );
}

export default LiveScore;

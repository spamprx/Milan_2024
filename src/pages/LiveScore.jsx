import React, { useState } from "react";
import LiveScoreTable from "../components/LivescoreTable";
import scores from "../scores.json";

function LiveScore() {
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

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

  //   const handleFilteredBlocks = (blocks) => {
  //     setFilteredBlocks(blocks);
  //   };

  const handleFilteredGames = (games) => {
    setFilteredGames(games);
  };

  return (
    <div className="table mx-auto py-8 px-4">
      <LiveScoreTable
        games={games}
        blocknames={blocknames}
        points={points}
        isFiltered={isFiltered}
        handleFilter={handleFilter}
        // handleFilteredBlocks={handleFilteredBlocks}
        handleFilteredGames={handleFilteredGames}
        // allBlocks={blocknames}
        allGames={games.map((game) => game.Sport)}
        tag="Sport Scores"
      />
    </div>
  );
}

export default LiveScore;

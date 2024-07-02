import { useState } from "react";
import DivBar from "./Graph";
import Table from "./Table";

function Category({ title, blocknames, games, points }) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredBlocks, setFilteredBlocks] = useState(blocknames);
  const [filteredGames, setFilteredGames] = useState(games);

  const handleFilter = () => {
    setIsFiltered(!isFiltered);
  };

  const handleFilteredBlocks = (selectedBlocks) => {
    setFilteredBlocks(selectedBlocks);
  };

  const handleFilteredGames = (selectedGames) => {
    setFilteredGames(selectedGames);
  };

  const filteredPoints = {};
  filteredGames.forEach((game, index) => {
    const gameIndex = games.indexOf(game) + 1;
    filteredPoints[index + 1] = points[gameIndex].filter((_, i) =>
      filteredBlocks.includes(blocknames[i])
    );
  });

  return (
    <>
      <DivBar
        blocknames={isFiltered ? filteredBlocks : blocknames}
        games={isFiltered ? filteredGames : games}
        points={isFiltered ? filteredPoints : points}
        title={title}
      />
      <div className="table mx-auto py-8 px-4">
        <Table
          blocknames={isFiltered ? filteredBlocks : blocknames}
          games={isFiltered ? filteredGames : games}
          points={isFiltered ? filteredPoints : points}
          isFiltered={isFiltered}
          handleFilter={handleFilter}
          handleFilteredBlocks={handleFilteredBlocks}
          handleFilteredGames={handleFilteredGames}
          allBlocks={blocknames}
          allGames={games}
          tag={title}
        />
      </div>
    </>
  );
}

export default Category;

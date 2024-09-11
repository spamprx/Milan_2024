import React, { useState } from "react";
import Filter from "./CategoryFilter";
import DivBar from "./Graph";
import Table from "./Table";

function Filters({ blocks, games, filteredBlocks, filteredGames }) {
  return (
    <div className="absolute top-0 z-50 flex flex-row h-fit w-1/3 justify-between">
      <Filter
        options={blocks}
        onCategoryChange={filteredBlocks}
        title="Select Block"
      />
      <Filter
        options={games}
        onCategoryChange={filteredGames}
        title="Select Event"
      />
    </div>
  );
}

function Category({ title, blocknames, games, points }) {
  const [filteredBlocks, setFilteredBlocks] = useState(blocknames);
  const [filteredGames, setFilteredGames] = useState(games);

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
    <div className="relative flex flex-col items-center">
      <Filters
        blocks={blocknames}
        games={games}
        filteredBlocks={handleFilteredBlocks}
        filteredGames={handleFilteredGames}
      />
      <div className="pt-16 w-full">
        <DivBar
          blocknames={filteredBlocks}
          games={filteredGames}
          points={filteredPoints}
          title={title}
        />
      </div>
      <div className="table mx-auto py-8 px-4 w-full">
        <Table
          blocknames={filteredBlocks}
          games={filteredGames}
          points={filteredPoints}
          tag={title}
        />
      </div>
    </div>
  );
}

export default Category;

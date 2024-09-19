import React, { useState } from "react";
import Filter from "./CategoryFilter";
import DivBar from "./Graph";
import Table from "./Table";

function Filters({ blocks, games, filteredBlocks, filteredGames }) {
  return (
    <div className="absolute top-0 z-30 flex justify-between w-full">
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
    <div className="relative flex flex-col items-center mx-8">
      <Filters
        blocks={blocknames}
        games={games}
        filteredBlocks={handleFilteredBlocks}
        filteredGames={handleFilteredGames}
      />
      <div className="mt-24 w-full">
        <DivBar
          blocknames={filteredBlocks}
          games={filteredGames}
          points={filteredPoints}
          title={title}
        />
      </div>
      <div className="table mx-4 my-10 w-full">
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

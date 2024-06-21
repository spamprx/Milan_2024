import { useState } from "react";
import DivBar, { Filter } from "./DivBar";
import Table from "./Table";
const blocknames = [
  "ARYABHATTA",
  "BHASKARA",
  "BRAHMAGUPTA",
  "CHARAKA",
  "GARGI",
  "KAPILA",
  "KAUTILYA",
  "MAITREYI",
  "RAMANUJA",
  "SUSRUTA",
  "VARAHAMIHIRA",
  "VYASA",
];
const games = [
  "SOLO DANCE",
  "DUO-TRIO DANCE",
  "GROUP DANCE",
  "PANDORAS BOX OF DRAMA",
  "STILL FRAME PHOTOGRAPHY",
  "THE LOW EFFORT COMPETITION",
  "BMC CODENAMES",
  "DUMB CHARADES",
  "GENERAL QUIZ",
  "NOT SO SORRY",
  "BATTLE OF BANDS",
  "SOLO SINGING",
  "MINI POETRY JAM",
  "JUNK ART SHOW",
  "NAVARASA NATANA",
  "RAP BATTLE",
  "TREASURE HUNT",
  "FASHION SHOW",
];
const points = {
  1: [
    76, 65, 78, 62, 74, 67, 79, 68, 63, 75, 73, 72, 64, 71, 69, 66, 80, 77, 70,
  ],
  2: [
    80, 63, 65, 79, 64, 67, 81, 68, 75, 71, 76, 73, 74, 72, 69, 77, 66, 70, 78,
  ],
  3: [
    64, 68, 82, 79, 81, 65, 67, 75, 76, 71, 69, 73, 66, 80, 74, 72, 77, 78, 70,
  ],
  4: [
    83, 79, 69, 76, 66, 81, 75, 68, 78, 71, 73, 65, 82, 67, 77, 70, 72, 74, 80,
  ],
  5: [
    84, 68, 81, 80, 78, 75, 71, 82, 66, 83, 76, 67, 73, 69, 79, 72, 70, 77, 74,
  ],
  6: [
    69, 85, 68, 70, 71, 79, 76, 83, 72, 67, 78, 81, 84, 75, 74, 73, 82, 80, 77,
  ],
  7: [
    68, 79, 86, 85, 72, 76, 75, 71, 84, 80, 70, 83, 82, 69, 81, 78, 73, 74, 77,
  ],
  8: [
    69, 75, 83, 87, 76, 86, 70, 78, 81, 80, 71, 84, 72, 85, 73, 82, 74, 77, 79,
  ],
  9: [
    78, 88, 70, 87, 76, 77, 71, 86, 72, 75, 84, 83, 85, 73, 81, 80, 82, 74, 79,
  ],
  10: [
    79, 88, 85, 71, 89, 76, 83, 72, 78, 84, 80, 81, 86, 77, 73, 75, 87, 82, 74,
  ],
  11: [
    78, 72, 90, 85, 89, 86, 76, 81, 84, 79, 80, 83, 75, 87, 73, 82, 88, 74, 77,
  ],
  12: [
    91, 79, 89, 73, 75, 87, 90, 85, 76, 83, 88, 84, 81, 86, 78, 80, 77, 82, 74,
  ],
  13: [
    78, 92, 75, 91, 89, 76, 90, 77, 87, 79, 85, 88, 86, 84, 83, 81, 80, 82, 74,
  ],
  14: [
    93, 83, 92, 91, 76, 89, 78, 90, 87, 79, 77, 88, 85, 86, 84, 75, 81, 80, 82,
  ],
  15: [
    94, 84, 93, 92, 91, 90, 89, 88, 87, 86, 85, 83, 82, 81, 80, 79, 78, 77, 76,
  ],
};

function Culti() {
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

  // Filter points based on filteredGames
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
        title={"Culti"}
      />
      <div className="table mx-auto py-8">
        <button
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-lg text-md py-2.5 text-center px-10"
          onClick={handleFilter}
        >
          {isFiltered ? "Show All" : "Filter"}
        </button>
        {isFiltered && (
          <Filter
            blocks={blocknames}
            games={games}
            filteredBlocks={handleFilteredBlocks}
            filteredGames={handleFilteredGames}
          />
        )}
        <Table
          blocknames={isFiltered ? filteredBlocks : blocknames}
          games={isFiltered ? filteredGames : games}
          points={isFiltered ? filteredPoints : points}
        />
      </div>
    </>
  );
}

export default Culti;

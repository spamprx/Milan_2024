import { useState , useEffect } from "react";
import DivBar from "./Graph";
import Table from "./Table";

function ShowSelect({ param, onSelect }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === param.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([...param]);
    }
  };

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  return (
    <div className="block-select text-start pl-4">
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions.length === param.length}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>
      <ul>
        {param.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Filter({ blocks, games, filteredBlocks, filteredGames }) {
  const [showBlocks, setShowBlocks] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [selectedBlocks, setSelectedBlocks] = useState([...blocks]);
  const [selectedGames, setSelectedGames] = useState([...games]);

  const handleSave = () => {
    filteredBlocks(selectedBlocks);
    filteredGames(selectedGames);
    setShowBlocks(false);
    setShowGames(false);
  };

  return (
    <div className="text-white w-64 bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-lg text-md py-2.5 text-start px-10">
      Available Options -
      <button className="pl-2" onClick={() => setShowBlocks(!showBlocks)}>
        Select Blocks :
      </button>
      {showBlocks && <ShowSelect param={blocks} onSelect={setSelectedBlocks} />}
      <button className="pl-2" onClick={() => setShowGames(!showGames)}>
        Select Sports :
      </button>
      {showGames && <ShowSelect param={games} onSelect={setSelectedGames} />}
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

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
      <div className="table mx-auto py-8 px-4">
        <Table
          blocknames={isFiltered ? filteredBlocks : blocknames}
          games={isFiltered ? filteredGames : games}
          points={isFiltered ? filteredPoints : points}
          tag={title}
        />
      </div>
    </>
  );
}

export default Category;

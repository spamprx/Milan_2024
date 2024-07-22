import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

function ShowSelect({ param, onSelect }) {
  // Create an array of unique values from param
  const uniqueParam = [...new Set(param)];

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
    if (selectedOptions.length === uniqueParam.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([...uniqueParam]);
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
            checked={selectedOptions.length === uniqueParam.length}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>
      <ul>
        {uniqueParam.map((option) => (
          <li key={option}>
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

export function Filter({ games, filteredGames }) {
  const [showGames, setShowGames] = useState(false);
  const [selectedGames, setSelectedGames] = useState([...games]);

  const handleSave = () => {
    filteredGames(selectedGames);
    setShowGames(false);
  };

  return (
    <div className="text-white w-64 bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-lg text-md py-2.5 text-start px-10">
      Available Options -
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

function LiveScoreTable({
  // games,
  endedMatches,
  // blocknames,
  // points,
  isFiltered,
  handleFilter,
  handleFilteredGames,
  allGames,
  tag,
}) {
  const [filterText, setFilterText] = useState("");
  const [selectedSports, setSelectedSports] = useState(allGames);

  const headers = [
    {
      name: "S.No",
      selector: (row) => row.num,
      sortable: true,
      width: "80px",
      textAlign: "center",
    },
    {
      name: tag.split(" ")[0],
      selector: (row) => row.sport,
      sortable: true,
      width: "100px",
      textAlign: "center",
    },
    {
      name: "Team1",
      selector: (row) => row.team1,
      sortable: true,
      width: "100px",
      textAlign: "center",
    },
    {
      name: "Score1",
      selector: (row) => row.score1,
      sortable: true,
      width: "100px",
      textAlign: "center",
    },
    {
      name: "Team2",
      selector: (row) => row.team2,
      sortable: true,
      width: "100px",
      textAlign: "center",
    },
    {
      name: "Score2",
      selector: (row) => row.score2,
      sortable: true,
      width: "100px",
      textAlign: "center",
    },
  ];

  // Reverse order of games and adjust S.No to be in ascending order
  const data = endedMatches
    .slice()
    .reverse()
    .map((game, index) => ({
      num: index + 1, // Ensure S.No starts from 1 to length of games
      sport: game.sport,
      team1: game.team1,
      score1: game.score1,
      team2: game.team2,
      score2: game.score2,
    }));

  const filteredData = data.filter(
    (item) =>
      (item.sport.toLowerCase().includes(filterText.toLowerCase()) ||
        item.team1.toLowerCase().includes(filterText.toLowerCase()) ||
        item.team2.toLowerCase().includes(filterText.toLowerCase())) &&
      (isFiltered ? selectedSports.includes(item.sport) : true)
  );

  const subHeaderComponent = (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          padding: "6px",
          fontSize: "14px",
          width: "200px",
        }}
      />
      <button
        type="button"
        className="text-white bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-lg text-md py-2.5 text-center px-10"
        onClick={handleFilter}
      >
        {isFiltered ? "Show All" : "Filter"}
      </button>
      {isFiltered && (
        <Filter games={allGames} filteredGames={setSelectedSports} />
      )}
    </div>
  );

  return (
    <DataTable
      columns={headers}
      data={filteredData}
      showGridlines
      fixedHeader
      pagination
      subHeader
      subHeaderComponent={subHeaderComponent}
    />
  );
}

export default LiveScoreTable;

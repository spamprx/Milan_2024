import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

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

function Table({
  games,
  blocknames,
  points,
  isFiltered,
  handleFilter,
  handleFilteredBlocks,
  handleFilteredGames,
  allBlocks,
  allGames,
  tag,
}) {
  const [filterText, setFilterText] = useState("");
  const headers = [
    {
      name: "S.No",
      selector: (row) => row.num,
      sortable: true,
      width: "80px",
      textAlign: "center",
    },
    {
      name: tag.split(' ')[0],
      selector: (row) => row.sport,
      sortable: true,
      width: "80px",
      textAlign: "center",
    },
    ...blocknames.map((block) => ({
      name: block,
      selector: (row) => row[block],
      sortable: true,
      borderWidth: "10px",
      width: "100px",
      textAlign: "center",
    })),
  ];

  const data = games.map((game, gameIndex) => {
    const rowData = {
      num: gameIndex + 1,
      sport: game,
    };
    blocknames.forEach((block, blockIndex) => {
      rowData[block] = points[gameIndex + 1][blockIndex];
    });
    return rowData;
  });

  const filteredData = data.filter(
    (item) =>
      item.sport.toLowerCase().includes(filterText.toLowerCase()) ||
      blocknames.some((block) =>
        String(item[block]).toLowerCase().includes(filterText.toLowerCase())
      )
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
        <Filter
          blocks={allBlocks}
          games={allGames}
          filteredBlocks={handleFilteredBlocks}
          filteredGames={handleFilteredGames}
        />
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

export default Table;

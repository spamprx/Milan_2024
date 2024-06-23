import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Filter } from "./DivBar";

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
      name: "Sport",
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
      <div className="text-white bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-lg text-md flex py-2.5 text-center px-10">
        <button className="flex" onClick={handleFilter}>
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

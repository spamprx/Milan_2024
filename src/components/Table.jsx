import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Table({ games, blocknames, points }) {
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
    <>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          padding: "6px",
          marginBottom: "10px",
          fontSize: "14px",
          width: "200px",
        }}
      />
    </>
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

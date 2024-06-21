import React  from "react";
import DataTable from "react-data-table-component";

function Table({ games, blocknames, points }) {

  const headers = [
    {
      name: "S.No",
      selector: (row) => row.num,
      sortable: true,
    },
    {
      name: "Sport",
      selector: (row) => row.sport,
      sortable: true,
    },
    ...blocknames.map((block) => ({
      name: block,
      selector: (row) => row[block],
      sortable: true,
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

  return <DataTable columns={headers} data={data} fixedHeader pagination />;
}

export default Table;

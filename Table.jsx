import React from "react";
import DataTable from "react-data-table-component";
import "./Table.css";

function Table() {
  const headers = [
    {
      name: "S.No",
      selector: (row) => row.num,
    },
    {
      name: "Sport",
      selector: (row) => row.sport,
    },
    {
      name: "Charaka",
      selector: (row) => row.score1,
      sortable: true,
    },
    {
      name: "Aryabhatta",
      selector: (row) => row.score2,
      sortable: true,
    },
  ];
  const data = [
    {
      num: "1",
      sport: "Football",
      score1: "64",
      score2: "65",
    },
    {
      num: "2",
      sport: "Basketball",
      score1: "63",
      score2: "67",
    },
    {
      num: "3",
      sport: "Volleyball",
      score1: "65",
      score2: "63",
    },
    {
      num: "4",
      sport: "Cricket",
      score1: "66",
      score2: "68",
    },
    {
      num: "5",
      sport: "Tennis",
      score1: "66",
      score2: "68",
    },
    {
      num: "6",
      sport: "TableTennis",
      score1: "66",
      score2: "68",
    },
    {
      num: "7",
      sport: "Carrom",
      score1: "66",
      score2: "68",
    },
    {
      num: "8",
      sport: "Chess",
      score1: "66",
      score2: "68",
    },
    {
      num: "9",
      sport: "Squash",
      score1: "66",
      score2: "68",
    },
    {
      num: "10",
      sport: "WeightLifting",
      score1: "66",
      score2: "68",
    },
    {
      num: "11",
      sport: "eSports",
      score1: "66",
      score2: "68",
    },
    {
      num: "12",
      sport: "Aquatics",
      score1: "66",
      score2: "68",
    },
    {
      num: "13",
      sport: "Athletics",
      score1: "66",
      score2: "68",
    },
    {
      num: "14",
      sport: "Dodgeball",
      score1: "66",
      score2: "68",
    },
    {
      num: "15",
      sport: "Cricket",
      score1: "66",
      score2: "68",
    },
    {
      num: "16",
      sport: "Cricket",
      score1: "66",
      score2: "68",
    },
    {
      num: "17",
      sport: "Cricket",
      score1: "66",
      score2: "68",
    },
    {
      num: "18",
      sport: "Cricket",
      score1: "66",
      score2: "68",
    },
  ];
  return (
    <>
      <DataTable
        columns={headers}
        data={data}
        fixedHeader
        pagination
      ></DataTable>
    </>
  );
}

export default Table;

import React from "react";
import { useTable } from "react-table";
import Image from "../assets/MilanHome.png";

const HomeLeaderboard = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "rank",
      },
      {
        Header: "Hostel",
        accessor: "hostel",
      },
      {
        Header: "Points",
        accessor: "points",
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        rank: 1,
        hostel: "ARYABHATTA",
        points: 8200,
      },
      { rank: 2, hostel: "BHASKARA", points: 8034 },
      { rank: 3, hostel: "MAITREYI", points: 7834 },
      { rank: 4, hostel: "GARGI", points: 6623 },
      { rank: 5, hostel: "SARABHAI", points: 6435 },
      { rank: 6, hostel: "CHARAKA", points: 5298 },
      { rank: 7, hostel: "SUSRUTA", points: 5105 },
      { rank: 8, hostel: "KAUTILYA", points: 4456 },
      { rank: 9, hostel: "VYASA", points: 4328 },
      {
        rank: 10,
        hostel: "BRAHMAGUPTA",
        points: 4140,
      },
      {
        rank: 11,
        hostel: "VARAHAMIHIRA",
        points: 3907,
      },
      { rank: 12, hostel: "RAMANUJA", points: 3793 },
      {
        rank: 13,
        hostel: "RAMANUJAN",
        points: 3097,
      },
      { rank: 14, hostel: "RAMAN", points: 3024 },
      {
        rank: 15,
        hostel: "VISWESWARAYA",
        points: 2697,
      },
      { rank: 16, hostel: "BHABHA", points: 2345 },
      { rank: 17, hostel: "KALAM", points: 1920 },
      { rank: 18, hostel: "KAPILA", points: 1763 },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="w-full h-full max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-custom scrollbar-track mx-auto">
      <table {...getTableProps()} className="table-auto w-full text-center">
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="bg-transparent text-white">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-3 border border-[#D1CCB6]"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HomeLeaderboard;

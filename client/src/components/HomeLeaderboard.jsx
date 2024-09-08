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
        Header: "",
        accessor: "image",
        Cell: ({ value }) => (
          <img src={value} alt="icon" className="h-6 w-6 mx-auto" />
        ),
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
        image: Image,
        hostel: "ARYABHATTA",
        points: 8200,
      },
      { rank: 2, image: Image, hostel: "BHASKARA", points: 8034 },
      { rank: 3, image: Image, hostel: "MAITREYI", points: 7834 },
      { rank: 4, image: Image, hostel: "GARGI", points: 6623 },
      { rank: 5, image: Image, hostel: "SARABHAI", points: 6435 },
      { rank: 6, image: Image, hostel: "CHARAKA", points: 5298 },
      { rank: 7, image: Image, hostel: "SUSRUTA", points: 5105 },
      { rank: 8, image: Image, hostel: "KAUTILYA", points: 4456 },
      { rank: 9, image: Image, hostel: "VYASA", points: 4128 },
      {
        rank: 10,
        image: Image,
        hostel: "BRAHMAGUPTA",
        points: 2340,
      },
      {
        rank: 11,
        image: Image,
        hostel: "VARAHAMIHIRA",
        points: 107,
      },
      { rank: 12, image: Image, hostel: "RAMANUJA", points: 3193 },
      {
        rank: 13,
        image: Image,
        hostel: "RAMANUJAN",
        points: 3097,
      },
      { rank: 14, image: Image, hostel: "RAMAN", points: 3024 },
      {
        rank: 15,
        image: Image,
        hostel: "VISWESWARAYA",
        points: 1097,
      },
      { rank: 16, image: Image, hostel: "BHABHA", points: 2345 },
      { rank: 17, image: Image, hostel: "KALAM", points: 1920 },
      { rank: 18, image: Image, hostel: "KAPILA", points: 1763 },
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
                    className="px-4 py-4 border border-[#D1CCB6]"
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

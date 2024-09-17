import React from "react";
import { useTable } from "react-table";

const HomeLeaderboard = ({ blockData }) => {
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

  const data = React.useMemo(() => {
    if (Array.isArray(blockData)) {
      return blockData;
    }
    console.error("Expected blockData to be an array");
    return [];
  }, [blockData]);

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

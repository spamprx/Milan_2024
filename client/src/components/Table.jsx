import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import Arrow from "../assets/Page_Arrow.png";

function Table({ games, blocknames, points, tag }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [visibleBlocks, setVisibleBlocks] = useState([]);

  const hostelsPerPage = 5;

  useEffect(() => {
    const start = currentPage * hostelsPerPage;
    const end = start + hostelsPerPage;
    setVisibleBlocks(blocknames.slice(start, end));
  }, [currentPage, blocknames]);

  useEffect(() => {
    setCurrentPage(0);
  }, [blocknames]);

  const sportsColumn = useMemo(
    () => [
      {
        Header: (
          <div className="bg-[#24104E] p-2 rounded-md w-full scale-90 text-white">
            {tag.split(" ")[0].toUpperCase()}
          </div>
        ),
        accessor: "sport",
        Cell: ({ value }) => (
          <div className="bg-[#7842E2] rounded-lg m-2 p-2 text-[#D1CCB6] font-semibold truncate">
            {value}
          </div>
        ),
      },
    ],
    [tag]
  );

  const blockColumns = useMemo(
    () =>
      visibleBlocks.map((block) => ({
        Header: (
          <div className="bg-[#24104E] p-2 rounded-md truncate text-white">
            {block}
          </div>
        ),
        accessor: block,
        Cell: ({ value }) => (
          <div className="bg-[#7842E2] rounded-lg m-2 p-2 text-[#D1CCB6] font-bold break-words overflow-hidden text-ellipsis">
            {value}
          </div>
        ),
      })),
    [visibleBlocks]
  );

  const data = useMemo(
    () =>
      games.map((game, gameIndex) => {
        const rowData = {
          sport: game,
        };
        visibleBlocks.forEach((block) => {
          rowData[block] = points[gameIndex + 1][blocknames.indexOf(block)];
        });
        return rowData;
      }),
    [games, visibleBlocks, blocknames, points]
  );

  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.sport.toLowerCase().includes(filterText.toLowerCase()) ||
          visibleBlocks.some((block) =>
            String(item[block]).toLowerCase().includes(filterText.toLowerCase())
          )
      ),
    [data, filterText, visibleBlocks]
  );

  const sportsTableInstance = useTable(
    {
      columns: sportsColumn,
      data: filteredData,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const blockTableInstance = useTable(
    {
      columns: blockColumns,
      data: filteredData,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const {
    getTableProps: getSportsTableProps,
    getTableBodyProps: getSportsTableBodyProps,
    headerGroups: sportsHeaderGroups,
    rows: sportsRows,
    prepareRow: prepareSportsRow,
  } = sportsTableInstance;

  const {
    getTableProps: getBlockTableProps,
    getTableBodyProps: getBlockTableBodyProps,
    headerGroups: blockHeaderGroups,
    rows: blockRows,
    prepareRow: prepareBlockRow,
  } = blockTableInstance;

  const handleNext = () => {
    if ((currentPage + 1) * hostelsPerPage < blocknames.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
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
      </div>
      <div className="flex">
        <div className="bg-[#24104E] rounded-2xl">
          <table {...getSportsTableProps()} className="w-auto table-fixed">
            <thead>
              {sportsHeaderGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="text-center p-2 bg-[#7842E2] text-white"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getSportsTableBodyProps()}>
              {sportsRows.map((row) => {
                prepareSportsRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="text-center p-2 text-white"
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

        <div className="bg-[#24104E] w-full overflow-auto">
          <table {...getBlockTableProps()} className="w-fit table-fixed">
            <thead>
              {blockHeaderGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="text-center p-2 bg-[#7842E2] text-white"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getBlockTableBodyProps()}>
              {blockRows.map((row) => {
                prepareBlockRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="text-center p-2 text-white"
                        style={{ width: "150px" }} // Fixed width for block columns
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
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="py-2 rounded"
        >
          <img src={Arrow} alt="ArrowLeft" className="w-1/2" />
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * hostelsPerPage >= blocknames.length}
          className="py-2 rounded"
        >
          <img src={Arrow} alt="ArrowRight" className="w-1/2 scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
}

export default Table;

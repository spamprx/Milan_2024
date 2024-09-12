import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import Arrow from "../assets/Page_Arrow.png";

function Table({ games, blocknames, points, tag}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [visibleBlocks, setVisibleBlocks] = useState([]);
  const [pages, setPages] = useState(7);

  function responsivePages() {
    const minScreenWidth = 320;
    const maxScreenWidth = 1280;
    const minPages = 2;
    const maxPages = 7;

    const screenWidth = window.innerWidth;

    const clampedScreenWidth = Math.max(
      minScreenWidth,
      Math.min(screenWidth, maxScreenWidth)
    );

    const pages = Math.round(
      ((clampedScreenWidth - minScreenWidth) /
        (maxScreenWidth - minScreenWidth)) *
        (maxPages - minPages) +
        minPages
    );

    setPages(pages);
  }

  useEffect(() => {
    responsivePages();
    window.addEventListener("resize", responsivePages);
    return () => window.removeEventListener("resize", responsivePages);
  }, []);

  const hostelsPerPage = pages;

  useEffect(() => {
    const start = currentPage * hostelsPerPage;
    const end = start + hostelsPerPage;
    setVisibleBlocks(blocknames.slice(start, end));
  }, [currentPage, blocknames, hostelsPerPage]);

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
      <div className="flex w-1/3 min-w-52">
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="bg-[#7842E2] rounded-lg p-1 w-1/2 m-4 "
        />
      </div>
      <div className="flex justify-center">
        <div className="bg-[#24104E] rounded-l-2xl ml-4 max-w-[33%] overflow-x-auto">
          <table
            {...getSportsTableProps()}
            className="w-full lg:w-auto table-fixed"
          >
            <thead>
              {sportsHeaderGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="text-center p-2 bg-[#7842E2] text-white truncate"
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
                        className="text-center p-2 text-white truncate"
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

        <div className="bg-[#24104E] rounded-r-2xl mr-4 overflow-auto">
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
                        style={{ width: "150px" }}
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

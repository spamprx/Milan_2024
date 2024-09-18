import React, { useState, useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import Arrow from "../assets/Page_Arrow.png";

function Table({ games, blocknames, points, tag }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [visibleBlocks, setVisibleBlocks] = useState([]);
  const [pages, setPages] = useState(7);

  function responsivePages() {
    const minScreenWidth = 320;
    const maxScreenWidth = 1440;
    const minPages = 1;
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
          <div className="bg-[#24104E] text-sm py-2 px-4 rounded-lg text-white">
            {tag.split(" ")[0].toUpperCase()}
          </div>
        ),
        accessor: "sport",
        Cell: ({ value }) => (
          <div className="bg-[#7842E2] text-sm py-2 px-4 rounded-lg text-[#D1CCB6] font-semibold truncate">
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
          <div className="bg-[#24104E] text-sm py-2 px-4 rounded-lg truncate text-white">
            {block}
          </div>
        ),
        accessor: block,
        Cell: ({ value }) => (
          <div className="bg-[#7842E2] text-sm py-2 px-4 rounded-lg text-[#D1CCB6] font-bold break-words overflow-hidden text-ellipsis">
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
      <div className="flex items-center justify-center w-1/3 mx-auto mb-10">
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="bg-[#7842E2] rounded-lg p-1"
        />
      </div>
      <div
        className={`flex justify-center items-center 
        ${pages <= 2 ? "mx-auto" : ""}
        `}
      >
        <div className="bg-[#24104E] rounded-l-2xl">
          <table {...getSportsTableProps()}>
            <thead>
              {sportsHeaderGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="text-center max-w-44 py-2 px-4 bg-[#7842E2] rounded-tl-2xl text-white"
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
                        className="text-center max-w-44 py-2 px-4 text-white"
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

        <div className="bg-[#24104E] rounded-r-2xl">
          <table {...getBlockTableProps()}>
            <thead>
              {blockHeaderGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="text-center max-w-32 md:max-w-40 py-2 px-4 bg-[#7842E2] last:rounded-tr-2xl text-white"
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
                        className="text-center max-w-32 md:max-w-40 py-2 px-4 text-white"
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
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 0}
          className="rounded"
        >
          <div className="flex items-center justify-center">
            <img src={Arrow} alt="ArrowLeft" className="w-3/4" />
          </div>
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * hostelsPerPage >= blocknames.length}
          className="rounded"
        >
          <div className="flex items-center justify-center">
            <img src={Arrow} alt="ArrowRight" className="scale-x-[-1] w-3/4" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Table;

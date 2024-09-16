import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../index.css";
import Table from "./Table";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const colorOptions = {
  "Sports Boys": "#FF7900",
  "Sports Girls": "#FF7900",
  "Culti": "#2C88AD",
  "Sci-Tech": "#A9AB4A",
};

function GraphMobile({
  blocknames,
  categories,
  sportsBoysData,
  sportsGirlsData,
  cultiData,
  techyData,
}) {
  const [selectedGraphCategories, setSelectedGraphCategories] =
    useState(categories);
  const [selectedTableCategory, setSelectedTableCategory] = useState(
    categories[0]
  );
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setSelectedGraphCategories(categories);
    setSelectedTableCategory(categories[0]);
  }, [categories]);

  const gamesBoys = sportsBoysData?.eventNames || [];
  const gamesGirls = sportsGirlsData?.eventNames || [];
  const cultiEvents = cultiData?.eventNames || [];
  const techyEvents = techyData?.eventNames || [];

  const getDataSet = () => {
    const dataMap = new Map();

    const addData = (category, blocks, data) => {
      blocks.forEach((block, index) => {
        if (!dataMap.has(block)) {
          dataMap.set(block, { block, [category]: data[index] });
        } else {
          dataMap.get(block)[category] = data[index];
        }
      });
    };

    if (selectedGraphCategories.includes("Sports Boys")) {
      const data = sportsBoysData.blocks.map((_, blockIndex) =>
        gamesBoys.reduce(
          (sum, _, gameIndex) =>
            sum + (sportsBoysData.scores[gameIndex]?.[blockIndex] || 0),
          0
        )
      );
      addData("Sports Boys", sportsBoysData.blocks, data);
    }

    if (selectedGraphCategories.includes("Sports Girls")) {
      const data = sportsGirlsData.blocks.map((_, blockIndex) =>
        gamesGirls.reduce(
          (sum, _, gameIndex) =>
            sum + (sportsGirlsData.scores[gameIndex]?.[blockIndex] || 0),
          0
        )
      );
      addData("Sports Girls", sportsGirlsData.blocks, data);
    }

    if (selectedGraphCategories.includes("Culti")) {
      const data = blocknames.map((_, blockIndex) =>
        cultiEvents.reduce(
          (sum, _, eventIndex) =>
            sum + (cultiData.scores[eventIndex]?.[blockIndex] || 0),
          0
        )
      );
      addData("Culti", blocknames, data);
    }

    if (selectedGraphCategories.includes("Sci-Tech")) {
      const data = blocknames.map((_, blockIndex) =>
        techyEvents.reduce(
          (sum, _, eventIndex) =>
            sum + (techyData.scores[eventIndex]?.[blockIndex] || 0),
          0
        )
      );
      addData("Sci-Tech", blocknames, data);
    }

    const sortedData = Array.from(dataMap.values()).sort(
      (a, b) => b[selectedGraphCategories[0]] - a[selectedGraphCategories[0]]
    );

    const labels = sortedData.map((item) => item.block);
    const datasets = selectedGraphCategories.map((category) => ({
      label: category,
      data: sortedData.map((item) => item[category] || 0),
      backgroundColor: colorOptions[category],
    }));

    return { labels, datasets };
  };

  useEffect(() => {
    const { labels, datasets } = getDataSet();
    setChartData({ labels, datasets });
  }, [
    selectedGraphCategories,
    sportsBoysData,
    sportsGirlsData,
    cultiData,
    techyData,
  ]);

  const toggleGraphCategory = (category) => {
    setSelectedGraphCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-full">
      <div className="canvas-container flex flex-col rounded-2xl bg-[#150338] w-full justify-center items-center">
        <div className="w-full h-96 relative px-2 py-4">
          {chartData && (
            <Bar
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: { easing: "easeIn" },
                indexAxis: "y",
                plugins: {
                  title: { display: false },
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label} : ${context.parsed.x}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                    ticks: { color: "white", font: {} },
                  },
                  y: {
                    stacked: true,
                    ticks: { color: "white", font: { size: 10 } },
                  },
                },
              }}
              data={chartData}
            />
          )}
        </div>
      </div>

      {/* Separate Navbar for Table */}
      <div className="tabs-container">
        <div className="tabs text-white flex flex-wrap gap-4 justify-center my-8 mx-[5%]">
          {categories.map((category) => (
            <button
              key={category}
              className={`tab-button ${
                selectedTableCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedTableCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {selectedTableCategory === "Sports Boys" && (
            <Table
              blocknames={sportsBoysData.blocks}
              games={gamesBoys}
              points={sportsBoysData.scores}
              tag="Sports Boys"
            />
          )}
          {selectedTableCategory === "Sports Girls" && (
            <Table
              blocknames={sportsGirlsData.blocks}
              games={gamesGirls}
              points={sportsGirlsData.scores}
              tag="Sports Girls"
            />
          )}
          {selectedTableCategory === "Culti" && (
            <Table
              blocknames={blocknames}
              games={cultiEvents}
              points={cultiData.scores}
              tag="Culti"
            />
          )}
          {selectedTableCategory === "Sci-Tech" && (
            <Table
              blocknames={blocknames}
              games={techyEvents}
              points={techyData.scores}
              tag="Sci-Tech"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GraphMobile;
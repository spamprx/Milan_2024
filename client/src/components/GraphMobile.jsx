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

const colorOptions = ["#FF7900", "#2C88AD", "#A9AB4A"];

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
  const [selectedTableCategory, setSelectedTableCategory] =
    useState("Select All");

  const gamesBoys = sportsBoysData?.eventNames || [];
  const gamesGirls = sportsGirlsData?.eventNames || [];
  const cultiEvents = cultiData?.eventNames || [];
  const techyEvents = techyData?.eventNames || [];

  const getDataSet = () => {
    let datasets = [];

    if (selectedGraphCategories.includes("Sports Boys")) {
      datasets.push({
        label: "Sports Boys",
        data: blocknames.map((_, blockIndex) =>
          gamesBoys.reduce(
            (sum, _, gameIndex) =>
              sum +
              (sportsBoysData.scores[gameIndex] &&
              sportsBoysData.scores[gameIndex][blockIndex]
                ? sportsBoysData.scores[gameIndex][blockIndex]
                : 0),
            0
          )
        ),
        backgroundColor: colorOptions[0],
      });
    }

    if (selectedGraphCategories.includes("Sports Girls")) {
      datasets.push({
        label: "Sports Girls",
        data: blocknames.map((_, blockIndex) =>
          gamesGirls.reduce(
            (sum, _, gameIndex) =>
              sum +
              (sportsGirlsData.scores[gameIndex] &&
              sportsGirlsData.scores[gameIndex][blockIndex]
                ? sportsGirlsData.scores[gameIndex][blockIndex]
                : 0),
            0
          )
        ),
        backgroundColor: colorOptions[0],
      });
    }

    if (selectedGraphCategories.includes("Culturals")) {
      datasets.push({
        label: "Culturals",
        data: blocknames.map((_, blockIndex) =>
          cultiEvents.reduce(
            (sum, _, eventIndex) =>
              sum +
              (cultiData.scores[eventIndex] &&
              cultiData.scores[eventIndex][blockIndex]
                ? cultiData.scores[eventIndex][blockIndex]
                : 0),
            0
          )
        ),
        backgroundColor: colorOptions[1],
      });
    }

    if (selectedGraphCategories.includes("Sci-Tech")) {
      datasets.push({
        label: "Sci-Tech",
        data: blocknames.map((_, blockIndex) =>
          techyEvents.reduce(
            (sum, _, eventIndex) =>
              sum +
              (techyData.scores[eventIndex] &&
              techyData.scores[eventIndex][blockIndex]
                ? techyData.scores[eventIndex][blockIndex]
                : 0),
            0
          )
        ),
        backgroundColor: colorOptions[2],
      });
    }

    return datasets;
  };

  const barDataMobile = {
    labels: blocknames,
    datasets: getDataSet(),
  };

  const toggleGraphCategory = (category) => {
    if (selectedGraphCategories.includes(category)) {
      setSelectedGraphCategories(
        selectedGraphCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedGraphCategories([...selectedGraphCategories, category]);
    }
  };

  return (
    <div className="FirstTab w-full">
      <div className="canvas-container flex flex-col rounded-2xl bg-[#150338] mx-auto p-4 w-screen justify-center items-center">
        <div className="w-full h-96 relative">
          <Bar
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: { easing: "easeIn" },
              indexAxis: "y",
              plugins: {
                title: {
                  display: false,
                },
                legend: {
                  display: false,
                },
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
                  ticks: { color: "white" },
                },
                y: { stacked: true, ticks: { color: "white", size: 10 } },
              },
            }}
            data={barDataMobile}
          />
        </div>
      </div>

      {/* Separate Navbar for Table */}
      <div className="tabs-container mt-4">
        <div className="tabs bg-[#150338] text-white gap-4 flex flex-row justify-center">
          <button
            className={`tab-button ${
              selectedTableCategory === "Select All" ? "active" : ""
            }`}
            onClick={() => setSelectedTableCategory("Select All")}
          >
            Select All
          </button>
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
          {selectedTableCategory === "Culturals" && (
            <Table
              blocknames={blocknames}
              games={cultiEvents}
              points={cultiData.scores}
              tag="Culturals"
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
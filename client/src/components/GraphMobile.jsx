import React, { useState } from "react";
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
  sportsBoysData,
  sportsGirlsData,
  cultiData,
  techyData,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Sports Boys");

  const gamesBoys = sportsBoysData?.eventNames || [];
  const gamesGirls = sportsGirlsData?.eventNames || [];
  const games = [...new Set([...gamesBoys, ...gamesGirls])];
  const cultiEvents = cultiData?.eventNames || [];
  const techyEvents = techyData?.eventNames || [];

  const [barOptions, setBarOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    animation: { easing: "easeIn" },
    indexAxis: "y",
    plugins: {
      title: {
        display: false,
        text: "Total Points",
        color: "white",
        font: { size: 18, family: "sans-serif" },
      },
      legend: {
        display: false,
        position: "bottom",
        align: "center",
        padding: 10,
        labels: {
          color: "#FFF",
          boxWidth: 15,
          padding: 10,
          borderRadius: 100,
          font: { size: 12, family: "sans-serif" },
        },
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
  });

  const barDataMobile = {
    labels: blocknames,
    datasets: [
      {
        label: "Sports",
        data: blocknames.map((_, blockIndex) =>
          games.reduce(
            (sum, _, gameIndex) =>
              sum +
              (sportsBoysData.scores[gameIndex] &&
              sportsBoysData.scores[gameIndex][blockIndex]
                ? sportsBoysData.scores[gameIndex][blockIndex]
                : 0) +
              (sportsGirlsData.scores[gameIndex] &&
              sportsGirlsData.scores[gameIndex][blockIndex]
                ? sportsGirlsData.scores[gameIndex][blockIndex]
                : 0),
            0
          )
        ),
        backgroundColor: colorOptions[0],
      },
      {
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
      },
      {
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
      },
    ],
  };

  return (
    <div className="FirstTab w-full">
      <div className="canvas-container flex flex-col rounded-2xl bg-[#150338] mx-auto p-4 w-screen justify-center items-center">
        <div className="w-full h-96 relative">
          <Bar options={barOptions} data={barDataMobile} />
        </div>
      </div>
      <div className="tabs-container mt-4">
        <div className="tabs bg-[#150338] text-white gap-4 flex flex-row justify-center">
          <button
            className={`tab-button ${
              selectedCategory === "Sports Boys" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Sports Boys")}
          >
            Sports Boys
          </button>
          <button
            className={`tab-button ${
              selectedCategory === "Sports Girls" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Sports Girls")}
          >
            Sports Girls
          </button>
          <button
            className={`tab-button ${
              selectedCategory === "Culturals" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Culturals")}
          >
            Culturals
          </button>
          <button
            className={`tab-button ${
              selectedCategory === "Sci-Tech" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("Sci-Tech")}
          >
            Sci-Tech
          </button>
        </div>
        <div className="tab-content">
          {selectedCategory === "Sports Boys" && (
            <Table
              blocknames={sportsBoysData.blocks}
              games={gamesBoys}
              points={sportsBoysData.scores}
              tag="Sports Boys"
            />
          )}
          {selectedCategory === "Sports Girls" && (
            <Table
              blocknames={sportsGirlsData.blocks}
              games={gamesGirls}
              points={sportsGirlsData.scores}
              tag="Sports Girls"
            />
          )}
          {selectedCategory === "Culturals" && (
            <Table
              blocknames={blocknames}
              games={cultiEvents}
              points={cultiData.scores}
              tag="Culturals"
            />
          )}
          {selectedCategory === "Sci-Tech" && (
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

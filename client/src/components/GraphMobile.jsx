import React, { useEffect, useState } from "react";
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
import Table from "./Table"; // Import your Table component

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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBarOptions((prevOptions) => ({
          ...prevOptions,
          plugins: {
            ...prevOptions.plugins,
            title: {
              ...prevOptions.plugins.title,
              font: { ...prevOptions.plugins.title.font, size: 14 },
            },
            legend: {
              ...prevOptions.plugins.legend,
              labels: {
                ...prevOptions.plugins.legend.labels,
                font: { size: 10 },
              },
            },
          },
        }));
      } else if (width < 1200) {
        setBarOptions((prevOptions) => ({
          ...prevOptions,
          plugins: {
            ...prevOptions.plugins,
            title: {
              ...prevOptions.plugins.title,
              font: { ...prevOptions.plugins.title.font, size: 16 },
            },
            legend: {
              ...prevOptions.plugins.legend,
              labels: {
                ...prevOptions.plugins.legend.labels,
                font: { size: 11 },
              },
            },
          },
        }));
      } else {
        setBarOptions((prevOptions) => ({
          ...prevOptions,
          plugins: {
            ...prevOptions.plugins,
            title: {
              ...prevOptions.plugins.title,
              font: { ...prevOptions.plugins.title.font, size: 18 },
            },
            legend: {
              ...prevOptions.plugins.legend,
              labels: {
                ...prevOptions.plugins.legend.labels,
                font: { size: 12 },
              },
            },
          },
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <div className="flex flex-row w-4/5 gap-2 justify-between">
          <span className="font-semibold bg-[#FF7900] w-full rounded-lg">
            SPORTS
          </span>
          <span className="font-semibold bg-[#2C88AD] w-full rounded-lg">
            CULTI
          </span>
          <span className="font-semibold bg-[#A9AB4A] w-full rounded-lg">
            TECHY
          </span>
        </div>
        <div className="w-full h-96 relative">
          <Bar options={barOptions} data={barDataMobile} />
        </div>
      </div>
      <Table
        blocknames={sportsBoysData.blocks}
        games={gamesBoys}
        points={sportsBoysData.scores}
        tag="Sports Boys"
      />
      <Table
        blocknames={sportsGirlsData.blocks}
        games={gamesGirls}
        points={sportsGirlsData.scores}
        tag="Sports Girls"
      />
      <Table
        blocknames={blocknames}
        games={cultiEvents}
        points={cultiData.scores}
        tag="Culturals"
      />
      <Table
        blocknames={blocknames}
        games={techyEvents}
        points={techyData.scores}
        tag="Sci-Tech"
      />
    </div>
  );
}

export default GraphMobile;

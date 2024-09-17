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
import { Bar, Doughnut } from "react-chartjs-2";
import "../index.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const colorOptions = [
  "#A9AB4A",
  "#DEB117",
  "#D1CCB6",
  "#DC8F48",
  "#9F3C09",
  "#385175",
  "#2D88AD",
];

function DivBar({ blocknames, games, points, title }) {
  const [barOptions, setBarOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    animation: { easing: "easeIn" },
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        text: title,
        color: "white",
        font: { size: 18, family: "sans-serif" },
      },
      legend: {
        display: false,
        position: "bottom",
        align: "center",
        padding: 10,
        labels: {
          color: "#000",
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
      x: { stacked: true, ticks: { color: "white" } },
      y: { stacked: true, ticks: { color: "white", size: 14 } },
    },
  });

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        color: "white",
        font: { size: 28, family: "sans-serif" },
        padding: { top: 10, bottom: 10 },
      },
      legend: {
        display: false,
        position: "bottom",
        labels: { boxWidth: 15, padding: 10 },
      },
    },
    layout: { padding: 0 },
  };

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
              font: { ...prevOptions.plugins.title.font, size: 18 },
            },
            legend: {
              ...prevOptions.plugins.legend,
              labels: {
                ...prevOptions.plugins.legend.labels,
                font: { size: 16 },
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
              font: { ...prevOptions.plugins.title.font, size: 20 },
            },
            legend: {
              ...prevOptions.plugins.legend,
              labels: {
                ...prevOptions.plugins.legend.labels,
                font: { size: 18 },
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
              font: { ...prevOptions.plugins.title.font, size: 24 },
            },
            legend: {
              ...prevOptions.plugins.legend,
              labels: {
                ...prevOptions.plugins.legend.labels,
                font: { size: 20 },
              },
            },
          },
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, [title]);

  const barData = {
    labels: blocknames,
    datasets: games.map((game, index) => ({
      label: game,
      data: points[index + 1],
      backgroundColor: colorOptions[index % colorOptions.length],
    })),
  };

  const doughnutData = {
    labels: games,
    datasets: [
      {
        data: games.map((_, index) =>
          points[index + 1].reduce((sum, value) => sum + value, 0)
        ),
        backgroundColor: colorOptions.slice(0, games.length),
      },
    ],
  };

  return (
    <div className="FirstTab w-full">
      <div className="canvas-container rounded-2xl bg-[#150338] mx-auto w-full flex justify-center items-center">
        {blocknames.length !== 1 ? (
          <div
            className="relative w-full h-[70vh]"
          >
            <Bar options={barOptions} data={barData} />
          </div>
        ) : (
          <div
            className="relative w-full h-[50vh]"
          >
            <Doughnut options={doughnutOptions} data={doughnutData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default DivBar;

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

function GraphMobile({ blocknames, games, points, title }) {
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
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, [title]);

  const barDataMobile = {
    labels: blocknames,
    datasets: [
      {
        label: "Total Points",
        data: blocknames.map((_, blockIndex) =>
          games.reduce(
            (sum, _, gameIndex) => sum + points[gameIndex + 1][blockIndex],
            0
          )
        ),
        backgroundColor: colorOptions[0],
      },
    ],
  };

  return (
    <div className="FirstTab w-full p-4">
      <div className="canvas-container rounded-2xl bg-[#150338] mx-auto p-4 w-full flex justify-center items-center">
          <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <Bar options={barOptions} data={barDataMobile} />
          </div>
      </div>
    </div>
  );
}

export default GraphMobile;

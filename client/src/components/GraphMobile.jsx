import React from "react";
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
import { SunIcon } from "@heroicons/react/24/outline";

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
  "rgba(255, 121, 0, 1)",
  "rgba(44, 136, 173, 1)",
  "rgba(169, 171, 74, 1)",
];

function GraphMobile({
    blocknames,
  sportsBoysData,
  sportsGirlsData,
  cultiData,
  techyData,
}) {

  const barOptionsMobile = {
    responsive: true,
    indexAxis: "y",
    animation: {
      easing: "easeIn",
    },
    plugins: {
      title: {
        display: true,
        color: "black",
        font: {
          size: 18,
          family: "sans-serif",
        },
      },
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        padding: 10,
        labels: {
          color: "#000",
          boxWidth: 15,
          padding: 10,
          borderRadius: 100,
          font: {
            size: 12,
            family: "sans-serif",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label + " : " + context.parsed.x;
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
        },
      },
      y: {
        ticks: {
          color: "black",
        },
      },
    },
  };

  const barDataMobile = {
  labels: blocknames,
  datasets: [
    {
      label: "Sports Boys Total Points",
      data: sportsBoysData.blocks.map((block, blockIndex) => {
        // Aggregate points for each block across all events
        const total = sportsBoysData.eventNames.reduce((sum, _, gameIndex) => {
          // Ensure index is within bounds
          const pointValue = sportsBoysData.scores[gameIndex]?.[blockIndex] || 0;
          return sum + pointValue;
        }, 0);
        return total;
      }),
      backgroundColor: colorOptions[0],
    },
  ],
};


  return (
    <div>
      <Bar options={barOptionsMobile} data={barDataMobile} />
    </div>
  );
}

export default GraphMobile;

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
  "rgb(112, 0, 53, 0.9)",
  "rgb(57, 0, 53, 0.9)",
  "rgb(164, 0, 53, 0.9)",
  "rgb(206, 0, 53, 0.9)",
  "rgb(109, 211, 206, 0.9)",
  "rgb(175, 122, 197, 0.9)",
  "rgb(255, 107, 107, 0.9)",
];

function DivBar({ blocknames, games, points, title }) {
  const barOptions = {
    animation: {
      easing: "easeIn",
    },
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        text: title,
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
        stacked: true,
        ticks: {
          color: "black",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "black",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        color: "black",
        font: {
          size: 24,
          family: "sans-serif",
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 15,
          padding: 10,
        },
      },
    },
    layout: {
      padding: 0,
    },
  };

  const barOptionsMobile = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title + " (Mobile)",
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
            let label = context.dataset.label + " : " + context.parsed.y;
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

  const barData = {
    labels: blocknames,
    datasets: games.map((game, index) => {
      return {
        label: game,
        data: points[index + 1],
        backgroundColor: colorOptions[index],
      };
    }),
  };

  const barDataMobile = {
    labels: blocknames,
    datasets: [
      {
        label: "Total Points",
        data: blocknames.map((block, blockIndex) => {
          const total = games.reduce((sum, _, gameIndex) => {
            const pointValue = points[gameIndex + 1]?.[blockIndex] || 0;
            return sum + pointValue;
          }, 0);
          console.log(`Total for ${block}: ${total}`);
          return total;
        }),
        backgroundColor: colorOptions[0],
      },
    ],
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
    <div className="FirstTab">
      <div className="canvas-container justify-center items-center flex h-96">
        {blocknames.length !== 1 ? (
          <>
            {/* Desktop Version */}
            <Bar options={barOptions} data={barData} />
            {/* Mobile Version */}
            <Bar options={barOptionsMobile} data={barDataMobile} />
          </>
        ) : (
          <Doughnut options={doughnutOptions} data={doughnutData} />
        )}
      </div>
    </div>
  );
}

export default DivBar;

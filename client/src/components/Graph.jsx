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
  "#A9AB4A",
  "#DEB117",
  "#D1CCB6",
  "#DC8F48",
  "#9F3C09",
  "#385175",
  "#2D88AD"
];

function DivBar({ blocknames, games, points, title,}) {
  const barOptions = {
    responsive: true,
    animation: {
      easing: "easeIn",
    },
    indexAxis: "y",
    plugins: {
      title: {
        display: true,
        text: title,
        color: "white",
        font: {
          size: 18,
          family: "sans-serif",
        },
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
          color: "white",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "white",
          size: 10,
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

  // const barOptionsMobile = {
  //   responsive: true,
  //   indexAxis: "y",
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: title + " (Mobile)",
  //       color: "black",
  //       font: {
  //         size: 18,
  //         family: "sans-serif",
  //       },
  //     },
  //     legend: {
  //       display: true,
  //       position: "bottom",
  //       align: "center",
  //       padding: 10,
  //       labels: {
  //         color: "#000",
  //         boxWidth: 15,
  //         padding: 10,
  //         borderRadius: 100,
  //         font: {
  //           size: 12,
  //           family: "sans-serif",
  //         },
  //       },
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function (context) {
  //           let label = context.dataset.label + " : " + context.parsed.x;
  //           return label;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     x: {
  //       ticks: {
  //         color: "black",
  //       },
  //     },
  //     y: {
  //       ticks: {
  //         color: "black",
  //       },
  //     },
  //   },
  // };

  const barData = {
    labels: blocknames,
    datasets: games.map((game, index) => {
      return {
        label: game,
        data: points[index + 1],
        backgroundColor: colorOptions[index % colorOptions.length], // Cycle through colors
      };
    }),
  };


  // const barDataMobile = {
  //   labels: blocknames,
  //   datasets: [
  //     {
  //       label: "Total Points",
  //       data: blocknames.map((block, blockIndex) => {
  //         // Aggregate points for each block
  //         const total = games.reduce((sum, _, gameIndex) => {
  //           const pointValue = points[gameIndex + 1]?.[blockIndex] || 0;
  //           return sum + pointValue;
  //         }, 0);
  //         return total;
  //       }),
  //       backgroundColor: colorOptions[0],
  //     },
  //   ],
  // };


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
    <div className="FirstTab w-screen">
      <div className="canvas-container rounded-2xl bg-[#150338] mx-auto p-4 w-1/2 justify-center items-center flex">
          {blocknames.length !== 1 ? (
            <>
              <Bar options={barOptions} data={barData} />
            </>
          ) : (
            <Doughnut options={doughnutOptions} data={doughnutData} />
          )}
      </div>
    </div>
  );
}

export default DivBar;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../index.css";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
  "rgb(112, 0, 53, 0.9)",
  "rgb(57, 0, 53, 0.9)",
  "rgb(164, 0, 53, 0.9)",
  "rgb(206, 0, 53, 0.9)",
  "rgb(109, 211, 206, 0.9)",
  "rgb(175, 122, 197, 0.9)",
  "rgb(255, 107, 107, 0.9)",
  "rgb(112, 0, 53, 0.9)",
  "rgb(57, 0, 53, 0.9)",
  "rgb(164, 0, 53, 0.9)",
  "rgb(206, 0, 53, 0.9)",
  "rgb(109, 211, 206, 0.9)",
  "rgb(175, 122, 197, 0.9)",
  "rgb(255, 107, 107, 0.9)",
];


function DivBar({blocknames, games, points , title}) {
  const options = {
    options: {
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
            size: 24,
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
              size: 16,
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
    },
  };
  const data = {
    labels: blocknames,
    datasets: games.map((block, index) => {
      return {
        label: block,
        data: points[index + 1],
        backgroundColor: colorOptions[index],
      };
    }),
  };
  return (
    <div className="FirstTab">
      <div className="canvas-container">
        <Bar options={options.options} data={data} />
      </div>
    </div>
  );
}

export default DivBar;

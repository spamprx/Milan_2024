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
import "../index.css";
import { Bar, Doughnut } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

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

function ShowSelect({ param, onSelect }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedOptions.length === param.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([...param]);
    }
  };

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  return (
    <div className="block-select text-start pl-4">
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedOptions.length === param.length}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>
      <ul>
        {param.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Filter({ blocks, games, filteredBlocks, filteredGames }) {
  const [showBlocks, setShowBlocks] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [selectedBlocks, setSelectedBlocks] = useState([...blocks]);
  const [selectedGames, setSelectedGames] = useState([...games]);

  const handleSave = () => {
    filteredBlocks(selectedBlocks);
    filteredGames(selectedGames);
    setShowBlocks(false);
    setShowGames(false);
  };

  return (
    <div className="text-white w-64 bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-lg text-md py-2.5 text-start px-10">
      Available Options -
      <button className="pl-2" onClick={() => setShowBlocks(!showBlocks)}>
        Select Blocks :
      </button>
      {showBlocks && <ShowSelect param={blocks} onSelect={setSelectedBlocks} />}
      <button className="pl-2" onClick={() => setShowGames(!showGames)}>
        Select Sports :
      </button>
      {showGames && <ShowSelect param={games} onSelect={setSelectedGames} />}
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

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

  const pieOptions = {
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

  const pieData = {
    labels: games,
    datasets: [
      {
        data: games.map((game, index) =>
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
          <Bar options={barOptions} data={barData} />
        ) : (
          <Doughnut options={pieOptions} data={pieData} />
        )}
      </div>
    </div>
  );
}

export default DivBar;

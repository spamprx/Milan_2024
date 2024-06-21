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
import React , {useState} from "react";

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

function ShowSelect({ param, onSave, setVisible}) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prevSelected => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter(item => item !== option);
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

  const handleSave = () => {
    onSave(selectedOptions);
    setVisible(false);
  };

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
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}


export function Filter ({blocks , games , filteredBlocks , filteredGames}) {
  const [showBlocks,setShowBlocks] = useState(false)
  const [showGames,setShowGames] = useState(false)
  return (
    <div className="text-white w-64 bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-lg text-md py-2.5 text-start px-10">
      Available Options -
      <button className="pl-2" onClick={() => setShowBlocks(!showBlocks)}>
        Select Blocks :
      </button>
      {showBlocks && <ShowSelect param={blocks} onSave={filteredBlocks} setVisible={setShowBlocks}/>}
      <button className="pl-2" onClick={() => setShowGames(!showGames)}>
        Select Sports :
      </button>
      {showGames && <ShowSelect param={games} onSave={filteredGames} setVisible={setShowGames}/>}
      <br />
    </div>
  );
}

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

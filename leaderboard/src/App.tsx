import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const options = {
    options: {
      indexAxis: "y",
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        }
      },
    },
  };
  const data = {
    labels: ["A", "B"],
    datasets: [
      {
        label: "Points",
        data: [30, 20],
        backgroundColor: ["#f44336"],
      },
      {
        label: "Points",
        data: [40, 10],
        backgroundColor: ["#2196f3"],
      },
    ]
  };

  return (
    <div className="FirstTab">
        <div className="canvas-container">
          <Bar options={options.options} data={data} />
        </div>
    </div>
  );
}

export default App;

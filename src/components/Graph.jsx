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
import React from "react";

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

    const doughnutData = {
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
            <Doughnut options={doughnutOptions} data={doughnutData} />
            )}
        </div>
        </div>
    );
}

export default DivBar;

import { Bar, Doughnut } from "react-chartjs-2";

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

function TableMobile ({blocknames, games, points, title }) {
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
        <div className="bg-[#150338] relative w-screen h-[75svh] mx-12 my-16 rounded-2xl">
            <div className={`flex flex-col w-full h-full bg-[url('/src/assets/Dropdown.png')] py-4`}>
                <div className="flex-row mx-auto">
                    <span className="bg-[#B33312] px-1 py-1 rounded-lg text-white font-semibold">SPORTS</span>
                    <span className="bg-[#2C88AD] px-1 py-1 mx-2 rounded-lg text-white font-semibold">CULTURALS</span>
                    <span className="bg-[#A9AB4A] px-1 py-1 rounded-lg text-white font-semibold">SCI-TECH</span>
                </div>
                {blocknames.length !== 1 ? (
                <Bar options={barOptions} data={barData} />
                ) : (
                <Doughnut options={doughnutOptions} data={doughnutData} />
                )}
            </div>
        </div>
    )
}

export default TableMobile
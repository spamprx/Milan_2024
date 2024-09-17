import React, { useState, useEffect } from "react";
import ChartRace from "react-chart-race";

const BlockRace = () => {
  const dayData = [
    [
      { id: 0, title: "Raman", value: 50, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 45, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 42, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 40, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 38, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 48, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 22, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 54, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 63, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 31, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 55, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 50, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 37, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 63, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 46, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 58, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 63, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 51, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 50, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 59, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 60, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 56, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 55, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 53, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 52, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 63, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 60, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 59, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 56, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 54, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 66, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 63, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 62, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 59, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 58, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 69, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 67, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 65, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 62, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 60, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 72, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 70, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 68, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 65, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 63, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 75, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 73, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 71, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 68, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 66, color: "#4682B4" },
    ],
    [
      { id: 0, title: "Raman", value: 80, color: "#A0522D" },
      { id: 1, title: "Bhabha", value: 76, color: "#FF0000" },
      { id: 2, title: "Charaka", value: 74, color: "#008000" },
      { id: 3, title: "Aryabhatta", value: 71, color: "#4B0082" },
      { id: 4, title: "Ramanujan", value: 69, color: "#4682B4" },
    ],
  ];

  const [data, setData] = useState(dayData[0]);
  const [day, setDay] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDay((prevDay) => {
        const nextDay = prevDay + 1;
        if (nextDay <= 11) {
          setData(dayData[nextDay - 1]);
        } else {
          setData(dayData[0]);
          return 1;
        }
        return nextDay;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-transparent">
      <h1 className="text-2xl font-bold mb-4 text-[#ffffff]">
        Block Race - Day {day}
      </h1>
      <div className="w-full max-w-4xl">
        <ChartRace
          data={data}
          width={800}
          height={600}
          itemHeight={40}
          gap={8}
          titleStyle={{ fontSize: 16, color: "#000000" }}
        />
      </div>
    </div>
  );
};

export default BlockRace;

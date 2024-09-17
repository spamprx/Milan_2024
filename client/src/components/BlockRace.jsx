import React, { useState, useEffect } from "react";
import ChartRace from "react-chart-race";

const BlockRace = () => {
  const isMobile1 = window.innerWidth < 400;
  const isMobile2 = window.innerWidth < 500;
  const isMedium = window.innerWidth < 700;
  const isTablet = window.innerWidth < 850;
  const dayData = [
    [
      { id: 0, title: "ANANDI", value: 50, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 45, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 42, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 40, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 38, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 38, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 38, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 38, color: "#385175" },
      { id: 8, title: "KAPILA", value: 38, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 38, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 38, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 38, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 38, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 38, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 38, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 38, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 38, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 38, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 38, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 48, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 22, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 54, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 63, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 31, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 31, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 31, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 31, color: "#385175" },
      { id: 8, title: "KAPILA", value: 31, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 31, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 31, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 31, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 31, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 31, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 31, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 31, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 31, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 31, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 31, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 55, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 50, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 37, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 63, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 46, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 46, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 46, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 46, color: "#385175" },
      { id: 8, title: "KAPILA", value: 46, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 46, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 46, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 46, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 46, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 46, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 46, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 46, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 46, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 46, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 46, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 58, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 63, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 51, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 50, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 59, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 59, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 59, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 59, color: "#385175" },
      { id: 8, title: "KAPILA", value: 59, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 59, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 59, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 59, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 59, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 59, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 59, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 59, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 59, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 59, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 59, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 60, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 56, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 55, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 53, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 52, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 52, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 52, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 52, color: "#385175" },
      { id: 8, title: "KAPILA", value: 52, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 52, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 52, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 52, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 52, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 52, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 52, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 52, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 52, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 52, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 52, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 63, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 60, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 59, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 56, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 54, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 54, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 54, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 54, color: "#385175" },
      { id: 8, title: "KAPILA", value: 54, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 54, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 54, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 54, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 54, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 54, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 54, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 54, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 54, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 54, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 54, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 66, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 63, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 62, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 59, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 58, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 58, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 58, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 58, color: "#385175" },
      { id: 8, title: "KAPILA", value: 58, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 58, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 58, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 58, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 58, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 58, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 58, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 58, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 58, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 58, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 58, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 69, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 67, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 65, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 62, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 60, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 60, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 60, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 60, color: "#385175" },
      { id: 8, title: "KAPILA", value: 60, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 60, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 60, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 60, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 60, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 60, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 60, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 60, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 60, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 60, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 60, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 72, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 70, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 68, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 65, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 63, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 63, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 63, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 63, color: "#385175" },
      { id: 8, title: "KAPILA", value: 63, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 63, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 63, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 63, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 63, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 63, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 63, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 63, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 63, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 63, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 63, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 75, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 73, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 71, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 68, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 66, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 66, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 66, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 66, color: "#385175" },
      { id: 8, title: "KAPILA", value: 66, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 66, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 66, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 66, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 66, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 66, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 66, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 66, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 66, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 66, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 66, color: "#B147E3" },
    ],
    [
      { id: 0, title: "ANANDI", value: 80, color: "#88583B" },
      { id: 1, title: "ARYABHATTA", value: 76, color: "#643FAB" },
      { id: 2, title: "BHABHA", value: 74, color: "#A9AB4A" },
      { id: 3, title: "BHASKARA", value: 71, color: "#DC8F48" },
      { id: 4, title: "BR/VY", value: 69, color: "#DEB117" },
      { id: 5, title: "CH/KAU", value: 69, color: "#9F3C09" },
      { id: 6, title: "GARGI", value: 69, color: "#D1CCB6" },
      { id: 7, title: "KALAM", value: 69, color: "#385175" },
      { id: 8, title: "KAPILA", value: 69, color: "#2D88AD" },
      { id: 9, title: "MAITREYI", value: 69, color: "#88583B" },
      { id: 10, title: "RAMAN", value: 69, color: "#643FAB" },
      { id: 11, title: "RAMANUJA", value: 69, color: "#A9AB4A" },
      { id: 12, title: "RAMANUJAN", value: 69, color: "#DC8F48" },
      { id: 13, title: "SARABHAI", value: 69, color: "#DEB117" },
      { id: 14, title: "SAROJINI NAIDU", value: 69, color: "#9F3C09" },
      { id: 15, title: "SN BOSE", value: 69, color: "#D1CCB6" },
      { id: 16, title: "SUS/VAR", value: 69, color: "#385175" },
      { id: 17, title: "VISVESWARAYA", value: 69, color: "#2D88AD" },
      { id: 18, title: "VIVEKANANDA", value: 69, color: "#B147E3" },
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

  const chartHeight = data.length * 50;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-full bg-transparent">
      <h1 className="text-2xl font-bold m-4 text-[#ffffff]">Day {day}</h1>
      <div className="w-full h-full max-w-screen max-h-full">
        <ChartRace
          data={data}
          width={
            isMobile1
              ? 310
              : isMobile2
              ? 390
              : isMedium
              ? 490
              : isTablet
              ? 690
              : 840
          }
          height={chartHeight}
          itemHeight={isTablet ? 30 : 40}
          gap={12}
          titleStyle={{ fontSize: 16, color: "#ffffff" }}
          valueStyle={{ fontSize: 11, color: "#faf5f5" }}
          backgroundColor="transparent"
          opacity={31}
        />
      </div>
    </div>
  );
};

export default BlockRace;

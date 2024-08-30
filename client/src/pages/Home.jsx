import { useState } from "react";
import Header from "../components/Header";
import Image from "../assets/Arrow.png";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const sportOptions = [
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
    { value: "badminton", label: "Badminton" },
    { value: "cricket", label: "Cricket" },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className=""></div>

      <div className="relative w-full">
        <div className="absolute inset-0 bg-[#DEB11647] opacity-30 blur-sm"></div>
        <div className="relative flex flex-row">
          <img src={Image} alt="Arrow" className="w-1/2" />
          <img src={Image} alt="Arrow" className="w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default Home;

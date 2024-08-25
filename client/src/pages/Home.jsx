import { useState } from "react";
import Header from "../components/Header";

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
  <div className="bg-gradient-to-b from-[#171717] to-[#696969] h-screen">
    <Header />
  </div>
  )
}

export default Home;

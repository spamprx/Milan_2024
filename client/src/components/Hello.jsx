import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid"; // You'll need heroicons

function Dropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-purple-800 to-purple-900 rounded-lg shadow-lg">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer py-4 px-6 flex justify-between items-center text-white"
      >
        <span className="uppercase">{label}</span>
        <ChevronDownIcon className="h-6 w-6 text-gray-300" />
      </div>
      <div className={`transition-all ${isOpen ? "block" : "hidden"}`}>
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleOptionClick(option)}
            className={`py-3 px-6 flex items-center cursor-pointer ${
              selectedOption === option
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-purple-700"
            }`}
          >
            <input
              type="radio"
              name={label}
              className="mr-2"
              checked={selectedOption === option}
              readOnly
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 space-x-4">
      <Dropdown
        label="Select Block"
        options={["Visveswaraya", "Raman", "Sarabhai", "Bhabha", "Brahmagupta"]}
      />
      <Dropdown
        label="Select Category"
        options={[
          "Basketball",
          "Badminton",
          "Football",
          "Volleyball",
          "Table Tennis",
        ]}
      />
    </div>
  );
}

export default App;

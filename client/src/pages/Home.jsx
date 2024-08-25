import { useState } from "react";
import HomeBg from "../assets/Home.png";
import Logo from "../assets/Milan-logo.png";
import MilanFont from "../assets/Milan-font1.png";
import MilanHome from "../assets/MilanHome2.png";
import Home2 from "../assets/Home2.png";
import SportCard from "../components/SportCard";
import Select from "react-select";

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
    // <h1>Welcome Home</h1>
    <div
      className="w-full h-full min-h-screen bg-cover bg-center m-0 p-0"
      style={{ backgroundImage: `url(${HomeBg})` }}
    >
      <div className="relative flex flex-col justify-center items-center pt-10">
        <img src={MilanHome} className="w-full h-auto object-contain z-10" />
        <img
          src={MilanFont}
          className="absolute top-[10%] left-1/2 transform -translate-x-1/2 z-20 w-[80%] max-w-[1000px] h-auto"
        />
        <div className="absolute top-[60%] w-full z-20 text-center">
          <p className="font-vietnam-regular font-bold text-white mx-auto">
            MILAN stands as one of the largest and most eagerly awaited
            inter-hostel competitions in India.
            <br />
            It is a thrilling showcase of talent and spirit, uniting students in
            a vibrant and dynamic celebration.
          </p>
          <p className="font-vietnam-regular font-extralight text-white mx-auto mt-20">
            With each passing year, participation in this General Championship
            has been on the rise,
            <br /> contributing to an atmosphere of heightened enthusiasm and
            camaraderie. <br />
            Drawing over 6,000+ attendees
          </p>
          <img src={Home2} className="w-full h-auto object-contain z-10" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="font-vietnam-thin font-thin mt-32 p-10">
          <label className="block text-white mb-2 text-left" htmlFor="event">
            SPORTS YOU LIKE:
          </label>
          <Select
            id="event"
            options={sportOptions}
            value={selectedOption}
            onChange={handleOptionClick}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                color: "#ffffff",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#ffffff",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#000000",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? "#333333" : "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }),
            }}
          />
        </div>
        <div className="flex flex-col justify-end items-end p-10 mt-32">
          <p className="text-[#f0f0f0d9] font-vietnam-thin font-thin">
            There will be
          </p>
          <p className="text-white">5 Incoming Events</p>
        </div>
      </div>
      <SportCard />
    </div>
  );
}

export default Home;

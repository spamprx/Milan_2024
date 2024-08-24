import { useState } from "react";
import HomeBg from "../assets/Home.png";
import Logo from "../assets/Milan-logo.png";
import MilanFont from "../assets/Milan-font1.png";
import MilanHome from "../assets/MilanHome2.png";
import Home2 from "../assets/Home2.png";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
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
          <p className="font-bold text-white mx-auto [font-family:'Be_Vietnam_Pro-Regular',Helvetica]">
            MILAN stands as one of the largest and most eagerly awaited
            inter-hostel competitions in India.
            <br />
            It is a thrilling showcase of talent and spirit, uniting students in
            a vibrant and dynamic celebration.
          </p>
          <p className="font-extralight text-white mx-auto mt-20 [font-family:'Be_Vietnam_Pro-ExtraLight',Helvetica]">
            With each passing year, participation in this General Championship
            has been on the rise,
            <br /> contributing to an atmosphere of heightened enthusiasm and
            camaraderie. <br />
            Drawing over 6,000+ attendees
          </p>
          <img src={Home2} className="w-full h-auto object-contain z-10" />
        </div>
      </div>
      <div className="flex flex-col justify-start items-start [font-family:'Be_Vietnam_Pro-Thin',Helvetica] font-thin mt-32 p-10">
        {/* <p className="text-white">SPORTS YOU LIKE:</p>
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
            {selectedOption ? selectedOption : "Select an option"}
          </button>
          {isOpen && (
            <div className="dropdown-content flex flex-col bg-white">
              <a
                href="#"
                onClick={() => {
                  setSelectedOption("Option 1");
                  setIsOpen(false);
                }}
              >
                Option 1
              </a>
              <a
                href="#"
                onClick={() => {
                  setSelectedOption("Option 2");
                  setIsOpen(false);
                }}
              >
                Option 2
              </a>
              <a
                href="#"
                onClick={() => {
                  setSelectedOption("Option 3");
                  setIsOpen(false);
                }}
              >
                Option 3
              </a>
            </div>
          )}
        </div> */}
        <select name="dropdown_name">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    </div>
  );
}

export default Home;

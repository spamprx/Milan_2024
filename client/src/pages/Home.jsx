import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
// <<<<<<< HEAD
import SportCard from "../components/SportCard";
import HomeSponsorCard from "../components/HomeSponsorCard";
import HomeBg from "../assets/Home.png";
import Home2 from "../assets/Home2.png";
import MilanFont from "../assets/Milan-font1.png";
import MilanHome from "../assets/MilanHome2.png";
import Skateboard from "../assets/Skateboard.png";
import Basketball from "../assets/Basketball.png";
import Theme from "../assets/Theme.png";
import Mascot from "../assets/Mascot.jpeg";
import Pattern from "../assets/Pattern.png";
import Sponsor from "../assets/Sponsor.png";
import Pattern2 from "../assets/Pattern2.png";
import HomeArrow from "../assets/HomeArrow.png";
import HomeArrow2 from "../assets/Double_Arrow.png";
import Select from "react-select";
// =======
// import Image from "../assets/Arrow.png";
// >>>>>>> 6ec991de3baeda8f514fa1f25b5ec8ac4d55cf07

function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardContainerRef = useRef(null);

  const sportOptions = [
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
    { value: "badminton", label: "Badminton" },
    { value: "cricket", label: "Cricket" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScroll = () => {
    if (cardContainerRef.current) {
      const containerWidth = cardContainerRef.current.clientWidth;
      const cardWidth = containerWidth / 3;
      const newIndex = Math.round(
        cardContainerRef.current.scrollLeft / cardWidth
      );
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    if (cardContainer) {
      cardContainer.addEventListener("scroll", handleScroll);
      return () => cardContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToCard = (index) => {
    if (cardContainerRef.current) {
      const cardWidth = cardContainerRef.current.clientWidth / 3;
      cardContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "auto", // Instant shifting
      });
      setActiveIndex(index);
    }
  };

  const handleCircleClick = (direction) => {
    if (cardContainerRef.current) {
      const cardWidth = cardContainerRef.current.clientWidth / 3;
      const newIndex =
        direction === "left"
          ? Math.max(activeIndex - 1, 0)
          : Math.min(activeIndex + 1, 4);
      scrollToCard(newIndex);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    console.log(option);
    // setIsOpen(!isOpen);
  };

  return (
    // <<<<<<< HEAD
    <div className="relative bg-transparent min-h-screen w-screen flex flex-col">
      <div
        className="relative w-screen h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="w-screen h-full">
          <div className="w-screen h-screen relative flex lg:flex-col justify-center items-center pt-10">
            <img
              src={MilanHome}
              alt="Milan Home"
              className="w-screen h-auto object-contain z-10"
            />
            <img
              src={MilanFont}
              alt="Milan Font"
              className="absolute top-[10%] transform  z-20 w-3/4 max-w-[1000px] h-auto"
            />
            <div className="absolute top-[60%] w-screen z-20 text-center">
              <p className="font-vietnam-regular font-bold text-white mx-auto">
                MILAN stands as one of the largest and most eagerly awaited
                inter-hostel competitions in India.
                <br />
                It is a thrilling showcase of talent and spirit, uniting
                students in a vibrant and dynamic celebration.
              </p>
              <p className="font-vietnam-regular font-extralight text-white mx-auto mt-20">
                With each passing year, participation in this General
                Championship has been on the rise,
                <br /> contributing to an atmosphere of heightened enthusiasm
                and camaraderie. <br />
                Drawing over 6,000+ attendees
              </p>
              {/* <img
                src={Home2}
                alt="Home2"
                className="w-full h-1/2 object-contain z-10 mt-10"
              /> */}
            </div>
          </div>
          <div>
            <div className="relative flex w-screen h-1/2 flex-row justify-between items-center mt-10 p-10 z-30 bg-transparent">
              <div className="flex flex-col">
                <label
                  className="block text-white mb-2 text-left"
                  htmlFor="event"
                >
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
              <div className="w-1/2 flex flex-col justify-end items-end">
                <p className="text-[#f0f0f0d9] font-vietnam-thin font-thin">
                  There will be
                </p>
                <p className="text-white text-xl font-bold">
                  5 Incoming Events
                </p>
              </div>
            </div>
            <div
              ref={cardContainerRef}
              className="relative w-full flex overflow-x-scroll scroll-snap-x p-10 space-x-5 bg-transparent"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none", // Hide scrollbar for Firefox
                msOverflowStyle: "none", // Hide scrollbar for Internet Explorer and Edge
                overflow: "auto", // Ensure scroll functionality is enabled
              }}
            >
              {[0, 1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 h-1/2 lg:h-auto mx-20 transition-transform duration-300 ease-in-out ${
                    index === activeIndex ? "scale-105 z-10" : "opacity-50"
                  }`}
                  style={{ scrollSnapAlign: "center" }}
                >
                  <SportCard />
                </div>
              ))}
            </div>
            <div className="flex justify-center ">
              <div className="flex space-x-2">
                {/* <div
                  className="w-3 h-3 rounded-full bg-[#A020F0] cursor-pointer"
                  onClick={() => handleCircleClick("left")}
                ></div> */}
                {[0, 1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-11 lg:h-11 rounded-full cursor-pointer bg-[#A020F0] mb-10 ${
                      index === activeIndex
                        ? "border border-[#DAA827] border-2"
                        : ""
                    }`}
                    onClick={() => {
                      if (index < activeIndex) {
                        handleCircleClick("left");
                      } else if (index > activeIndex) {
                        handleCircleClick("right");
                      } else {
                        scrollToCard(index); // If clicking on the active index, just scroll to the card
                      }
                    }}
                  >
                    {index === activeIndex && (
                      <img src={Basketball} className="w-full h-full p-1" />
                    )}
                  </div>
                ))}
                {/* <div
                  className="w-3 h-3 rounded-full bg-[#A020F0] cursor-pointer"
                  onClick={() => handleCircleClick("right")}
                ></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen mb-10">
        <div className="w-screen min-h-screen lg:h-screen">
          <div className="relative flex items-center justify-center h-1/5 w-full p-10 my-10">
            <div className="absolute flex w-full h-3/4 items-center justify-center">
              <img
                src={HomeArrow}
                // style={{ transform: "rotate(-2.71deg)" }}
                className="w-screen h-full opacity-85 object-cover"
              />
            </div>
            <img
              src={Skateboard}
              // style={{ transform: "rotate(-47.36deg)" }}
              className="absolute w-3/4 sm:w-1/2 lg:w-1/3 h-auto z-10 opacity-90"
            />
            <p className="relative z-20 text-white text-center text-sm sm:text-xl lg:text-2xl font-semibold">
              OUR THEME
            </p>
          </div>
          <div className="w-screen h-4/5 flex flex-wrap justify-center lg:justify-between items-center p-2">
            <div className="w-3/4 sm:w-2/3 lg:w-1/2 h-3/4 p-2 rounded-xl">
              <img
                src={Theme}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="relative w-3/4 sm:w-2/3 lg:w-1/2 h-3/4 p-2 flex items-center justify-center">
              <div className="relative w-full lg:w-2/3 h-full rounded-lg flex items-center justify-center z-10 bg-transparent">
                <img
                  src={Pattern2}
                  className="w-full h-full object-cover opacity-15 z-20"
                />
              </div>
              <div className="absolute w-full lg:w-2/3 h-full bg-[#8F33BA] rounded-2xl flex items-center text-[#D1CCB6] text-center">
                <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-xl leading-relaxed p-1 lg:p-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur nobis, autem, aliquid repellendus totam veritatis
                  quis quae facilis itaque eos maxime perspiciatis accusamus
                  dolores, culpa ab modi! Ratione, commodi optio!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-screen min-h-screen lg:h-screen">
          <div className="relative flex items-center justify-center h-1/5 w-full p-10">
            <div className="absolute flex w-full h-3/4 items-center justify-center">
              <img
                src={HomeArrow}
                // style={{ transform: "rotate(-2.71deg)" }}
                className="w-full h-full opacity-85 object-cover"
              />
            </div>
            <img
              src={Skateboard}
              // style={{ transform: "rotate(-47.36deg)" }}
              className="absolute w-3/4 sm:w-1/2 lg:w-1/3 h-auto z-10 opacity-90"
            />
            <p className="relative z-20 text-white text-center text-sm sm:text-xl lg:text-2xl font-semibold">
              OUR MASCOT
            </p>
          </div>
          <div className="w-screen h-4/5 flex flex-wrap justify-center lg:justify-between items-center p-2">
            <div className="relative w-3/4 sm:w-2/3 lg:w-1/2 h-3/4 p-2 flex items-center justify-center">
              <div className="relative w-full lg:w-2/3 h-full rounded-lg flex items-center justify-center z-10 bg-transparent">
                <img
                  src={Pattern2}
                  className="w-full h-full object-cover opacity-15 z-20"
                />
              </div>
              <div className="absolute w-full lg:w-2/3 h-full bg-[#8F33BA] rounded-2xl flex items-center text-[#D1CCB6] text-center">
                <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-xl leading-relaxed p-1 lg:p-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur nobis, autem, aliquid repellendus totam veritatis
                  quis quae facilis itaque eos maxime perspiciatis accusamus
                  dolores, culpa ab modi! Ratione, commodi optio!
                </p>
              </div>
            </div>
            <div className="w-3/4 sm:w-2/3 lg:w-1/2 h-3/4 p-2 rounded-xl">
              <img
                src={Mascot}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="w-screen min-h-screen lg:h-screen">
          <div className="relative flex items-center justify-center h-1/5 w-full p-10">
            <div className="absolute flex w-full h-3/4 items-center justify-center">
              <img
                src={HomeArrow}
                // style={{ transform: "rotate(-2.71deg)" }}
                className="w-full h-full opacity-85 object-cover"
              />
            </div>
            {/* <img
                    src={Skateboard}
                    style={{ transform: "rotate(-47.36deg)" }}
                    className="absolute w-1/2 h-auto z-10 opacity-50"
                  /> */}
            <p className="relative z-20 text-white text-center text-sm sm:text-xl lg:text-2xl font-semibold">
              OVERALL LEADERBOARD
            </p>
          </div>
          <div className="flex flex-row justify-between items-start w-full h-1/5 mt-1 p-10">
            <div className="flex items-center justify-center bg-[#D1CCB6] font-vietnam-regular rounded-2xl w-1/2 h-full m-3">
              <button className="h-1/2 md:text-xl lg:text-2xl">
                Leaderboard
              </button>
            </div>
            <div className="flex items-center justify-center bg-[#D1CCB6] font-vietnam-regular rounded-2xl w-1/2 h-full m-3">
              <button className="h-1/2 md:text-xl lg:text-2xl">
                Block Race
              </button>
            </div>
          </div>
        </div>

        <div
          className="w-screen h-screen"
          style={{ backgroundImage: `url(${HomeArrow2})` }}
        >
          <div className="flex justify-start">
            <div className="relative flex items-center h-1/5 w-1/2 p-5">
              {/* <img
                src={Skateboard}
                // style={{ transform: "rotate(-47.36deg)" }}
                className="absolute w-full lg:w-3/4 h-auto opacity-90"
              />
              <p className="relative z-10 text-white text-center text-lg sm:text-2xl ml-10 lg:text-3xl font-semibold lg:pl-20">
                SPONSORS
              </p> */}
              <img src={Sponsor} alt="Sponsor" className="sm:w-1/2 lg:w-1/3" />
            </div>
          </div>
          <div className="flex justify-center w-screen h-1/2">
            <HomeSponsorCard />
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* =======
    <div className="flex flex-col">
      <div className=""></div>

      <div className="relative w-full">
        <div className="absolute inset-0 bg-[#DEB11647] opacity-30 blur-sm"></div>
        <div className="relative flex flex-row">
          <img src={Image} alt="Arrow" className="w-1/2" />
          <img src={Image} alt="Arrow" className="w-1/2" />
>>>>>>> 6ec991de3baeda8f514fa1f25b5ec8ac4d55cf07 */}
    </div>
  );
}

export default Home;

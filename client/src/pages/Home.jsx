import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import SportCard from "../components/SportCard";
import HomeSponsorCard from "../components/HomeSponsorCard";
import HomeBg from "../assets/Home.png";
import MilanFont from "../assets/Milan-font1.png";
import MilanHome from "../assets/MilanHome2.png";
import Skateboard from "../assets/Skateboard.png";
import Basketball from "../assets/Basketball.png";
import Theme from "../assets/Theme.png";
import Mascot from "../assets/Mascot.jpeg";
import Stripes from "../assets/Stripes.png"
import Pattern from "../assets/Pattern.png";
import Sponsor from "../assets/Sponsor.png";
import Pattern2 from "../assets/Pattern2.png";
import HomeArrow from "../assets/HomeArrow.png";
import HomeArrow2 from "../assets/Double_Arrow.png";
import Select from "react-select";

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

  const sportEvents = {
    basketball: [
      { id: 1, hostel1: "Hostel A", hostel2: "Hostel B" },
      { id: 2, hostel1: "Hostel A", hostel2: "Hostel B" },
      { id: 3, hostel1: "Hostel A", hostel2: "Hostel B" },
      { id: 4, hostel1: "Hostel A", hostel2: "Hostel B" },
      { id: 5, hostel1: "Hostel A", hostel2: "Hostel B" },
      { id: 6, hostel1: "Hostel A", hostel2: "Hostel B" },
    ],
    football: [
      { id: 1, hostel1: "Hostel C", hostel2: "Hostel D" },
      { id: 2, hostel1: "Hostel C", hostel2: "Hostel D" },
      { id: 3, hostel1: "Hostel C", hostel2: "Hostel D" },
      { id: 4, hostel1: "Hostel C", hostel2: "Hostel D" },
      { id: 5, hostel1: "Hostel C", hostel2: "Hostel D" },
    ],
    badminton: [
      { id: 2, hostel1: "Hostel E", hostel2: "Hostel F" },
      { id: 1, hostel1: "Hostel E", hostel2: "Hostel F" },
      { id: 3, hostel1: "Hostel E", hostel2: "Hostel F" },
      { id: 4, hostel1: "Hostel E", hostel2: "Hostel F" },
      { id: 5, hostel1: "Hostel E", hostel2: "Hostel F" },
      { id: 6, hostel1: "Hostel E", hostel2: "Hostel F" },
      { id: 7, hostel1: "Hostel E", hostel2: "Hostel F" },
      { id: 8, hostel1: "Hostel E", hostel2: "Hostel F" },
    ],
    cricket: [
      { id: 2, hostel1: "Hostel G", hostel2: "Hostel H" },
      { id: 1, hostel1: "Hostel G", hostel2: "Hostel H" },
      { id: 3, hostel1: "Hostel G", hostel2: "Hostel H" },
      { id: 4, hostel1: "Hostel G", hostel2: "Hostel H" },
      { id: 5, hostel1: "Hostel G", hostel2: "Hostel H" },
      { id: 6, hostel1: "Hostel G", hostel2: "Hostel H" },
      { id: 7, hostel1: "Hostel G", hostel2: "Hostel H" },
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
      if (cardContainerRef.current) {
        const containerWidth = cardContainerRef.current.clientWidth;
        const cardWidth =
          containerWidth < 640 ? containerWidth : containerWidth / 3;
        cardContainerRef.current.scrollLeft = cardWidth * activeIndex;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  const handleScroll = () => {
    if (cardContainerRef.current) {
      const containerWidth = cardContainerRef.current.clientWidth;
      const cardWidth =
        containerWidth < 640 ? containerWidth : containerWidth / 3;
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
      const containerWidth = cardContainerRef.current.clientWidth;
      const cardWidth =
        containerWidth < 640 ? containerWidth : containerWidth / 3;
      cardContainerRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setActiveIndex(0);
  };

  const currentEvents =
    selectedOption && sportEvents[selectedOption.value]
      ? sportEvents[selectedOption.value]
      : [];

  return (
    <div className="relative bg-transparent min-h-screen w-screen flex flex-col">
      <div
        className="relative w-screen h-full bg-cover bg-center pb-10"
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
            </div>
          </div>
          <div>
            <div className="relative flex w-screen h-1/2 flex-row justify-between items-center my-20 lg:my-10 p-10 z-30 bg-transparent">
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
                  {currentEvents.length} Incoming Events
                </p>
              </div>
            </div>
            <div
              ref={cardContainerRef}
              className="relative w-full flex overflow-x-scroll scroll-snap-x p-4 space-x-4 bg-transparent"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                // WebkitOverflowScrolling: "touch",
                overflow: "auto",
              }}
            >
              {currentEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 transition-transform duration-300 ease-in-out ${
                    index === activeIndex
                      ? "scale-105 z-10"
                      : "scale-95 opacity-50"
                  }`}
                  style={{ scrollSnapAlign: "center" }}
                >
                  <SportCard event={event} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {currentEvents.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full cursor-pointer bg-[#A020F0] ${
                      index === activeIndex ? "border-2 border-[#DAA827]" : ""
                    }`}
                    onClick={() => scrollToCard(index)}
                  >
                    {index === activeIndex && (
                      <img
                        src={Basketball}
                        className="w-full h-full p-1"
                        alt="Basketball"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`relative bg-gradient-to-b from-[#0E0E0E] to-[#160631] h-[20vh]`}
      ></div>
      <div className="bg-[#160631]">
        <div className="w-screen relative mb-10">
          <img
            src={Stripes}
            alt="Stripes background"
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h2 className="text-[#D1CCB6] text-lg md:text-3xl lg:text-4xl font-semibold text-center">
              MORE ABOUT OTHER EVENTS
            </h2>
          </div>
        </div>

        <div className="w-screen relative flex flex-row gap-4 py-2 bg-[#160631] border-y-2 border-[#D1CCB6]">
          <div className="bg-[#D1CCB6] flex-grow rounded-r-xl"></div>
          <div className="bg-[#D1CCB6] w-1/4 rounded-xl"></div>
          <div className="bg-[#D1CCB6] text-lg md:text-3xl lg:text-4xl p-2 px-8 rounded-xl text-[#160631] font-bold">
            THE AFTERMOVIE
          </div>
          <div className="bg-[#D1CCB6] w-1/4 rounded-xl"></div>
          <div className="bg-[#D1CCB6] flex-grow rounded-l-xl"></div>
        </div>
      </div>

      <div className="flex flex-row p-2">
        <div className="relative w-3/4 sm:w-2/3 lg:w-1/2 p-2 flex items-center justify-center mt-6">
          <div className="absolute w-full lg:w-2/3 bg-[#270B5D] rounded-2xl flex items-center text-[#D1CCB6] text-center p-1 lg:p-3 overflow-auto">
            <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, ne ferri iudico mnesarchum mel, no nam
              liber animal, sea tollit scaevola necessitatibus cu. In est facer
              appellantur. Et mea debet dolorem voluptaria. Ne commodo fabulas
              eos. Ius ei minim aeque laudem. Hinc tation nominati vis et,
              alienum epicurei pro eu. At per munere eloquentiam. An wisi
              lobortis vix. Eos cu scripta atomorum, an est cetero liberavisse,
              affert postea conclusionemque ad ius. Tamquam civibus pri cu,
              exerci timeam consequuntur.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0 mt-6">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/1QIo68XSVKk?si=pBaMi6PLQAJIxj44"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="w-screen mb-10">
        <div className="w-screen min-h-screen lg:h-screen">
          <div className="relative flex items-center justify-center h-1/5 w-full p-10 my-10">
            <div className="absolute flex w-full h-3/4 items-center justify-center">
              <img
                src={HomeArrow}
                className="w-full h-full opacity-85 object-cover"
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
                <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-lg leading-relaxed p-1 lg:p-3">
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
                <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-lg leading-relaxed p-1 lg:p-3">
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
          <div className="flex flex-row justify-between items-center w-full h-1/5 mt-1 p-10">
            <div className="flex items-center justify-center bg-[#D1CCB6] font-vietnam-regular rounded-2xl w-1/2 h-full m-3">
              <button className="h-1/2 md:text-xl lg:text-xl">
                Leaderboard
              </button>
            </div>
            <div className="flex items-center justify-center bg-[#D1CCB6] font-vietnam-regular rounded-2xl w-1/2 h-full m-3">
              <button className="h-1/2 md:text-xl lg:text-xl">
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
      </div>
    </div>
  );
}

export default Home;

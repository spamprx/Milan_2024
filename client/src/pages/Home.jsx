import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import SportCard from "../components/SportCard";
import HomeSponsorCard from "../components/HomeSponsorCard";
import HomeLeaderboard from "../components/HomeLeaderboard";
import HomeBg from "../assets/Home.png";
import MilanFont from "../assets/Milan-font1.png";
import MilanHome from "../assets/HeroSection.png";
import Skateboard from "../assets/Skateboard.png";
import Basketball from "../assets/Basketball.png";
import Theme from "../assets/Theme.png";
import Mascot from "../assets/Mascot.jpeg";
import Stripes from "../assets/Stripes.png";
import Sponsor from "../assets/Sponsor.png";
import Pattern2 from "../assets/Pattern2.png";
import HomeArrow from "../assets/HomeArrow.png";
import HomeArrow2 from "../assets/Double_Arrow.png";
import Select from "react-select";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState("leaderboard");
  const cardContainerRef = useRef(null);

  const sportOptions = [
    { value: "basketball", label: "Basketball" },
    { value: "football", label: "Football" },
    { value: "badminton", label: "Badminton" },
    { value: "cricket", label: "Cricket" },
  ];

  const [selectedOption, setSelectedOption] = useState(sportOptions[0]);

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

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    dots: true,
    arrows: false,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveIndex(next),
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full mx-2 cursor-pointer ${
          i === activeIndex ? "bg-white" : "bg-gray-500"
        }`}
      />
    ),
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 slide on smaller screens
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
          centerPadding: "40px",
        },
      },
    ],
  };
  return (
    <div className="relative bg-transparent h-full flex flex-col mx-auto">
      <div
        className="relative w-full h-full bg-cover bg-center mt-6"
        style={{ backgroundImage: `url(${HomeBg})` }}
      >
        <div className="w-full h-full">
          <div className="w-full h-full relative flex justify-center items-center">
            <img
              src={MilanHome}
              alt="Milan Home"
              className="w-full h-auto object-contain z-10"
            />
            <div className="absolute z-10 flex flex-col gap-6 gap1 sm:gap-10 items-center justify-center scale-90 sm:scale-100">
              <img
                src={MilanFont}
                alt="Milan Font"
                className="w-3/4 max-w-[1000px] h-auto"
              />
              <div className="w-[90%] sm:w-3/4 z-20 text-center text-[#D1CCB6] text-xs herotext1 sm:text-lg lg:text-2xl font-be-vietnam-pro">
                <p className="font-normal mx-auto">
                  MILAN stands as one of the largest and most eagerly awaited
                  inter-hostel competitions in India. It is a thrilling showcase
                  of talent and spirit, uniting students in a vibrant and
                  dynamic celebration.
                </p>
                <p className="font-normal mx-auto mt-2 md:mt-6">
                  With each passing year, participation in this General
                  Championship has been on the rise, contributing to an
                  atmosphere of heightened enthusiasm and camaraderie. Drawing
                  over 6,000+ attendees.
                </p>
              </div>
            </div>
          </div>

          <div className="h-full w-full">
            <div className="relative w-full text-sm lg:text-md h-1/2 flex flex-col justify-between items-center md:my-4 px-6 py-10 z-30 font-be-vietnam-pro bg-transparent">
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col items-start">
                  <label className="block text-[#D1CCB6] mb-2" htmlFor="event">
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
                        backgroundColor: state.isSelected
                          ? "#333333"
                          : "#000000",
                        color: "#ffffff",
                        "&:hover": {
                          backgroundColor: "#333333",
                        },
                      }),
                    }}
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-end items-end">
                  <p className="text-[#f0f0f0d9] font-thin">There will be</p>
                  <p className="text-white text-lg lg:text-xl font-bold">
                    {currentEvents.length} Incoming Events
                  </p>
                </div>
              </div>
            </div>

            <div className="slider-container w-full mb-7">
              <Slider {...settings}>
                {currentEvents.map((event, index) => (
                  <div key={index} className="p-2 mb-2">
                    <SportCard event={event} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full mb-8 flex flex-col justify-center items-center">
        <div className="bg-[#160631] mb-8">
          <div className="w-screen relative">
            <img
              src={Stripes}
              alt="Stripes background"
              className="w-full h-auto object-cover lg:scale-y-75"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <h2 className="text-[#D1CCB6] text-lg md:text-3xl lg:text-4xl font-semibold text-center">
                MORE ABOUT OTHER EVENTS
              </h2>
            </div>
          </div>
          <div className="w-full relative flex flex-row gap-2 sm:gap-4 py-2 bg-[#160631] border-y-2 border-[#D1CCB6]">
            <div className="bg-[#D1CCB6] flex-grow rounded-r-xl"></div>
            <div className="bg-[#D1CCB6] w-1/4 rounded-xl"></div>
            <div className="bg-[#D1CCB6] text-md sm:text-lg md:text-3xl lg:text-4xl p-2 px-8 rounded-xl text-[#160631] font-bold">
              THE AFTERMOVIE
            </div>
            <div className="bg-[#D1CCB6] w-1/4 rounded-xl"></div>
            <div className="bg-[#D1CCB6] flex-grow rounded-l-xl"></div>
          </div>
        </div>
        <div className="w-full flex-grow flex flex-col sm:flex-row justify-around items-center gap-8 px-4 lg:px-8">
          <div className="w-full lg:w-1/2 aspect-square max-w-[500px] rounded-xl flex items-center justify-center order-1 sm:order-2 overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/1QIo68XSVKk?si=pBaMi6PLQAJIxj44"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] flex items-center justify-center order-2 sm:order-1">
            <div className="absolute w-full h-full rounded-xl flex items-center justify-center z-10 bg-transparent overflow-hidden">
              <img
                src={Pattern2}
                className="w-full h-full object-cover opacity-15 z-20"
              />
            </div>
            <div className="absolute w-full h-full bg-[#8F33BA] rounded-xl flex items-center justify-center text-[#D1CCB6] text-center p-4 lg:p-6">
              <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-lg leading-relaxed overflow-auto max-h-full">
                Lorem ipsum dolor sit amet, ne ferri iudico mnesarchum mel, no
                nam liber animal, sea tollit scaevola necessitatibus cu. In est
                facer appellantur. Et mea debet dolorem voluptaria. Ne commodo
                fabulas eos. Ius ei minim aeque laudem. Hinc tation nominati vis
                et, alienum epicurei pro eu. At per munere eloquentiam. An wisi
                lobortis vix. Eos cu scripta atomorum, an est cetero
                liberavisse, affert postea conclusionemque ad ius. Tamquam
                civibus pri cu, exerci timeam consequuntur. Lorem ipsum dolor
                sit amet, ne ferri iudico mnesarchum mel, no nam liber animal,
                sea tollit scaevola necessitatibus cu. In est facer appellantur.
                Et mea debet dolorem voluptaria. Ne commodo fabulas eos. Ius ei
                minim aeque laudem. Hinc tation nominati vis et, alienum
                epicurei pro eu. At per munere eloquentiam. An wisi lobortis
                vix. Eos cu scripta atomorum, an est cetero liberavisse, affert
                postea conclusionemque ad ius. Tamquam civibus pri cu, exerci
                timeam consequuntur. Lorem ipsum dolor sit amet, ne ferri iudico
                mnesarchum mel, no nam liber animal, sea tollit scaevola
                necessitatibus cu. In est facer appellantur. Et mea debet
                dolorem voluptaria. Ne commodo fabulas eos. Ius ei minim aeque
                laudem. Hinc tation nominati vis et, alienum epicurei pro eu. At
                per munere eloquentiam. An wisi lobortis vix. Eos cu scripta
                atomorum, an est cetero liberavisse, affert postea
                conclusionemque ad ius. Tamquam civibus pri cu, exerci timeam
                consequuntur.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center mb-8">
        <div className="relative flex items-center justify-center h-1/5 w-full p-6 lg:p-10 mb-8">
          <div className="absolute flex w-full h-3/4 items-center justify-center">
            <img
              src={HomeArrow}
              className="w-full h-full opacity-85 object-cover"
            />
          </div>
          <img
            src={Skateboard}
            className="absolute w-3/4 sm:w-1/2 lg:w-1/3 h-auto z-10 opacity-90"
          />
          <p className="relative z-20 text-white text-center text-sm sm:text-xl lg:text-2xl font-semibold">
            OUR THEME
          </p>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-around items-center lg:items-start gap-8 px-4 lg:px-8">
          <div className="w-full lg:w-1/2 aspect-square max-w-[500px] rounded-xl flex items-center justify-center overflow-hidden">
            <img src={Theme} className="w-full h-full object-contain" />
          </div>
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] flex items-center justify-center">
            <div className="absolute w-full h-full rounded-xl flex items-center justify-center z-10 bg-transparent overflow-hidden">
              <img
                src={Pattern2}
                className="w-full h-full object-cover opacity-15 z-20"
              />
            </div>
            <div className="absolute w-full h-full bg-[#8F33BA] rounded-xl flex items-center justify-center text-[#D1CCB6] text-center p-4 lg:p-6">
              <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-lg leading-relaxed overflow-auto max-h-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur nobis, autem, aliquid repellendus totam veritatis
                quis quae facilis itaque eos maxime perspiciatis accusamus
                dolores, culpa ab modi! Ratione, commodi optio!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center mb-8">
        <div className="relative flex items-center justify-center h-1/5 w-full p-6 lg:p-10 mb-8">
          <div className="absolute flex w-full h-3/4 items-center justify-center">
            <img
              src={HomeArrow}
              className="w-full h-full opacity-85 object-cover"
            />
          </div>
          <img
            src={Skateboard}
            className="absolute w-3/4 sm:w-1/2 lg:w-1/3 h-auto z-10 opacity-90"
          />
          <p className="relative z-20 text-white text-center text-sm sm:text-xl lg:text-2xl font-semibold">
            OUR MASCOT
          </p>
        </div>
        <div className="w-full flex-grow flex flex-col sm:flex-row justify-around lg:items-start items-center gap-8 px-4 lg:px-8">
          <div className="w-full lg:w-1/2 aspect-square max-w-[500px] rounded-xl flex items-center justify-center order-1 sm:order-2 overflow-hidden">
            <img src={Mascot} className="w-full h-full object-contain" />
          </div>
          <div className="relative w-full lg:w-1/2 aspect-square max-w-[500px] flex items-center justify-center order-2 sm:order-1">
            <div className="absolute w-full h-full rounded-xl flex items-center justify-center z-10 bg-transparent overflow-hidden">
              <img
                src={Pattern2}
                className="w-full h-full object-cover opacity-15 z-20"
              />
            </div>
            <div className="absolute w-full h-full bg-[#8F33BA] rounded-xl flex items-center justify-center text-[#D1CCB6] text-center p-4 lg:p-6">
              <p className="font-be-vietnam-pro font-bold text-[#D1CCB6] text-sm lg:text-lg leading-relaxed overflow-auto max-h-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur nobis, autem, aliquid repellendus totam veritatis
                quis quae facilis itaque eos maxime perspiciatis accusamus
                dolores, culpa ab modi! Ratione, commodi optio!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="relative flex items-center justify-center h-1/7 lg:h-2/5 w-full p-6 lg:p-10 mb-8">
          <div className="absolute flex w-full h-3/4 items-center justify-center">
            <img
              src={HomeArrow}
              className="w-full h-full opacity-85 object-cover"
            />
          </div>
          <p className="relative z-20 text-white text-center text-sm sm:text-xl lg:text-2xl font-semibold">
            OVERALL LEADERBOARD
          </p>
        </div>
        <div className="flex flex-row gap-4 max-w-7xl justify-between items-center w-full font-bold px-4 lg:px-8 mb-8">
          <div
            className={`flex items-center justify-center font-vietnam-regular rounded-2xl w-1/2 p-3 ${
              leaderBoard === "leaderboard"
                ? "bg-[#4B16B2] text-white"
                : "bg-[#D1CCB6]"
            }`}
          >
            <button
              className="md:text-xl lg:text-xl w-full"
              onClick={() => setLeaderBoard("leaderboard")}
            >
              Leaderboard
            </button>
          </div>
          <div
            className={`flex items-center justify-center font-vietnam-regular rounded-2xl w-1/2 p-3 ${
              leaderBoard === "blockrace"
                ? "bg-[#4B16B2] text-white"
                : "bg-[#D1CCB6]"
            }`}
          >
            <button
              className="md:text-xl lg:text-xl w-full"
              onClick={() => setLeaderBoard("blockrace")}
            >
              Block Race
            </button>
          </div>
        </div>
        <div className="w-full max-w-7xl lg:w-full flex flex-col lg:flex-row justify-center items-center lg:items-start px-4 lg:px-8">
          <div
            className={`relative w-full lg:w-full lg:h-1/2 bg-[#8F33BA] flex items-center justify-center p-3 rounded-xl`}
          >
            <div className="relative w-full h-full bg-[#0000004F] opacity-31 rounded-lg">
              {leaderBoard === "leaderboard" ? (
                <HomeLeaderboard />
              ) : (
                <div className="flex justify-center items-center w-full min-h-[600px]">
                  <p className="text-white text-2xl">Block Race Component</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full h-full"
        style={{ backgroundImage: `url(${HomeArrow2})` }}
      >
        <div className="flex justify-start">
          <div className="relative flex items-center h-1/5 w-1/2 p-5">
            <img src={Sponsor} alt="Sponsor" className="sm:w-1/2 lg:w-1/3" />
          </div>
        </div>
        <div className="flex justify-center w-full h-1/2">
          <HomeSponsorCard />
        </div>
      </div>
    </div>
  );
}

export default Home;

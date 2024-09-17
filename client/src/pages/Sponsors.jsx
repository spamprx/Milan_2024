import { useState, useEffect } from "react";
import SponsorArrow from "../assets/SponsorArrow.png";
import SponsorBg from "../assets/Sponsors.jpeg";
import SponsorBg2 from "../assets/Sponsors2.jpeg";
import Loading from "./Loading";

function Sponsors() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sponsorImages, setSponsorImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetch("/SPONSORS/Sponsors.json")
      .then((response) => response.json())
      .then((data) => setSponsorImages(data.sponsors))
      .catch((error) => console.error("Error fetching JSON:", error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`relative flex flex-col justify-between items-center w-full bg-none ${
          isSmallScreen ? "h-fit" : "pt-1 min-h-screen"
        }`}
      >
        <div className="relative w-full min-h-screen">
          <div className="relative flex items-center justify-center h-4/5 w-full p-10 mt-5 mb-10">
            <div className="absolute flex w-full h-full items-center justify-center">
              <img
                src={SponsorArrow}
                alt="SponsorArrow"
                className="w-full scale-y-125 sm:scale-y-75 lg:scale-y-[65%]"
              />
            </div>

            <p className="relative z-10 text-white text-center text-xl sm:text-2xl lg:text-3xl">
              Our Supporters
            </p>
          </div>

          <div
            className="flex flex-col w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${SponsorBg})` }}
          >
            <div className="w-full h-full flex flex-wrap justify-center items-center">
              {sponsorImages.slice(0, 6).map((image, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5"
                >
                  <img
                    src={image}
                    alt={`Sponsor ${index + 1}`}
                    className="rounded-2xl w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center h-4/5 w-full p-10 mt-10 mb-10">
            <div className="absolute flex w-full h-full items-center justify-center">
              <img
                src={SponsorArrow}
                alt="SponsorArrow"
                className="w-full scale-y-125 sm:scale-y-75 lg:scale-y-[65%]"
              />
            </div>

            <p className="relative z-10 text-white text-center text-xl sm:text-2xl lg:text-3xl">
              Our Supporters
            </p>
          </div>

          <div
            className="flex flex-col w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${SponsorBg2})` }}
          >
            <div className="w-full h-full flex flex-wrap justify-center items-center">
              {sponsorImages.slice(6, 12).map((image, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5"
                >
                  <img
                    src={image}
                    alt={`Sponsor ${index + 7}`}
                    className="rounded-2xl w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sponsors;

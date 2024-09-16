import SponsorBg from "../assets/Sponsors.jpeg";
import SponsorBg2 from "../assets/Sponsors2.jpeg";
import SponsorArrow from "../assets/SponsorArrow.png";
import { useState, useEffect } from "react";
import Loading from "./Loading";

function Sponsors() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const totalImages = 12; // Total number of images to load
  const [loadedImages, setLoadedImages] = useState(0);

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

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  // If all images are loaded, set isLoading to false
  useEffect(() => {
    if (loadedImages === totalImages) {
      setIsLoading(false);
    }
  }, [loadedImages, totalImages]);

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
                // onLoad={handleImageLoad}
              />
            </div>

            <p className="relative z-10 text-white text-center text-xl sm:text-2xl lg:text-3xl">
              Our Supporters
            </p>
          </div>

          <div
            className="flex flex-col w-full h-full bg-cover bg-center"
            onLoad={handleImageLoad}
            style={{ backgroundImage: `url(${SponsorBg})` }}
          >
            <div className="w-full h-full flex flex-wrap justify-center items-center">
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center h-4/5 w-full p-10 mt-10 mb-10">
            <div className="absolute flex w-full h-full items-center justify-center">
              <img
                src={SponsorArrow}
                alt="SponsorArrow"
                className="w-full scale-y-125 sm:scale-y-75 lg:scale-y-[65%]"
                // onLoad={handleImageLoad}
              />
            </div>

            <p className="relative z-10 text-white text-center text-xl sm:text-2xl lg:text-3xl">
              Our Supporters
            </p>
          </div>

          <div
            className="flex flex-col w-full h-full bg-cover bg-center"
            onLoad={handleImageLoad}
            style={{ backgroundImage: `url(${SponsorBg2})` }}
          >
            <div className="w-full h-full flex flex-wrap justify-center items-center">
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sponsors;

import SponsorArrow from "../assets/SponsorArrow.png";
import { useState, useEffect } from "react";
import Loading from "./Loading";

const SponsorLayout = ({ sponsorImages }) => {
  const totalSponsors = sponsorImages.length;
  const number = window.innerWidth < 1024 ? 2 : 4;
  const sponsorsPerRow = Math.ceil(totalSponsors / number);
  const excessSponsors = totalSponsors % 3;

  const firstRowSponsors = sponsorImages.slice(0, sponsorsPerRow);
  const middleRowSponsors = sponsorImages.slice(
    sponsorsPerRow,
    sponsorsPerRow + sponsorsPerRow + (excessSponsors > 0 ? excessSponsors : 0)
  );
  const lastRowSponsors = sponsorImages.slice(
    sponsorsPerRow + middleRowSponsors.length
  );

  const renderSponsorRow = (sponsors, rowIndex) => (
    <div key={rowIndex} className={`flex flex-wrap justify-center w-full ${number === 4 ? 'mb-8' : ''}`}>
      {sponsors.map((sponsor, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5 flex items-center justify-center"
        >
          <img
            src={sponsor.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={sponsor.name}
            className="rounded-2xl w-2/3 h-auto object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );


  return (
    <div className="w-full">
      {renderSponsorRow(firstRowSponsors, 0)}
      {renderSponsorRow(middleRowSponsors, 1)}
      {renderSponsorRow(lastRowSponsors, 2)}
    </div>
  );
};

function Sponsors() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sponsorImages, setSponsorImages] = useState([]);

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
      .then((data) => setSponsorImages(data[0].logo))
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
          >
            <div className="w-full h-full flex flex-wrap justify-center items-center">
              {/* <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg2}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div> */}
              <SponsorLayout sponsorImages={sponsorImages} />
            </div>
          </div>

          {/* <div className="relative flex items-center justify-center h-4/5 w-full p-10 mt-10 mb-10">
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
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/3 rounded-2xl p-5">
                <img
                  src={SponsorBg}
                  alt="Sponsor1"
                  className="rounded-2xl w-full h-full object-contain"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Sponsors;

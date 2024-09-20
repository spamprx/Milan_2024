import React, { useState, useEffect } from "react";
import Basketball from "../assets/Basketball.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import Loading from "../pages/Loading";

const HomeSponsorCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sponsorImages, setSponsorImages] = useState([]);

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
    <div className="w-screen my-4 flex items-center justify-center overflow-hidden">
      <Splide
        options={{
          type: "loop",
          perPage: 3,
          gap: "3rem",
          pagination: false,
          autoScroll: {
            pauseOnHover: false,
            pauseOnFocus: false,
            speed: 2,
          },
          arrows: false,
          drag: true,
        }}
        extensions={{ AutoScroll }}
      >
        {sponsorImages.map((sponsor, index) => (
          <SplideSlide key={index}>
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={sponsor.image}
                alt={sponsor.name}
                className="object-contain w-full h-full rounded-xl"
                style={{ maxHeight: "90%", maxWidth: "90%" }}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default HomeSponsorCard;

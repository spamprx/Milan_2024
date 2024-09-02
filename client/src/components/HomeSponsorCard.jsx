import React from "react";
import Basketball from "../assets/Basketball.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";

const HomeSponsorCard = () => {
  const sponsors = [
    { src: Basketball, alt: "Image 1" },
    { src: Basketball, alt: "Image 2" },
    { src: Basketball, alt: "Image 3" },
  ];

  return (
    <div className="w-screen my-4 flex items-center justify-center">
      <Splide
        options={{
          type: "loop",
          perPage: 3,
          gap: 8,
          autoScroll: {
            pauseOnHover: false,
            pauseOnFocus: false,
            rewind: false,
            speed: 1,
          },
          height: "250px",
          arrows: false,
        }}
        extensions={{ AutoScroll }}
      >
        {sponsors.map((sponsor, index) => (
          <SplideSlide key={index}>
            <div className="w-full h-full bg-[#220A4F] items-center justify-center">
              <img
                src={sponsor.src}
                alt={sponsor.alt}
                className="object-contain w-full h-full rounded-md"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default HomeSponsorCard;

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../assets/Dropdown.png";
import Cross from "../assets/Cross.png";
import Arrow from "../assets/Stripes.png";

function Hamburger() {
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const dropdownRef = useRef(null);

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "EVENTS", path: "/events" },
    { name: "LIVESCORE", path: "/livescore" },
    { name: "CALENDAR", path: "/calendar" },
    { name: "SPONSORS", path: "/sponsors" },
    { name: "TEAM", path: "/team" },
    { name: "PROFILE", path: "/profile" },
    { name: "RULEBOOK", path: "/rulebook" },
  ];

  useEffect(() => {
    if (isActive) {
      setIsTransitioning(true);
    } else {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [isActive]);

  return (
    <div className="top-4 right-4 z-50 p-2">
      <div
        className="relative flex flex-col gap-1 w-fit h-fit cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="flex flex-row gap-1">
          <div className="bg-amber-400 w-6 rounded-[4px] h-4"></div>
          <div className="bg-gray-400 w-3 rounded-[4px] h-4"></div>
        </div>
        <div className="flex flex-row gap-1">
          <div className="bg-gray-400 w-3 rounded-[4px] h-4"></div>
          <div className="bg-amber-400 w-6 rounded-[4px] h-4"></div>
        </div>
      </div>
      {(isActive || isTransitioning) && (
        <div
          ref={dropdownRef}
          className={`fixed top-0 right-0 w-screen max-w-[500px] h-screen overflow-y-auto bg-[#6B5794] z-50 transition-all duration-300 rounded-l-3xl ease-in-out ${
            isActive
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          }`}
          style={{
            backgroundImage: `url(${Dropdown})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col z-50 h-full justify-around p-4">
            <img
              src={Cross}
              alt="Cross"
              className="w-1/6 cursor-pointer"
              onClick={() => setIsActive(false)}
            />
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`dropdown cursor-pointer z-50 relative flex items-center justify-between transition-all duration-300 ease-in-out ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => {
                  setActiveIndex(index);
                  setIsActive(false);
                }}
              >
                <span className="py-2 px-4 text-white">{item.name}</span>
                {activeIndex === index && (
                  <img src={Arrow} alt="Arrow" className="w-6 h-6 mr-4" />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hamburger;

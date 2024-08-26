import { useState, useEffect } from "react";
import Dropdown from "../assets/Dropdown.png";
import Cross from "../assets/Cross.png";
import Arrow from "../assets/Arrow.png";

function Hamburger() {
    const [isActive, setIsActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const menuItems = [
        "HOME",
        "EVENTS",
        "LIVESCORE",
        "CALENDAR",
        "SPONSORS",
        "TEAM",
        "PROFILE",
        "RULEBOOK",
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

    return (
        <div className="relative">
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
            className={`absolute -top-6 -right-4 w-screen max-w-[500px] h-screen bg-[#6B5794] z-50 transition-all duration-300 ease-in-out ${
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
            <div className="flex flex-col gap-8 p-4">
                <img
                src={Cross}
                alt="Cross"
                className="w-1/6 cursor-pointer"
                onClick={() => setIsActive(false)}
                />
                {menuItems.map((item, index) => (
                <div
                    key={index}
                    className={`dropdown my-2 cursor-pointer relative flex items-center justify-between transition-all duration-300 ease-in-out ${
                    isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-full"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => setActiveIndex(index)}
                >
                    <span className="py-2 px-4 text-white">{item}</span>
                </div>
                ))}
            </div>
            </div>
        )}
        </div>
    );
}

export default Hamburger;

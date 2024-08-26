import Logo from "../assets/Milan-logo.png";
import Hamburger from "./Hamburger";
import NavBar1 from "./NavBar1";
import { useState, useEffect } from "react";

function Header() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 880);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-transparent z-50"
          : "relative"
      } transition-all duration-300`}
    >
      {isSmallScreen ? (
        <div className="flex items-center w-full h-fit pt-1 justify-between px-4">
          <img src={Logo} alt="Logo" className="logo p-2" />
          <Hamburger />
        </div>
      ) : (
        <div className="relative flex items-center w-full h-fit justify-between px-4">
          <div className="flex items-center w-full">
            <div className="flex flex-col m-4">
              <span className="text-yellow-400 font-be-vietnam text-md">
                MILAN
              </span>
              <span className="text-yellow-400 font-be-vietnam text-xs">
                {" "}
                The General Championship of
              </span>
              <span className="text-white font-be-vietnam text-xs">
                {" "}
                IIT Hyderabad
              </span>
            </div>
            <NavBar1 />
            <img src={Logo} alt="Logo" className="logo p-2" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;

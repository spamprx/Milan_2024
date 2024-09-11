import Logo from "../assets/Milan-logo.png";
import Hamburger from "./Hamburger";
import NavBar1 from "./NavBar1";
import BG from "../assets/ActivePage.png";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const text = location.pathname.split("/")[1];

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative bg-gradient-to-b from-[#12022D] to-transparent via-[#12022D]/80">
        {isSmallScreen ? (
          <div className="relative flex items-center w-full pt-1 justify-between px-4 z-50">
            <img src={Logo} alt="Logo" className="logo p-2" />
            {text === "" ? (
              <></>
            ) : (
              <div className="relative flex items-center w-fit text-white">
                <img src={BG} alt="BG" className="h-12 scale-x-125 w-auto" />
                <div className="absolute inset-0 font-bold flex justify-center items-center">
                  {text.toUpperCase()}
                </div>
              </div>
            )}
            <Hamburger />
          </div>
        ) : (
          <div className="relative flex items-center w-full h-fit justify-between px-4 z-30">
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
    </>
  );
}

export default Header;

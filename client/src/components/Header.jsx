import Logo from "../assets/Milan-logo.png";
import Hamburger from "./Hamburger";
import NavBar1 from "./NavBar1";
import { useState, useEffect } from 'react';

function Header() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 880);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isSmallScreen ? (
                <div className="relative flex items-center w-full h-screen pt-1 justify-between px-4">
                    <img src={Logo} alt="Logo" className="logo p-2" />
                    <Hamburger />
                </div>
            ) : (
                <div className="relative flex items-center w-full h-screen justify-between px-4">
                    <div className="flex items-center w-full">
                        <div className="flex flex-col m-4">
                            <span className="text-yellow-400 font-be-vietnam text-md">MILAN</span>
                            <span className="text-yellow-400 font-be-vietnam text-xs"> The General Championship of</span>
                            <span className="text-white font-be-vietnam text-xs"> IIT Hyderabad</span>
                        </div>
                        <NavBar1 />
                        <img src={Logo} alt="Logo" className="logo p-2" />
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;

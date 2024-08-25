import Logo from "../assets/Milan-logo.png";
import Hamburger from "./Hamburger";

function Header() {
    return (
        <div className="relative flex items-center w-full h-fit pt-1 justify-between px-4">
            <img src={Logo} alt="Logo" className="logo w-1/6 p-2" />
            <Hamburger />
        </div>
    );
}

export default Header;

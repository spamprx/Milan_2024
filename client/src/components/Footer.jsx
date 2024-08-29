import Logo from "../assets/cream_logo.svg"
import Location from "../assets/Location.png";
import Contact from "../assets/Contacts_us.png";
import Follow from "../assets/Follow.png";

function Footer() 
{
    return (
        <div className="bg-[#12022D] flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center mt-4">
                <img src={Logo} alt="Logo" className="logo w-1/2 h-1/2 p-2"/>
                <span className="text-[#DEB116] font-be-vietnam text-4xl">MILAN</span>
                <span className="text-[#DEB116] font-be-vietnam text-sm">The General Championship of</span>
                <span className="text-white font-be-vietnam text-sm">IIT Hyderabad</span>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row min-w-[300px] relative h-fit justify-center items-center">
                <img src={Follow} alt="Follow" className="w-1/2 h-1/2 md:w-1/4 p-2 mx-auto"/>
                <img src={Location} alt="Location" className="w-1/2 h-1/2 md:w-1/4 mx-auto"/>
                <img src={Contact} alt="Contact" className="w-1/2 h-1/2 md:w-1/4 p-2 mx-auto"/>
            </div>
        </div>
    );
}

export default Footer
import Image from "../assets/footer.png"
import Logo from "../assets/Milan-logo.png"
import CreamLogo from "../assets/cream_logo.svg"

function Footer() {
    return (
        <div className="bg-[#12022D]">
            <img src={CreamLogo} alt="Logo" className="w-1/4 mx-auto"/>
            <img src={Image} alt="Footer" className="w-full h-fit" />
            <div className="flex flex-row justify-between p-2">
                <div className="flex flex-col m-4">
                    <span className="text-yellow-400 font-be-vietnam text-lg">MILAN</span>
                    <span className="text-white font-be-vietnam text-xs"> IIT Hyderabad</span>
                </div>
                <img src={Logo} alt="Logo" className="w-1/6 h-1/2 p-3" />
            </div>
        </div>
    )
}

export default Footer;
import Logo from "../assets/cream_logo.svg";
import Location from "../assets/Location.png";
import Contact from "../assets/Contacts_us.png";
import Follow from "../assets/Follow.png";
import Instagram from "../assets/Instagram.svg";
import Youtube from "../assets/Youtube.svg";
import LinkedIn from "../assets/LinkedIn.svg";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-[#12022D] via-[#12022D]/80 flex flex-col justify-center items-center h-fit mt-8 pb-10">
      <div className="flex flex-col justify-center items-center mt-4">
        <img src={Logo} alt="Logo" className="logo w-1/2 h-1/2 p-2" />
        <span className="text-[#DEB116] font-[600] font-be-vietnam text-4xl">
          MILAN
        </span>
        <span className="text-[#DEB116] font-[400] font-be-vietnam text-sm">
          The General Championship of
        </span>
        <span className="text-white font-[400] font-be-vietnam text-sm">
          IIT Hyderabad
        </span>
        <span className="text-[#DEB116] mt-1 font-[400] font-be-vietnam text-sm">
          <a
            href="/privacy_policy.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </span>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row min-w-[300px] relative h-fit justify-center items-center">
        {/* Follow Section */}
        <div className="flex flex-col items-center">
          <img src={Follow} alt="Follow" className="w-1/3 h-1/3 mx-auto" />
          <div className="flex flex-row space-x-4 mt-2">
            <a
              href="https://www.instagram.com/milan.iithyd/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="Instagram" className="w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCLmZ3AcvOulm1-TFdgqngTw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Youtube} alt="Youtube" className="w-6 h-6" />
            </a>
            <a
              href="https://in.linkedin.com/company/milanthegc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LinkedIn} alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Location Section */}
        <div className="flex flex-col items-center">
          <img src={Location} alt="Location" className="w-1/3 h-1/3 mx-auto" />
          <span className="text-[#D1CCB6] font-[600] font-be-vietnam text-sm">
            Indian Institute of Technology Hyderabad
          </span>
          <span className="text-[#D1CCB6] font-[300] font-be-vietnam text-sm">
            Near NH-65, Sangareddy, Kandi
          </span>
          <span className="text-[#D1CCB6] font-[300] font-be-vietnam text-sm">
            Telangana 502285
          </span>
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center">
          <img src={Contact} alt="Contact" className="w-1/3 h-1/3 mx-auto" />
          <span className="text-[#D1CCB6] font-[300] font-be-vietnam text-sm">
            Phone:
          </span>
          <span className="text-[#D1CCB6] font-[300] font-be-vietnam text-sm">
            +91 6361 325 605
          </span>
          <span className="text-[#D1CCB6] font-[300] font-be-vietnam text-sm">
            Email us at:
          </span>
          <span className="text-[#D1CCB6] font-[500] font-be-vietnam text-sm">
            milan.oc@gymkhana.iith.ac.in
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

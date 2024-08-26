import SponsorBg from "../assets/Sponsors.jpeg";
import SponsorBg2 from "../assets/Sponsors2.jpeg";

function Sponsors() {
  return (
    // <h1>Work under Progress.......</h1>
    <div className="relative w-full h-screen">
      <div className="w-full h-1/5 bg-[#140432]"></div>

      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${SponsorBg})` }}
      ></div>

      <div className="w-full h-1/5 bg-[#140432]"></div>

      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${SponsorBg2})` }}
      ></div>
    </div>
  );
}
export default Sponsors;

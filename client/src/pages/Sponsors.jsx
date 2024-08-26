import SponsorBg from "../assets/Sponsors.jpeg";
import SponsorBg2 from "../assets/Sponsors2.jpeg";

function Sponsors() {
  return (
    // <h1>Work under Progress.......</h1>
    <div className="relative w-full h-screen">
      <div className="flex items-center justify-center w-full h-1/6 bg-[#140432]">
        <div className="flex w-1/3 h-1/2 justify-center items-center rounded-3xl bg-[#6B5794] text-2xl font-bold text-white">
          LOREM IPSUM
        </div>
      </div>

      <div
        className="flex flex-col w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${SponsorBg})` }}
      >
        <div className="flex flex-row justify-between items-center bg-transparent w-full h-full rounded-2xl">
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg2}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg2}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-row bg-transparent w-full h-full rounded-2xl">
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg2}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg2}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-1/5 bg-[#140432]">
        <div className="flex w-1/3 h-1/2 justify-center items-center rounded-3xl bg-[#6B5794] text-2xl font-bold text-white">
          LOREM IPSUM
        </div>
      </div>

      <div
        className="flex flex-col w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${SponsorBg2})` }}
      >
        <div className="flex flex-row justify-between items-center bg-transparent w-full h-full rounded-2xl">
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-row bg-transparent w-full h-full rounded-2xl">
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
          <div className="w-1/2 h-2/3 rounded-2xl m-5">
            <img
              src={SponsorBg}
              alt="Sponsor1"
              className="rounded-2xl w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sponsors;

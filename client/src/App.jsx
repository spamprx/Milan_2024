import { Routes, Route } from "react-router-dom";
import Error from "./pages/404";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import LiveScore from "./pages/LiveScore";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RuleBook from "./pages/RuleBook";
import Sponsors from "./pages/Sponsors";
import Team from "./pages/Team";
import Navbar from "./components/NavBar";
import NavBar1 from "./components/NavBar1";
import Background from "./assets/Background.png";
import Logo from "./assets/Milan-logo.png";
import { useState } from "react";

function App() {
  // const [showNav, setShowNav] = useState(true);
  return (
    <div
      className="w-full h-full min-h-screen bg-cover bg-center m-0"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="p-8 text-center">
        <div className="flex justify-between items-center">
          <div>
            <p className="flex text-start text-yellow-500 text-xl font-bold">
              MILAN
            </p>
            <p className="flex text-start text-yellow-600 text-xs">
              The General Championship Of
            </p>
            <p className="flex text-start text-white text-xs">IIT Hyderabad</p>
          </div>
          <div className="flex w-[60vw] h-[10vh]">
            <div className="fixed w-[60vw] h-[10vh] bg-[#270b5de6] rounded-full z-30">
              <NavBar1 />
            </div>
          </div>
          <img src={Logo} className="h-10" />
        </div>
        {/* <div className="px-4 pb-8 text-end text-white">
          <button onClick={() => setShowNav(!showNav)}>Menu</button>
          {showNav && <Navbar showNav={showNav} setShowNav={setShowNav} />}
        </div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/events" element={<Events />} />
          <Route path="/livescore" element={<LiveScore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rulebook" element={<RuleBook />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

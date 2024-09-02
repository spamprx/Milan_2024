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
import Background from "./assets/Background.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTopButton from "./components/BackToTopButton";

function App() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      <main className="flex-grow">
        <div className="text-center">
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
      </main>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default App;

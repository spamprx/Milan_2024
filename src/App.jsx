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

function App() {
  return (
      <h1>Milan</h1>
      <Routes>
        <Route index element={<Home />} />
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

  );
}

export default App;

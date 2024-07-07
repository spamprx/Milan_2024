import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPortal from "./components/AdminPortal";
import Navbar from "./components/Navbar";
import "./index.css"

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/admin" element={<AdminPortal />} />
          <Route
            path="/"
            element={<h1 className="bg-slate-300">Live Score Admin Portal</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

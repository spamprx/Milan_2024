import AdminPortal from "./components/AdminPortal";
import Google from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import "./index.css";

const App = () => {
  return (
    <Routes>
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/" element={<Google/>} />
    </Routes>
  );
};

export default App;
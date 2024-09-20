import AdminPortal from "./components/AdminPortal";
import Google from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import "./index.css"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Google />} />
      <Route path="/admin" element={<AdminPortal />} />
    </Routes>
  );
};

export default App;
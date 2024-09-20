import React, { useState } from "react";
import AdminPortal from "./components/AdminPortal";
import Google from "./components/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Google onLogin={handleLogin} />} />
      ) : (
        <>
          <Route path="/" element={<AdminPortal />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
};

export default App;
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "./pages/404";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import LiveScore from "./pages/LiveScore";
import GoogleButton from "./pages/Login";
import Profile from "./pages/Profile";
import RuleBook from "./pages/RuleBook";
import Sponsors from "./pages/Sponsors";
import Team from "./pages/Team";
import Background from "./assets/Background.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./pages/Loading";
import BackToTopButton from "./components/BackToTopButton";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [backendDataLoaded, setBackendDataLoaded] = useState(false);
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setIsLoading(true);
    scrollToTop();

    const handlePageLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handlePageLoad);

    setTimeout(() => {
      setBackendDataLoaded(true);
    }, 3000);

    const checkLoadingComplete = () => {
      if (backendDataLoaded) {
        setIsLoading(false);
      }
    };

    const interval = setInterval(checkLoadingComplete, 3000);

    return () => {
      window.removeEventListener("load", handlePageLoad);
      clearInterval(interval);
    };
  }, [location, backendDataLoaded]);

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isLoading ? (
        <Loading isLoaded={isLoading} />
      ) : (
        <>
          <Header />

          <main className="flex-grow">
            <div className="text-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/events" element={<Events />} />
                <Route path="/livescore" element={<LiveScore />} />
                <Route path="/login" element={<GoogleButton />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/rulebook" element={<RuleBook />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/team" element={<Team />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </main>

          <Footer />

          <BackToTopButton />
        </>
      )}
    </div>
  );
}

export default App;

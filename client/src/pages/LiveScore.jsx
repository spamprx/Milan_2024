import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import CardLiveScore from "../components/CardLiveScore";
import CardLiveScoreRev from "../components/CardLiveScoreRev";
import Filter from "../components/CategoryFilter";
import Loading from "./Loading.jsx";
import GameDetails from "../components/PastScore.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GameDetailsCarousel = ({ pastData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(25);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("SELECT ALL");
  const scrollRef = useRef(null);
  const dateScrollRef = useRef(null);

  const dates = Array.from({ length: 10 }, (_, i) => i + 20);

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "30px",
    dots: false,
    arrows: false,
    infinite: true,
    pauseOnHover: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current, next) => setActiveIndex(next),
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  useEffect(() => {
    const filtered = pastData.filter((game) => {
      return (
        game.date === selectedDate &&
        (selectedCategory === "SELECT ALL" ||
          game.category === selectedCategory)
      );
    });

    setFilteredData(filtered);
    setActiveIndex(0);
  }, [selectedDate, selectedCategory, pastData]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const activeElement = scrollContainer.children[activeIndex];
      if (activeElement) {
        const scrollLeft =
          activeElement.offsetLeft -
          scrollContainer.clientWidth / 2 +
          activeElement.clientWidth / 2;
        scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (dateScrollRef.current) {
      const scrollContainer = dateScrollRef.current;
      const activeElement = scrollContainer.children[selectedDate - 20];
      if (activeElement) {
        const scrollLeft =
          activeElement.offsetLeft -
          scrollContainer.clientWidth / 2 +
          activeElement.clientWidth / 2;
        scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="relative w-full max-w-5xl overflow-hidden mb-4">
        <div
          ref={dateScrollRef}
          className="flex flex-col gap-4 items-center space-x-4 overflow-x-auto scrollbar-hide justify-center py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4">
            {dates.map((date) => (
              <button
                key={date}
                className={`w-8 md:w-10 h-8 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${
                  date === selectedDate
                    ? "bg-amber-500 text-black scale-110"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setSelectedDate(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex items-center justify-center scale-90 md:scale-100 md:p-4 mx-auto">
          <Filter
            options={["SPORTS", "CULTURALS", "SCI-TECH"]}
            title={"Category"}
            isSingle={true}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="slider-container w-full">
          <Slider {...settings}>
            {filteredData.map((game, index) => (
              <div key={index} className="p-2 mb-2">
                <GameDetails game={game} category={game.category} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-lg text-white font-bold mt-8">
          No games available for the selected date ({selectedDate}) and
          category.
        </p>
      )}
    </div>
  );
};

function LiveScore() {
  const [currentMatches, setCurrentMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState("SELECT ALL");
  const [socket, setSocket] = useState(null);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);
  const [matchEndedToggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [preferredGames, setPreferredGames] = useState([]);
  const [pastData, setPastData] = useState([]);

  useEffect(() => {
    const fetchPastData = async () => {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxcBzPmKL3U_YztfhfOPxBD2fwaulpgNlyPyxUgfCx8duvyHAnrVv5qWYnNmJgECaEY/exec"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched previous data:", result);
        setPastData(result);
      } catch (error) {
        console.error("Error fetching girls sports data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastData();
  }, [matchEndedToggle]);

  const handleLoginRedirect = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "profile",
          {
            withCredentials: true,
          }
        );
        const userData = response.data.user;
        const userPreferredGames = userData.interested_in || [];
        setPreferredGames([
          ...userPreferredGames.map(
            (game) => game.charAt(0).toUpperCase() + game.slice(1).toLowerCase()
          ),
        ]);
        setAuth(true);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setAuth(false);
      }
    };

    fetchUserDetails();
  }, []);

  const fetchLiveMatches = async () => {
    try {
      const response = await axios.get(
        "https://backend-w6vj.onrender.com/api/live-matches"
      );
      console.log("Live matches:", response.data);
      setLiveMatches(response.data);
    } catch (error) {
      console.error("Error fetching live matches:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();

    const newSocket = io("https://backend-w6vj.onrender.com/", {
      transports: ["websocket"],
      upgrade: false,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("newMatch", (match) => {
      console.log("New match received:", match);
      setLiveMatches((prevMatches) => [...prevMatches, match]);
    });

    newSocket.on("scoreUpdate", (updatedMatch) => {
      console.log("Score update received:", updatedMatch);
      setLiveMatches((prevMatches) =>
        prevMatches.map((match) =>
          match.matchId === updatedMatch.matchId ? updatedMatch : match
        )
      );
    });

    newSocket.on("matchEnded", (endedMatch) => {
      console.log("Match ended:", endedMatch);
      setLiveMatches((prevMatches) =>
        prevMatches.filter((match) => match.matchId !== endedMatch.matchId)
      );
      setToggle(!matchEndedToggle);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedSport === "SELECT ALL") {
      setCurrentMatches(liveMatches);
    } else if (selectedSport === "PREFERRED GAMES") {
      if (!auth) {
        setError(true);
      } else {
        setError(false);
        const preferredMatches = liveMatches.filter((match) =>
          preferredGames.includes(match.sport)
        );
        setCurrentMatches(preferredMatches);
      }
    }
  }, [liveMatches, selectedSport, preferredGames, auth]);

  const handleChange = (sport) => {
    setSelectedSport(sport);
    if (sport === "PREFERRED GAMES" && !auth) {
      setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && socket && !socket.connected) {
        socket.connect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-w-[320px] w-full mx-auto justify-center my-8">
      <div className="text-3xl text-white font-bold mb-8">
        --- LIVE MATCHES ---
      </div>
      <div className="flex flex-row gap-[20vw] justify-center">
        <Filter
          options={["PREFERRED GAMES"]}
          title="SELECT EVENT"
          isSingle={true}
          onCategoryChange={handleChange}
        />
      </div>

      {!error && (
        <div className="grid grid-cols-1 card-col scale-90 w-full gap-8 justify-items-center">
          {currentMatches.length >= 2
            ? currentMatches.map((match, index) =>
                index % 2 === 0 ? (
                  <CardLiveScore key={match.matchId} match={match} />
                ) : (
                  <CardLiveScoreRev key={match.matchId} match={match} />
                )
              )
            : currentMatches.map((match) => (
                <CardLiveScore key={match.matchId} match={match} />
              ))}
        </div>
      )}
      {error && (
        <>
          <div className="flex flex-col text-center items-center scale-90 justify-center mt-8 h-[50vh]">
            <p className="text-lg text-white font-bold">
              Please log in to view your preferred games.
            </p>
            <button
              onClick={handleLoginRedirect}
              className="mt-4 px-6 py-3 bg-[#561e70] text-[#D1CCB6] rounded-lg hover:bg-[#7a2a9e] transition duration-300"
            >
              Go to Profile Page
            </button>
          </div>
        </>
      )}
      {!error && currentMatches.length === 0 && (
        <div className="flex items-center justify-center h-[40vh] mt-8">
          <p className="text-lg text-white font-bold">
            No ongoing matches available.
          </p>
        </div>
      )}
      <div className="text-3xl text-white font-bold mt-8">
        --- PAST MATCHES ---
      </div>
      <GameDetailsCarousel pastData={pastData} />
    </div>
  );
}

export default LiveScore;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import CardLiveScore from "../components/CardLiveScore";
import CardLiveScoreRev from "../components/CardLiveScoreRev";
import Filter from "../components/CategoryFilter";
import Loading from "./Loading.jsx";
import GameDetails from "../components/PastScore.jsx";

const GameDetailsCarousel = ({ pastData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(20);
  const [filteredData, setFilteredData] = useState([]);
  const scrollRef = useRef(null);
  const dateScrollRef = useRef(null);

  const dates = Array.from({ length: 10 }, (_, i) => i + 20);

  useEffect(() => {
    const filtered = pastData.filter((game) => {
      return game.date === selectedDate;
    });

    setFilteredData(filtered);
    setActiveIndex(0);
  }, [selectedDate, pastData]);

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
          className="flex items-center space-x-4 overflow-x-auto scrollbar-hide justify-center py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
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

      {filteredData.length > 0 ? (
        <div className="relative w-full max-w-5xl overflow-hidden">
          <div
            ref={scrollRef}
            className="flex items-center space-x-8 overflow-x-auto scrollbar-hide p-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredData.map((game, index) => (
              <div
                key={game.matchId}
                className={`cursor-pointer transition-all duration-300 ease-in-out flex-shrink-0
                  ${
                    index === activeIndex
                      ? "scale-110 z-10"
                      : "opacity-70 scale-100"
                  }`}
                onClick={() => setActiveIndex(index)}
              >
                <GameDetails game={game} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-white font-bold mt-8">
          No games available for the selected date ({selectedDate}).
        </p>
      )}

      {filteredData.length > 0 && (
        <div className="flex mt-4 space-x-2">
          {filteredData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
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
  const [matchEndedToggle,setToggle] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [preferredGames, setPreferredGames] = useState([]);
  const [pastData, setPastData] = useState([]);

  useEffect(() => {
    const fetchPastData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=JTJ4LwbwSCR-o40RCZmpfne5uVrsXYgXYCYQ6AL7zbnFTVswINe-nrIIc41b1OYHBlcMbn5fNN9w9dRZqs044MDf6EIiK7eIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHXM8UK8MLQPH086wB9rYSFS64HKSPWSNSjmOwqyula0l8_PzbiQihbZ__gGnui-iXZ7434h5jJtysdJqtxHDH6pzhEt0zM_aQ&lib=MsEWv3u50V40rNs-NhmOoyewdQIJKHz_I"
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
    <div className="flex flex-col min-w-[320px] w-full mx-auto justify-center mt-8">
      <div className="flex flex-row gap-[20vw] justify-center">
        <Filter
          options={["PREFERRED GAMES"]}
          title="SELECT EVENT"
          isSingle={true}
          onCategoryChange={handleChange}
        />
      </div>

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
      {error && (
        <>
          <div className="text-center mt-8">
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
        <p className="text-lg text-white font-bold mt-8">
          No ongoing matches available.
        </p>
      )}
      <div className="text-3xl text-white font-bold mt-8">
        --- PAST SCORES ---
      </div>
      <GameDetailsCarousel pastData={pastData} />
    </div>
  );
}

export default LiveScore;
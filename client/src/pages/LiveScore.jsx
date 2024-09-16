import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import CardLiveScore from "../components/CardLiveScore";
import CardLiveScoreRev from "../components/CardLiveScoreRev";
import Filter from "../components/CategoryFilter";
import Loading from "./Loading.jsx";

function LiveScore() {
  const [currentMatches, setCurrentMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState("SELECT ALL");
  const [socket, setSocket] = useState(null);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [preferredGames, setPreferredGames] = useState([]);

  const handleLoginRedirect = () => {
    navigate("/profile");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data: user } = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "profile",
          {
            withCredentials: true,
          }
        );

        // Assuming user.interested_in is an array of objects with type field
        const sportsOnly = user.interested_in.filter(
          (item) => item.type === "sport"
        );
        setPreferredGames(sportsOnly.map((sport) => sport.name)); // Assuming `name` holds the sport names
        setAuth(true); // Set authenticated if fetch is successful
      } catch (error) {
        console.error("Error fetching user details:", error);
        setAuth(false); // Not authenticated in case of error
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
    <div className="flex flex-col min-w-[320px] w-full mx-auto justify-center">
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
          <div className="text-center p-4">
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
        <div className="bg-[#6539BA] flex w-fit rounded-xl mx-auto m-4">
          <p className="text-[#D1CCB6] font-extrabold p-2">
            No ongoing matches........
          </p>
        </div>
      )}
    </div>
  );
}

export default LiveScore;
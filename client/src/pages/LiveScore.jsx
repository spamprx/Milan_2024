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
  const [selectedSport, setSelectedSport] = useState("Select All");
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const eventOptions = [
    "CRICKET",
    "FOOTBALL",
    "HOCKEY",
    "VOLLEYBALL",
    "BASKETBALL",
    "BADMINTON",
    "TENNIS",
    "TABLE TENNIS",
    "CARROM",
    "CHESS",
    "SQUASH",
    "WEIGHTLIFTING",
    "POWER LIFTING",
    "ATHLETICS",
  ];

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
    if (selectedSport === "Select All") {
      setCurrentMatches(liveMatches);
    } else {
      const matches = liveMatches.filter(
        (match) => match.sport.toUpperCase() === selectedSport
      );
      setCurrentMatches(matches);
    }
  }, [liveMatches, selectedSport]);

  const handleSportChange = (sport) => {
    setSelectedSport(sport);
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
          options={eventOptions}
          title="SELECT EVENT"
          isSingle={true}
          onCategoryChange={handleSportChange}
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

      {currentMatches.length === 0 && (
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

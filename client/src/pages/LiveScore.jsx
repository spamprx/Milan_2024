import React, { useState, useEffect } from "react";
import axios from "axios";
import CardLiveScore from "../components/CardLiveScore";
import CardLiveScoreRev from "../components/CardLiveScoreRev";
import Filter from "../components/CategoryFilter";

function LiveScore() {
  const [currentMatches, setCurrentMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState("ALL");

  const eventOptions = [
    "ALL",
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
        "http://localhost:5000/api/live-matches"
      );
      console.log("Live matches:", response.data);
      setLiveMatches(response.data);
    } catch (error) {
      console.error("Error fetching live matches:", error);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
    const intervalId = setInterval(fetchLiveMatches, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (selectedSport === "ALL") {
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
                <CardLiveScore key={index} match={match} />
              ) : (
                <CardLiveScoreRev key={index} match={match} />
              )
            )
          : currentMatches.map((match, index) => (
              <CardLiveScore key={index} match={match} />
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
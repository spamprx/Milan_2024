import React, { useState, useEffect } from "react";
import axios from "axios";
import CardLiveScore from "../components/CardLiveScore";
import CardLiveScoreRev from "../components/CardLiveScoreRev";
import Filter from "../components/CategoryFilter";

function LiveScore() {
  const [currentMatches, setCurrentMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [selectedSport, setSelectedSport] = useState("CRICKET");

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
    "ATHLETICS"
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
  }, []);

  useEffect(() => {
    // Process live matches to determine current matches for the selected sport
    const matches = liveMatches.filter(match => match.Sport.toUpperCase() === selectedSport);
    setCurrentMatches(matches);
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
        {currentMatches.map((match, index) => (
          <React.Fragment key={index}>
            <CardLiveScore
              sport={match.Sport}
              team1={match.Team1}
              team2={match.Team2}
            />
            <CardLiveScoreRev
              sport={match.Sport}
              team1={match.Team1}
              team2={match.Team2}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default LiveScore;
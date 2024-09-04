import React, { useState, useEffect } from "react";
import axios from "axios";
import CardLiveScore from "../components/CardLiveScore";
import CardLiveScoreRev from "../components/CardLiveScoreRev";

function LiveScore() {
  const [currentMatches, setCurrentMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);

  const sports = ["Cricket", "Basketball", "Hockey", "Volleyball"];

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
    // Process live matches to determine current matches for each sport
    const matches = liveMatches.reduce((acc, match) => {
      const sport = match.Sport;
      if (!acc[sport]) {
        acc[sport] = match;
      }
      return acc;
    }, {});

    setCurrentMatches(Object.values(matches));
  }, [liveMatches]);

  return (
    <div className="flex flex-col min-w-[340px] w-full mx-auto justify-center">
      <div className="grid grid-cols-1 card-col scale-90 w-full gap-8 justify-items-center">
        {sports.map((match) => (
          <React.Fragment key={match}>
            <CardLiveScore
              sport={match}
              team1={"ARYABHATTA"}
              team2={"BHASKARA"}
            />
            <CardLiveScoreRev
              sport={match}
              team1={"ARYABHATTA"}
              team2={"BHASKARA"}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default LiveScore;

import { useState, useEffect } from "react";
import getScoresJSON from "./scorejson";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ScoresDisplay = () => {
  const [funScores, setFunScores] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    socket.on("initialScores", (initialScores) => {
      setScores(initialScores);
    });

    socket.on("scoreUpdate", (updatedScore) => {
      console.log("Received updated score:", updatedScore);
      setScores((prevScores) => {
        const index = prevScores.findIndex(
          (score) => score["S.no"] === updatedScore["S.no"]
        );
        if (index !== -1) {
          return prevScores.map((score) =>
            score["S.no"] === updatedScore["S.no"] ? updatedScore : score
          );
        } else {
          return [...prevScores, updatedScore];
        }
      });
    });

    return () => {
      socket.off("initialScores");
      socket.off("scoreUpdate");
    };
  }, []);
  useEffect(() => {
    getScoresJSON()
      .then((scores) => {
        setFunScores(scores);
        console.log("Function");
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      });
  }, []);
  const scoresJSON = JSON.stringify(scores, null, 2);

  return (
    <div>
      <h1>Live Scores (JSON)</h1>
      <pre>{scoresJSON}</pre>
      <pre>{funScores}</pre>
    </div>
  );
};

export default ScoresDisplay;

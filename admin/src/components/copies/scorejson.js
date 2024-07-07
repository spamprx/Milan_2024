import io from "socket.io-client";

function getScoresJSON(socketUrl = "http://localhost:5000", timeout = 30000) {
  return new Promise((resolve, reject) => {
    const socket = io(socketUrl);
    let scores = [];
    let timer;

    function cleanup() {
      clearTimeout(timer);
      socket.off("initialScores");
      socket.off("scoreUpdate");
      socket.disconnect();
    }

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("initialScores", (initialScores) => {
      console.log("Received initial scores:", initialScores);
      scores = initialScores;
    });

    socket.on("scoreUpdate", (updatedScore) => {
      console.log("Received updated score:", updatedScore);
      const index = scores.findIndex(
        (score) => score["S.no"] === updatedScore["S.no"]
      );
      if (index !== -1) {
        scores = scores.map((score) =>
          score["S.no"] === updatedScore["S.no"] ? updatedScore : score
        );
      } else {
        scores.push(updatedScore);
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      cleanup();
      reject(new Error(`Connection error: ${error.message}`));
    });

    timer = setTimeout(() => {
      cleanup();
      console.log("Resolving with scores:", scores);
      resolve(scores);
    }, timeout);
  });
}

export default getScoresJSON;

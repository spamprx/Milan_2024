const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://leaderboard-milan-client.vercel.app",
      "https://leaderboard-milan-admin.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: [
      "https://leaderboard-milan-client.vercel.app",
      "https://leaderboard-milan-admin.vercel.app",
    ],
  })
);

app.use(express.json());

let matches = [];
let sportCounters = {};
let endedMatches = [];

const getLiveMatches = () => {
  return matches.map((match) => ({
    matchId: match.matchId,
    sport: match.sport,
    team1: match.team1,
    team2: match.team2,
    score1: match.score1 || "0",
    score2: match.score2 || "0",
    wicket1: match.wicket1,
    wicket2: match.wicket2,
    over1: match.over1,
    over2: match.over2,
    startTime: match.startTime,
  }));
};

// API to get all matches
app.get("/api/matches", (req, res) => {
  res.json(matches);
});

// API to get live matches
app.get("/api/live-matches", (req, res) => {
  const liveMatches = getLiveMatches();
  res.json(liveMatches);
});

// API to get ended matches
app.get("/api/ended-matches", (req, res) => {
  res.json(endedMatches);
});

// API to add a new match
app.post("/api/add-match", (req, res) => {
  const newMatch = req.body;
  console.log("Received new match data:", newMatch);

  if (
    !newMatch.team1 ||
    !newMatch.team2 ||
    !newMatch.startTime ||
    !newMatch.sport
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid match data" });
  }

  const sportPrefix = newMatch.sport.toUpperCase();
  if (!sportCounters[sportPrefix]) {
    sportCounters[sportPrefix] = 1;
  } else {
    sportCounters[sportPrefix]++;
  }
  newMatch.matchId = `${sportPrefix}${sportCounters[sportPrefix]}`;

  console.log("Generated match ID:", newMatch.matchId);

  matches.push(newMatch);
  io.emit("newMatch", newMatch);
  res.json({ success: true, match: newMatch });
});

// API to update a match score
app.post("/api/update-score", (req, res) => {
  const scoreData = req.body;
  console.log("Received score update:", scoreData);

  const index = matches.findIndex(
    (match) => match.matchId === scoreData.matchId
  );
  console.log("Match index:", index);
  if (index !== -1) {
    matches[index] = { ...matches[index], ...scoreData };
    console.log("Updated match:", matches[index]);
    io.emit("scoreUpdate", matches[index]);
    res.json({ success: true, match: matches[index] });
  } else {
    console.log("Match not found for ID:", scoreData.matchId);
    res.status(404).json({ success: false, message: "Match not found" });
  }
});

// API to end a match
app.post("/api/end-match/:matchId", (req, res) => {
  const { matchId } = req.params;
  const index = matches.findIndex((match) => match.matchId === matchId);
  if (index !== -1) {
    const endedMatch = matches.splice(index, 1)[0];
    endedMatches.push(endedMatch);
    io.emit("matchEnded", endedMatch);
    res.json({ success: true, match: endedMatch });
  } else {
    res.status(404).json({ success: false, message: "Match not found" });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("initialMatches", matches);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000"; // Ensure HTTP, not HTTPS

const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

// Helper function to format time to display only hours and minutes
const formatTimeToHHMM = (dateTimeString) => {
  if (!dateTimeString) return "";
  return dateTimeString.slice(11, 16); // Extracts HH:MM from "YYYY-MM-DDTHH:MM"
};

const AdminPortal = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [newMatchData, setNewMatchData] = useState({
    sport: "football",
    team1: "",
    team2: "",
    startTime: "",
  });
  const [matchData, setMatchData] = useState({
    score1: "",
    score2: "",
    wicket1: "",
    wicket2: "",
    over1: "",
    over2: "",
  });

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/matches`);
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchMatches(); // Fetch matches periodically
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewMatchChange = (e) => {
    const { name, value } = e.target;
    setNewMatchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMatch) {
      alert("Please select a match first");
      return;
    }
    try {
      const updatedMatchData = {
        ...matchData,
        matchId: selectedMatch.matchId,
      };
      const response = await axios.post(
        `${BACKEND_URL}/api/update-score`,
        updatedMatchData
      );
      console.log("Server response:", response.data);
      alert("Score updated successfully");
      setSelectedMatch(null);
    } catch (error) {
      console.error("Error updating score:", error);
      alert("Error updating score");
    }
  };

  const handleAddMatch = async (e) => {
    e.preventDefault();
    try {
      const formattedNewMatchData = {
        ...newMatchData,
        sport: capitalizeFirstLetter(newMatchData.sport),
      };
      const response = await axios.post(
        `${BACKEND_URL}/api/add-match`,
        formattedNewMatchData
      );
      console.log("Server response:", response.data);
      alert(`Match added successfully with ID: ${response.data.match.matchId}`);
      setNewMatchData({
        sport: "football",
        team1: "",
        team2: "",
        startTime: "",
      });
    } catch (error) {
      console.error("Error adding match:", error);
      alert("Error adding match");
    }
  };

  const handleEndMatch = async (matchId) => {
    try {
      await axios.post(`${BACKEND_URL}/api/end-match/${matchId}`);
      alert("Match ended successfully");
      setSelectedMatch(null);
    } catch (error) {
      console.error("Error ending match:", error);
      alert("Error ending match");
    }
  };

  return (
    <div>
      <h1>Admin Portal</h1>

      <h2>Add New Match</h2>
      <form onSubmit={handleAddMatch}>
        <select
          name="sport"
          value={newMatchData.sport}
          onChange={handleNewMatchChange}
          required
        >
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
          <option value="basketball">Basketball</option>
          <option value="tennis">Tennis</option>
          <option value="badminton">Badminton</option>
          <option value="hockey">Hockey</option>
          <option value="table-tennis">Table Tennis</option>
          <option value="volleyball">Volleyball</option>
          <option value="squash">Squash</option>
        </select>
        <input
          type="text"
          name="team1"
          value={newMatchData.team1}
          onChange={handleNewMatchChange}
          placeholder="Team 1"
          required
        />
        <input
          type="text"
          name="team2"
          value={newMatchData.team2}
          onChange={handleNewMatchChange}
          placeholder="Team 2"
          required
        />
        <input
          type="datetime-local"
          name="startTime"
          value={newMatchData.startTime}
          onChange={handleNewMatchChange}
          required
        />
        <button type="submit">Add Match</button>
      </form>

      <h2>Ongoing Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.matchId} onClick={() => setSelectedMatch(match)}>
            {match.team1} vs {match.team2} - {match.sport} - Time:{" "}
            {formatTimeToHHMM(match.startTime)} (ID: {match.matchId})
          </li>
        ))}
      </ul>

      {selectedMatch && (
        <div>
          <h2>
            Update Score for {selectedMatch.team1} vs {selectedMatch.team2}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="score1"
              value={matchData.score1}
              onChange={handleChange}
              placeholder="Score 1"
              required
            />
            <input
              type="text"
              name="score2"
              value={matchData.score2}
              onChange={handleChange}
              placeholder="Score 2"
              required
            />
            {selectedMatch.sport === "Cricket" && (
              <>
                <input
                  type="text"
                  name="wicket1"
                  value={matchData.wicket1}
                  onChange={handleChange}
                  placeholder="Wickets 1"
                />
                <input
                  type="text"
                  name="wicket2"
                  value={matchData.wicket2}
                  onChange={handleChange}
                  placeholder="Wickets 2"
                />
                <input
                  type="text"
                  name="over1"
                  value={matchData.over1}
                  onChange={handleChange}
                  placeholder="Overs 1"
                />
                <input
                  type="text"
                  name="over2"
                  value={matchData.over2}
                  onChange={handleChange}
                  placeholder="Overs 2"
                />
              </>
            )}
            <button type="submit">Update Score</button>
          </form>
          <button onClick={() => handleEndMatch(selectedMatch.matchId)}>
            End Match
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
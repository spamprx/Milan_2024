import { useState } from "react";
import axios from "axios";

const AdminPortal = () => {
  const [matchData, setMatchData] = useState({
    matchId: "",
    sport: "football",
    team1: "",
    team2: "",
    score1: "",
    score2: "",
    wicket1: "",
    wicket2: "",
    over1: "",
    over2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/update-score",
        matchData
      );
      console.log("Server response:", response.data);
      alert("Score updated successfully");
      setMatchData({
        matchId: "",
        sport: "football",
        team1: "",
        team2: "",
        score1: "",
        score2: "",
        wicket1: "",
        wicket2: "",
        over1: "",
        over2: "",
      });
    } catch (error) {
      console.error("Error updating score:", error);
      alert("Error updating score");
    }
  };

  return (
    <div>
      <h1>Admin Portal</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="sport"
          value={matchData.sport}
          onChange={handleChange}
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
          name="matchId"
          value={matchData.matchId}
          onChange={handleChange}
          placeholder="Match ID"
          required
        />
        <input
          type="text"
          name="team1"
          value={matchData.team1}
          onChange={handleChange}
          placeholder="Team 1"
          required
        />
        <input
          type="text"
          name="team2"
          value={matchData.team2}
          onChange={handleChange}
          placeholder="Team 2"
          required
        />
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
        {matchData.sport === "cricket" && (
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
    </div>
  );
};

export default AdminPortal;

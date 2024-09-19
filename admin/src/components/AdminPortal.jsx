import { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = "https://backend-w6vj.onrender.com";

const capitalizeFirstLetter = (string) => {
  if (!string) return "";

  return string
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join("_"); // Join the words with underscores
};

const formatTimeToHHMM = (dateTimeString) => {
  if (!dateTimeString) return "";
  return dateTimeString.slice(11, 16);
};

const sportExtras = {
  Badminton: "Sets",
  Basketball: "Fouls",
  Cricket: "Wickets",
  Dodgeball: "Fouls",
  Football: "Fouls",
  Hockey: "Quarters",
  Table_tennis: "Sets",
  Tennis: "Sets",
  Squash: "",
  Volleyball: "Sets",
};

const blocks = [
  "ANANDI",
  "ARYABHATTA",
  "BHABHA",
  "BHASKARA",
  "BR/VY",
  "CH/KAU",
  "GARGI",
  "KALAM",
  "KAPILA",
  "MAITREYI",
  "RAMAN",
  "RAMANUJA",
  "RAMANUJAN",
  "SARABHAI",
  "SAROJINI NAIDU",
  "SN BOSE",
  "SUS/VAR",
  "VISWESWARAYA",
  "VIVEKANANDA",
];

const AdminPortal = () => {
  const [category, setCategory] = useState("SPORTS");
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [newMatchData, setNewMatchData] = useState({
    sport: "football",
    score1: "00",
    score2: "00",
    team1: "",
    team2: "",
    startTime: "",
    winner: "",
  });
  const [matchData, setMatchData] = useState({
    score1: "00",
    score2: "00",
    extra1: "00",
    extra2: "00",
    extra: "",
    winner: "",
  });
  const [eventData, setEventData] = useState({
    name: "",
    winner: "",
    second: "",
    third: "",
    startTime: "",
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

    fetchMatches();

    const intervalId = setInterval(() => {
      fetchMatches();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewMatchChange = (e) => {
    const { name, value } = e.target;
    setNewMatchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewCultiChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewTechyChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
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
      alert(
        `Match/Event added successfully with ID: ${response.data.match.matchId}`
      );
      setNewMatchData({
        sport: category === "SPORTS" ? "football" : "",
        team1: "",
        team2: "",
        startTime: "",
        winner: "",
      });
    } catch (error) {
      console.error("Error adding match/event:", error);
      alert("Error adding match/event");
    }
  };

  const handleEndMatch = async (matchId) => {
    const winner = prompt("Enter the winner of the match:");
    if (!winner) return;
    try {
      await axios.post(`${BACKEND_URL}/api/end-match/${matchId}`, { winner });
      alert("Match ended successfully");
      setSelectedMatch(null);
    } catch (error) {
      console.error("Error ending match:", error);
      alert("Error ending match");
    }
  };

  const handleAddCulti = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/add-culti`,
        eventData
      );
      console.log("Server response:", response.data);
      alert("Culti Event added successfully");
      setEventData({
        name: "",
        winner: "",
        second: "",
        third: "",
        startTime: "",
      });
    } catch (error) {
      console.error("Error adding culti event:", error);
      alert("Error adding culti event");
    }
  };

  const handleAddTechy = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/add-techy`,
        eventData
      );
      console.log("Server response:", response.data);
      alert("Techy Event added successfully");
      setEventData({
        name: "",
        winner: "",
        second: "",
        third: "",
        startTime: "",
      });
    } catch (error) {
      console.error("Error adding techy event:", error);
      alert("Error adding techy event");
    }
  }
  const renderSportsForm = () => (
    <form onSubmit={handleAddMatch} className="">
      <select
        name="sport"
        value={newMatchData.sport}
        onChange={handleNewMatchChange}
        required
      >
        <option value="badminton">Badminton</option>
        <option value="basketball">Basketball</option>
        <option value="cricket">Cricket</option>
        <option value="dodgeball">Dodgeball</option>
        <option value="football">Football</option>
        <option value="hockey">Hockey</option>
        <option value="table_tennis">Table Tennis</option>
        <option value="tennis">Tennis</option>
        <option value="squash">Squash</option>
        <option value="volleyball">Volleyball</option>
      </select>
      <select
        name="team1"
        value={newMatchData.team1}
        onChange={handleNewMatchChange}
        required
      >
        <option value="" disabled>
          Select Team 1
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <select
        name="team2"
        value={newMatchData.team2}
        onChange={handleNewMatchChange}
        required
      >
        <option value="" disabled>
          Select Team 2
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        name="startTime"
        value={newMatchData.startTime}
        onChange={handleNewMatchChange}
        required
      />
      <button type="submit">Add Match</button>
    </form>
  );

  const renderCulturalsForm = () => (
    <form onSubmit={handleAddCulti} className="">
      <select
        name="name"
        value={eventData.name}
        onChange={handleNewCultiChange}
        required
      >
        <option value="" disabled>
          Select Cultural Event
        </option>
        <option value="solo-dance">Solo Dance</option>
        <option value="duo-trio-dance">Duo Trio Dance</option>
        <option value="group-dance">Group Dance</option>
        <option value="street-battle">Street Battle</option>
        <option value="film-making">Film Making (75 hours)</option>
        <option value="make-it-short">Make it short</option>
        <option value="ad-making">Ad making</option>
        <option value="theme-photography">Theme based photography</option>
        <option value="photo-story">Photo story challenge</option>
        <option value="live-photo">Live photo challenge</option>
        <option value="stage-play">Stage play</option>
        <option value="achanak-se">Achanak se points badal diye</option>
        <option value="stand-up">Stand up</option>
        <option value="graffiti">Graffiti painting</option>
        <option value="clay-modelling">Clay modelling</option>
        <option value="weave-a-tale">Weave-a-tale</option>
        <option value="english-poetry">English Poetry Writing</option>
        <option value="general-quiz">General Quiz</option>
        <option value="scrabble">Scrabble</option>
        <option value="treasure-hunt">Treasure hunt</option>
        <option value="british-parliamentary">British Parliamentary</option>
        <option value="bmc-pictionary">BMC Pictionary</option>
        <option value="codenames">Codenames</option>
        <option value="solo-singing">Solo Singing</option>
        <option value="freestyle">Freestyle</option>
        <option value="antakshari">Antakshari</option>
        <option value="battle-of-bands">Battle of Bands</option>
        <option value="cosplay-showdown">Cosplay Showdown</option>
        <option value="animanga-quiz">Animanga Quiz</option>
      </select>
      <select
        name="winner"
        value={eventData.winner}
        onChange={handleNewCultiChange}
        required
      >
        <option value="" disabled>
          First Place
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <select
        name="second"
        value={eventData.second}
        onChange={handleNewCultiChange}
        required
      >
        <option value="" disabled>
          Second Place
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <select
        name="third"
        value={eventData.third}
        onChange={handleNewCultiChange}
        required
      >
        <option value="" disabled>
          Third Place
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        name="startTime"
        value={eventData.startTime}
        onChange={handleNewCultiChange}
        required
      />
      <button type="submit">Add Culti Event</button>
    </form>
  );

  const renderSciTechForm = () => (
    <form onSubmit={handleAddTechy} className="">
      <select
        name="name"
        value={eventData.name}
        onChange={handleNewTechyChange}
        required
      >
        <option value="" disabled>
          Select Sci-Tech Event
        </option>
        <option value="hackathon-lambda">Hackathon (Lambda)</option>
        <option value="drop-the-egg">Drop the Egg challenge</option>
        <option value="water-rocketry">Water Rocketry</option>
        <option value="gridlock">Gridlock</option>
        <option value="milan-ctf24">Milan CTF24</option>
        <option value="astro-photography">Astro Photography Competition</option>
        <option value="quiz-competition">Quiz Competition</option>
        <option value="hackathon-prakriti">Hackathon (Prakriti)</option>
        <option value="elektronica">Elektronica</option>
        <option value="inverted-pendulum">Inverted Pendulum</option>
        <option value="esports-gamedev">Esports and Gamedev</option>
        <option value="clash-royale">Clash Royale</option>
        <option value="bgmi">BGMI</option>
        <option value="valorant">Valorant</option>
        <option value="cod-m">COD-M</option>
      </select>
      <select
        name="winner"
        value={eventData.winner}
        onChange={handleNewTechyChange}
        required
      >
        <option value="" disabled>
          First Place
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <select
        name="second"
        value={eventData.second}
        onChange={handleNewTechyChange}
        required
      >
        <option value="" disabled>
          Second Place
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <select
        name="third"
        value={eventData.third}
        onChange={handleNewTechyChange}
        required
      >
        <option value="" disabled>
          Third Place
        </option>
        {blocks.map((block) => (
          <option key={block} value={block}>
            {block}
          </option>
        ))}
      </select>
      <input
        type="datetime-local"
        name="startTime"
        value={eventData.startTime}
        onChange={handleNewTechyChange}
        required
      />
      <button type="submit">Add Techy Event</button>
    </form>
  );

  const renderForm = () => {
    switch (category) {
      case "SPORTS":
        return renderSportsForm();
      case "CULTURALS":
        return renderCulturalsForm();
      case "SCI-TECH":
        return renderSciTechForm();
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Admin Portal</h1>

      <button onClick={() => setCategory("SPORTS")}>SPORTS</button>
      <button onClick={() => setCategory("CULTURALS")}>CULTURALS</button>
      <button onClick={() => setCategory("SCI-TECH")}>SCI-TECH</button>

      <div>
        <h2>Add New {category === "SPORTS" ? "Match" : "Event"}</h2>
        {renderForm()}
      </div>

      <h2>Ongoing {category === "SPORTS" ? "Matches" : "Events"}</h2>
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
            <input
              type="text"
              name="extra1"
              value={matchData.extra1}
              onChange={handleChange}
              placeholder={matchData.extra}
            />
            <input
              type="text"
              name="extra2"
              value={matchData.extra2}
              onChange={handleChange}
              placeholder={matchData.extra}
            />
            <button type="submit">Update Score</button>
          </form>
          <button onClick={() => handleEndMatch(selectedMatch.matchId)}>
            End {category === "SPORTS" ? "Match" : "Event"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
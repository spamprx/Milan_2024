import React, { useState, useEffect, useRef, useCallback } from "react";
import { startOfToday, format, isSameDay } from "date-fns";
import axios from "axios";
import Dates from "../components/Dates.jsx";
import EventList from "../components/Eventlist.jsx";
import GameDetails from "../components/Gamedetails.jsx";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function Calendar() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const detailsRef = useRef(null);
  const calendarRef = useRef(null);
  const [calendarHeight, setCalendarHeight] = useState(0);
  const [userPreferredGames, setUserPreferredGames] = useState([]);
  const [preferredTeams, setPreferredTeams] = useState([]);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const cachedData = localStorage.getItem('calendarData');
      const cachedTimestamp = localStorage.getItem('calendarDataTimestamp');

      if (cachedData && cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < CACHE_DURATION) {
        const parsedData = JSON.parse(cachedData);
        setGames(parsedData.games);
        setUserPreferredGames(parsedData.userPreferredGames);
        setPreferredTeams(parsedData.preferredTeams);
        setAuth(true);
        setIsLoading(false);
        return;
      }

      const [userResponse, gamesResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}profile`, { withCredentials: true }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}eventsSchedule`)
      ]);

      const userData = userResponse.data.user;
      const userPreferredGames = userData.interested_in || [];
      const preferredTeams = userData.Block ? [userData.Block] : [];

      const gamesData = gamesResponse.data;
      if (gamesData && Object.keys(gamesData).length > 0) {
        const loadedGames = Object.entries(gamesData).flatMap(([date, events]) =>
          events.map((event, index) => ({
            ...event,
            id: `${event.title}_${event.time}_${event.teams}_${index}`,
            startDatetime: new Date(`${date}T${event.time}`),
            endDatetime: new Date(`${date}T${event.time}`),
            date: new Date(date),
            notificationEnabled: localStorage.getItem(`notification_${event.title}_${event.time}_${event.teams}_${index}_${date}`) === 'true'
          }))
        );

        setGames(loadedGames);
        setUserPreferredGames(userPreferredGames);
        setPreferredTeams(preferredTeams);
        setAuth(true);

        localStorage.setItem('calendarData', JSON.stringify({
          games: loadedGames,
          userPreferredGames,
          preferredTeams
        }));
        localStorage.setItem('calendarDataTimestamp', Date.now().toString());
      } else {
        throw new Error("No data received or unexpected format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch calendar data. Please try again later.");
      setAuth(false);
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendarHeight(calendarRef.current.clientHeight);
    }
  }, [currentMonth]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setSelectedGame(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationToggle = useCallback((updatedGame) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === updatedGame.id
          ? { ...game, notificationEnabled: updatedGame.notificationEnabled }
          : game
      )
    );
    localStorage.setItem(`notification_${updatedGame.id}_${updatedGame.date}`, updatedGame.notificationEnabled.toString());
  }, []);

  const selectedDayMeetings = games.filter((game) => isSameDay(game.date, selectedDay));

  const preferredMeetings = selectedDayMeetings.filter(
    (meeting) =>
      userPreferredGames.includes(meeting.title.toLowerCase()) ||
      preferredTeams.some((team) => meeting.teams.toLowerCase().includes(team.toLowerCase())) ||
      meeting.teams.toLowerCase().includes("all blocks")
  );

  const otherMeetings = selectedDayMeetings.filter(
    (meeting) => !preferredMeetings.includes(meeting)
  );

  const handleGameSelect = useCallback((game) => {
    setSelectedGame(game);
  }, []);

  const handleLoginRedirect = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="scroll-smooth pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-7xl md:px-6">
        <div className="lg:flex lg:space-x-8">
          <div className="lg:w-1/3">
            <Dates
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              games={games}
              calendarRef={calendarRef}
              userPreferredGames={userPreferredGames}
              preferredTeams={preferredTeams}
            />
          </div>
          <div className="lg:w-2/3">
            {auth ? (
              <EventList
                preferredMeetings={preferredMeetings}
                otherMeetings={otherMeetings}
                onGameSelect={handleGameSelect}
                calendarHeight={calendarHeight}
                selectedDay={selectedDay}
                userPreferredGames={userPreferredGames}
                preferredTeams={preferredTeams}
                onNotificationToggle={handleNotificationToggle}
              />
            ) : (
              <EventList
                showError={true}
                handleLoginRedirect={handleLoginRedirect}
                preferredMeetings={[]}
                otherMeetings={selectedDayMeetings}
                onGameSelect={handleGameSelect}
                calendarHeight={calendarHeight}
                selectedDay={selectedDay}
                userPreferredGames={[]}
                preferredTeams={[]}
                onNotificationToggle={handleNotificationToggle}
              />
            )}
          </div>
        </div>

        <div className="my-8 border-t-2 border-gray-300"></div>

        {auth && selectedGame && (
          <GameDetails game={selectedGame} ref={detailsRef} />
        )}
      </div>
    </div>
  );
}
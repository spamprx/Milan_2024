import React, { useState, useEffect, useRef, useCallback } from "react";
import { startOfToday, format, isSameDay } from "date-fns";
import axios from "axios";
import Dates from "../components/Dates.jsx";
import EventList from "../components/Eventlist.jsx";
import GameDetails from "../components/Gamedetails.jsx";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx";

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

  const fetchData = useCallback(async () => {
    try {
      const [userResponse, gamesResponse] = await Promise.all([
        axios.get(import.meta.env.VITE_BACKEND_URL + "profile", {
          withCredentials: true,
        }),
        axios.get(import.meta.env.VITE_BACKEND_URL + "eventsSchedule"),
      ]);

      const userData = userResponse.data.user;
      console.log("User Block:", userData.Block);
      setUserPreferredGames(userData.interested_in || []);
      setPreferredTeams(userData.Block ? [userData.Block] : []);
      setAuth(true);

      const data = gamesResponse.data;
      if (data && Object.keys(data).length > 0) {
        const loadedGames = Object.entries(data).flatMap(([date, events]) =>
          events.map((event, index) => {
            const uniqueId = `${event.title}_${event.time}_${event.teams}_${index}`;
            const storageKey = `notification_${uniqueId}_${date}`;
            const storedNotificationState = localStorage.getItem(storageKey);
            const isPreferred =
              userPreferredGames.includes(event.title.toLowerCase()) ||
              preferredTeams.some((team) =>
                event.teams.toLowerCase().includes(team.toLowerCase())
              ) ||
              event.teams.toLowerCase().includes("all blocks");

            const notificationEnabled =
              isPreferred ||
              (storedNotificationState !== null
                ? JSON.parse(storedNotificationState)
                : false);

            return {
              ...event,
              id: uniqueId,
              startDatetime: new Date(date + "T" + event.time),
              endDatetime: new Date(date + "T" + event.time),
              date: new Date(date),
              notificationEnabled: notificationEnabled,
            };
          })
        );
        setGames(loadedGames);
      } else {
        console.error("No data received or unexpected format:", data);
        setGames([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const handleNotificationToggle = (updatedGame) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === updatedGame.id
          ? { ...game, notificationEnabled: updatedGame.notificationEnabled }
          : game
      )
    );
  };

  let selectedDayMeetings = games.filter((game) =>
    isSameDay(game.date, selectedDay)
  );

  let preferredMeetings = selectedDayMeetings.filter(
    (meeting) =>
      userPreferredGames.includes(meeting.title.toLowerCase()) ||
      preferredTeams.some((team) =>
        meeting.teams.toLowerCase().includes(team.toLowerCase())
      ) ||
      meeting.teams.toLowerCase().includes("all blocks")
  );

  let otherMeetings = selectedDayMeetings.filter(
    (meeting) => !preferredMeetings.includes(meeting)
  );

  function handleGameSelect(game) {
    setSelectedGame(game);
  }

  const handleLoginRedirect = () => {
    navigate("/profile");
  };

  if (isLoading) {
    return <Loading />;
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
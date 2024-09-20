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
    setIsLoading(true);
    try {
      // First, fetch the games
      const gamesResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + "eventsSchedule");
      const gamesData = gamesResponse.data;

      if (gamesData && Object.keys(gamesData).length > 0) {
        const loadedGames = Object.entries(gamesData).flatMap(([date, events]) =>
          events.map((event, index) => {
            const uniqueId = `${event.title}_${event.time}_${event.teams}_${index}`;
            // const storageKey = `notification_${uniqueId}_${date}`;
            // const storedNotificationState = localStorage.getItem(storageKey);

            return {
              ...event,
              id: uniqueId,
              startDatetime: new Date(date + "T" + event.time),
              endDatetime: new Date(date + "T" + event.time),
              date: new Date(date),
              // notificationEnabled: storedNotificationState !== null ? JSON.parse(storedNotificationState) : false,
            };
          })
        );
        setGames(loadedGames);
      } else {
        console.error("No game data received or unexpected format:", gamesData);
        setGames([]);
      }

      // Then, try to fetch the user profile
      try {
        const userResponse = await axios.get(import.meta.env.VITE_BACKEND_URL + "profile", {
          withCredentials: true,
        });
        const userAddedGames = await axios.get(import.meta.env.VITE_BACKEND_URL + "added_events", {
          withCredentials: true,
        }
        );
        const removedGames = await axios.get(import.meta.env.VITE_BACKEND_URL + "removed_events", {
          withCredentials: true,
        });
        
        const userData = userResponse.data.user;
        setUserPreferredGames(userData.interested_in || []);
        setPreferredTeams(userData.Block ? [userData.Block] : []);
        setAuth(true);

        // Update games with preferred status
        setGames(prevGames => prevGames.map(game => {
          const gameTeamsArray = game.teams.toLowerCase().split(', ').map(team => team.trim());
          
          const isGameAdded = userAddedGames.data.some(addedGame =>{
            return addedGame.summary.includes(game.title) &&
            addedGame.description.toLowerCase().includes(gameTeamsArray.join(' vs '))
          }
          );
          

          const isGameRemoved = removedGames.data.some(removedGame =>{
            // console.log(removedGame.summary, game.title,removedGame.summary.includes(game.title), removedGame.description, gameTeamsArray.join(' vs '),removedGame.description.toLowerCase().includes(gameTeamsArray.join(' vs ')));
            return removedGame.summary.includes(game.title) &&
            removedGame.description.toLowerCase().includes(gameTeamsArray.join(' vs '))
          }
          );
          

          return {
            ...game,
            isPreferred:
              userPreferredGames.includes(game.title.toLowerCase()) && (
                preferredTeams.some(team => gameTeamsArray.includes(team.toLowerCase())) ||
                game.teams.toLowerCase().includes("all blocks")),
            notificationEnabled: isGameAdded || (game.isPreferred && !isGameRemoved),
          };
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setAuth(false);
        // Keep the games as they are, without preferred status
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      setGames([]);
      setAuth(false);
    } finally {
      setIsLoading(false);
    }
  },[]);

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

  let preferredMeetings = auth ? selectedDayMeetings.filter(
    (meeting) => {
      const teams = meeting.teams ? meeting.teams.toLowerCase().split(", ").map(team=>team.trim()) : [];
      return userPreferredGames.includes(meeting.title.toLowerCase()) &&
        (preferredTeams.some((team) =>
          teams.includes(team.toLowerCase())
        ) ||
          meeting.teams.toLowerCase().includes("all blocks"))
    }
  ) : [];

  let otherMeetings = auth ? selectedDayMeetings.filter(
    (meeting) => !preferredMeetings.includes(meeting)
  ) : selectedDayMeetings;

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
                auth={auth}
                showError={false}
                handleLoginRedirect={handleLoginRedirect}
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
                auth={auth}
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

        {selectedGame && (
          <GameDetails game={selectedGame} ref={detailsRef} />
        )}
      </div>
    </div>
  );
}

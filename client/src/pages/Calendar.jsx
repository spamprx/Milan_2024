import React, { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    const fetchUserDetails = axios.get(
      import.meta.env.VITE_BACKEND_URL + "profile",
      {
        withCredentials: true,
      }
    );

    const fetchGamesData = axios.get(
      import.meta.env.VITE_BACKEND_URL + "eventsSchedule");

    Promise.all([fetchUserDetails, fetchGamesData])
      .then(([userResponse, gamesResponse]) => {
        // Handle user data
        const userData = userResponse.data.user;
        setUserPreferredGames(userData.interested_in || []);
        setPreferredTeams(userData.Block ? [userData.Block] : []);
        setAuth(true);

        // Handle games data
        const data = gamesResponse.data;
        if (data && Object.keys(data).length > 0) {
          const loadedGames = Object.entries(data).flatMap(([date, events]) =>
            events.map((event) => ({
              ...event,
              startDatetime: new Date(date + "T" + event.time),
              endDatetime: new Date(date + "T" + event.time),
              date: new Date(date),
            }))
          );
          setGames(loadedGames);
        } else {
          console.error("No data received or unexpected format:", data);
          setGames([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setAuth(false);
        setGames([]);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when all data is fetched
      });
  }, []);

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

  let selectedDayMeetings = games.filter((game) =>
    isSameDay(game.date, selectedDay)
  );

  let preferredMeetings = selectedDayMeetings.filter(
    (meeting) =>
      userPreferredGames.includes(meeting.title) ||
      preferredTeams.some((team) => meeting.teams.includes(team)) ||
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
    return <Loading />; // Show loading component while data is being fetched
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
              />
            ) : (
              <>
                <EventList
                  showError={true}
                  handleLoginRedirect={handleLoginRedirect}
                  preferredMeetings={[]}
                  otherMeetings={selectedDayMeetings}
                  onGameSelect={handleGameSelect}
                  calendarHeight={calendarHeight}
                  selectedDay={selectedDay}
                />
              </>
            )}
          </div>
        </div>

        <div className="my-8 border-t-2 border-gray-300"></div>

        {/* Preferred games section */}
        {auth ? (
          selectedGame && <GameDetails game={selectedGame} ref={detailsRef} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

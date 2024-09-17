function App() {
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(format(new Date(), "MMM-yyyy"));
  const [games, setGames] = React.useState([]);
  const [selectedGame, setSelectedGame] = React.useState(null);
  const [userPreferredGames, setUserPreferredGames] = React.useState([]);
  const [preferredTeams, setPreferredTeams] = React.useState([]);
  const [auth, setAuth] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, gamesResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}profile`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}eventsSchedule`)
        ]);

        const userData = userResponse.data.user;
        setUserPreferredGames(userData.interested_in || []);
        setPreferredTeams(userData.Block ? [userData.Block] : []);
        setAuth(true);

        const data = gamesResponse.data;
        if (data && Object.keys(data).length > 0) {
          const loadedGames = Object.entries(data).flatMap(([date, events]) =>
            events.map((event, index) => ({
              ...event,
              id: `${event.title}_${event.time}_${event.teams}_${index}`,
              startDatetime: new Date(`${date}T${event.time}`),
              endDatetime: new Date(`${date}T${event.time}`),
              date: new Date(date),
              notificationEnabled: false
            }))
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
    };

    fetchData();
  }, []);

  const handleNotificationToggle = (updatedGame) => {
    setGames(prevGames =>
      prevGames.map(game =>
        game.id === updatedGame.id
          ? { ...game, notificationEnabled: updatedGame.notificationEnabled }
          : game
      )
    );
  };

  const selectedDayMeetings = games.filter(game =>
    isSameDay(game.date, selectedDay)
  );

  const preferredMeetings = selectedDayMeetings.filter(meeting =>
    userPreferredGames.includes(meeting.title.toLowerCase()) ||
    preferredTeams.some(team => meeting.teams.toLowerCase().includes(team.toLowerCase())) ||
    meeting.teams.toLowerCase().includes("all blocks")
  );

  const otherMeetings = selectedDayMeetings.filter(
    meeting => !preferredMeetings.includes(meeting)
  );

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

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
              userPreferredGames={userPreferredGames}
              preferredTeams={preferredTeams}
            />
          </div>
          <div className="lg:w-2/3">
            <EventList
              showError={!auth}
              handleLoginRedirect={handleLoginRedirect}
              preferredMeetings={preferredMeetings}
              otherMeetings={otherMeetings}
              onGameSelect={handleGameSelect}
              selectedDay={selectedDay}
              userPreferredGames={userPreferredGames}
              preferredTeams={preferredTeams}
              onNotificationToggle={handleNotificationToggle}
              auth={auth}
            />
          </div>
        </div>

        <div className="my-8 border-t-2 border-gray-300"></div>

        {auth && selectedGame && (
          <GameDetails game={selectedGame} />
        )}
      </div>
    </div>
  );
}
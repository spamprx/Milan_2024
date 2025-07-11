import React from 'react';
import { format } from 'date-fns';
import Meeting from "./Meetings"

export default function EventList({ 
  auth,
  showError, 
  handleLoginRedirect, 
  preferredMeetings, 
  otherMeetings, 
  onGameSelect, 
  selectedDay,
  userPreferredGames,
  preferredTeams,
  onNotificationToggle
}) {
  const renderMeetings = (meetings, isPreferred) => {
    if (meetings.length === 0) {
      return (
        <p className="text-lg text-white font-bold">
          No games scheduled for today.
        </p>
      );
    }

    return meetings.map((meeting) => (
      <Meeting 
        key={meeting.id}
        meeting={meeting} 
        onSelect={onGameSelect}
        isPreferred={isPreferred}
        userPreferredGames={userPreferredGames}
        preferredTeams={preferredTeams}
        initialNotificationState={meeting.notificationEnabled}
        onNotificationToggle={onNotificationToggle}
        showNotifications={auth}
      />
    ));
  };

  const noMeetings = preferredMeetings.length === 0 && otherMeetings.length === 0;

  return (
    <div className="w-full md:max-w-md mx-auto lg:max-w-none">
      <h2 className="text-lg font-semibold text-white mb-4">
        Schedule for {format(selectedDay, "MMM dd, yyyy")}
      </h2>
      <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0 min-h-[30vh]">
        <div className="bg-[#6B5794]/[0.84] rounded-2xl overflow-hidden lg:flex-1">
          <h3 className="bg-[#4B16B2] text-white h-10 font-extrabold flex items-center justify-center">
            PREFERRED EVENTS
          </h3>
          {showError ? (
            <div className="text-center p-4">
              <p className="text-lg text-white font-bold">
                Please log in to view your preferred games.
              </p>
              <button
                onClick={handleLoginRedirect}
                className="mt-4 px-6 py-3 bg-[#561e70] text-[#D1CCB6] rounded-lg hover:bg-[#7a2a9e] transition duration-300"
              >
                Go to Profile Page
              </button>
            </div>
          ) : (
            <div className={noMeetings ? "p-4 max-h-[400px] overflow-y-auto" : "grid grid-cols-2 lg:grid-cols-1 gap-4 p-4 max-h-[400px] overflow-y-auto"}>
              {renderMeetings(preferredMeetings, true)}
            </div>
          )}
        </div>

        <div className="bg-[#6B5794]/[0.84] rounded-2xl overflow-hidden lg:flex-1 min-h-[30vh]">
          <h3 className="bg-[#D1CCB6] text-black h-10 font-extrabold flex items-center justify-center ">
            OTHER EVENTS
          </h3>
          <div className={noMeetings ? "p-4 max-h-[400px] overflow-y-auto" : "grid grid-cols-2 lg:grid-cols-1 gap-4 p-4 max-h-[400px] overflow-y-auto"}>
            {renderMeetings(auth ? otherMeetings : [...preferredMeetings, ...otherMeetings], false)}
          </div>
        </div>
      </div>
    </div>
  );
}
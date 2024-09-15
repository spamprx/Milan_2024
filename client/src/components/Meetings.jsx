import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Meeting({ meeting, onSelect, isPreferred, userPreferredGames = [], preferredTeams = [] }) {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!meeting) {
      console.warn("Meeting data is missing");
      return;
    }

    const isPreferredEvent =
      (Array.isArray(userPreferredGames) && userPreferredGames.includes(meeting.title)) ||
      (Array.isArray(preferredTeams) && preferredTeams.some((team) => meeting.teams && meeting.teams.includes(team))) ||
      (meeting.teams && meeting.teams.toLowerCase().includes("all blocks"));

    setNotificationEnabled(isPreferredEvent);
  }, [meeting, userPreferredGames, preferredTeams]);

  const toggleNotification = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setError(null);

    try {
      if (!meeting || !meeting.date) {
        throw new Error("Meeting data is incomplete");
      }

      const endpoint = notificationEnabled ? "delete_event" : "add_event";
      const payload = notificationEnabled
        ? {
          eventName: meeting.title,
          date: meeting.date instanceof Date ? meeting.date.toISOString().split("T")[0] : meeting.date,
        }
        : {
          eventName: meeting.title,
          location: meeting.body || "",
          teamsParticipating: meeting.teams ? meeting.teams.split(", ") : [],
          time: meeting.time || "",
          date: meeting.date instanceof Date ? meeting.date.toISOString().split("T")[0] : meeting.date,
        };

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, payload, {
        withCredentials: true,
      });

      setNotificationEnabled(!notificationEnabled);
    } catch (error) {
      console.error("Error toggling notification:", error);
      setError("Failed to update notification. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!meeting) {
    return null;
  }

  const timeStyle = isPreferred
    ? "bg-[#8B5CF6] text-white"
    : "bg-[#F2B84B] text-black";

  return (
    <div
      className="bg-[#270B5D]/[0.75] rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-200 ease-in-out"
      onClick={() => onSelect(meeting)}
    >
      <div className="rounded-2xl w-full text-white font-medium text-sm">
        {meeting.category}
      </div>
      <p className="text-white font-bold text-sm mb-1">
        {meeting.title}
      </p>
      <div className={`${timeStyle} rounded-full px-3 py-1 inline-block mb-1`}>
        <p className="font-bold text-sm">
          {meeting.time}
        </p>
      </div>
      <p className="text-xs font-bold text-white mt-2">
        {meeting.teams || "ALL BLOCKS"}
      </p>

      <div className="mt-2 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xs text-gray-300 pb-2">Notifications</p>
        <button
          onClick={toggleNotification}
          className="w-10 h-6 rounded-full bg-gray-700 flex items-center justify-start p-1 transition-all duration-300 ease-in-out focus:outline-none"
          disabled={isLoading}
        >
          <div
            className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${notificationEnabled ? 'bg-green-500 transform translate-x-4' : 'bg-white'
              }`}
          >
            {isLoading && (
              <div className="w-4 h-4 border-t-2 border-gray-700 rounded-full animate-spin"></div>
            )}
            {!isLoading && notificationEnabled && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {!isLoading && !notificationEnabled && (
              <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
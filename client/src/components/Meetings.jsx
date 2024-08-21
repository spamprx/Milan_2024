import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Meeting({ meeting, onSelect, userPreferredGames = [], preferredTeams = [] }) {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!meeting) {
      console.warn("Meeting data is missing");
      return;
    }

    const isPreferred = 
      (Array.isArray(userPreferredGames) && userPreferredGames.includes(meeting.title)) ||
      (Array.isArray(preferredTeams) && preferredTeams.some(team => meeting.teams && meeting.teams.includes(team))) ||
      (meeting.teams && meeting.teams.toLowerCase().includes("all blocks"));

    setNotificationEnabled(isPreferred);
  }, [meeting, userPreferredGames, preferredTeams]);

  const toggleNotification = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setError(null);

    try {
      if (!meeting || !meeting.date) {
        throw new Error("Meeting data is incomplete");
      }

      const endpoint = notificationEnabled ? '/delete_event' : '/add_event';
      const payload = notificationEnabled ? 
        {
          eventName: meeting.title,
          date: meeting.date instanceof Date ? meeting.date.toISOString().split('T')[0] : meeting.date
        } : 
        {
          eventName: meeting.title,
          location: meeting.body || '',
          teamsParticipating: meeting.teams ? meeting.teams.split(', ') : [],
          time: meeting.time || '',
          date: meeting.date instanceof Date ? meeting.date.toISOString().split('T')[0] : meeting.date
        };

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, payload, {
        withCredentials: true
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

  const isPreferred = 
    (Array.isArray(userPreferredGames) && userPreferredGames.includes(meeting.title)) ||
    (Array.isArray(preferredTeams) && preferredTeams.some(team => meeting.teams && meeting.teams.includes(team))) ||
    (meeting.teams && meeting.teams.toLowerCase().includes("all blocks"));

  return (
    <li className={`group cursor-pointer ${isPreferred ? 'bg-blue-50' : ''}`} onClick={() => onSelect(meeting)}>
      <div className="px-4 py-4 rounded-xl focus-within:bg-gray-100 hover:bg-gray-100 transition-all duration-200 ease-in-out group-hover:shadow-lg flex justify-between items-center h-24">
        <div className="min-w-0 text-left flex-grow">
          <p className={`text-sm font-medium ${isPreferred ? 'text-blue-600' : 'text-gray-900'}`}>
            {meeting.title}
          </p>
          <p className="text-sm text-gray-500">
            <span>{meeting.time || 'Time not specified'}</span>
            <span className="ml-10">{meeting.category || 'Category not specified'}</span>
          </p>
          <p className="text-xs text-gray-400">
            {meeting.teams || 'Teams not specified'}
          </p>
        </div>
        <div className="flex flex-col items-end justify-center h-full">
          <p className="text-xs text-gray-500 mb-1">Notifications</p>
          <button 
            onClick={toggleNotification}
            className="w-6 h-6 rounded-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : notificationEnabled ? (
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </li>
  );
}
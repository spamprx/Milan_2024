import React, { useState, useEffect } from "react";

export default function Meeting({ 
  meeting, 
  onSelect, 
  isPreferred, 
  userPreferredGames = [], 
  preferredTeams = [], 
  toggleNotification
}) {
  const [notificationEnabled, setNotificationEnabled] = useState(meeting.notificationEnabled);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNotificationEnabled(meeting.notificationEnabled);
  }, [meeting.notificationEnabled]);

  const handleToggle = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    const newState = !notificationEnabled;
    setNotificationEnabled(newState); // Optimistic update
    await toggleNotification(meeting.id, newState);
    setIsLoading(false);
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
          onClick={handleToggle}
          className="w-10 h-6 rounded-full bg-gray-700 flex items-center justify-start p-1 transition-all duration-300 ease-in-out focus:outline-none"
          disabled={isLoading}
        >
          <div
            className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
              notificationEnabled ? 'bg-green-500 transform translate-x-4' : 'bg-white'
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
    </div>
  );
}
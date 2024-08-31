import React from 'react';
import { format } from 'date-fns';
import Meeting from './Meetings.jsx';

export default function EventList({ preferredMeetings, otherMeetings, onGameSelect, calendarHeight, selectedDay }) {
  const renderMeetings = (meetings, isPreferred) => {
    if (meetings.length === 0) {
      return (
        <p className="text-sm text-white">
          No games scheduled for today.
        </p>
      );
    }

    return meetings.map((meeting, index) => (
      <Meeting 
        key={`${meeting.title}-${meeting.time}-${index}`} 
        meeting={meeting} 
        onSelect={onGameSelect}
        isPreferred={isPreferred}
      />
    ));
  };

  return (
    <div className="w-full md:max-w-md mx-auto lg:max-w-none">
      <h2 className="text-lg font-semibold text-white mb-4">Schedule for {format(selectedDay, 'MMM dd, yyyy')}</h2>
      <div className="lg:flex lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="bg-[#6B5794]/[0.84] rounded-2xl overflow-hidden lg:flex-1">
          <h3 className="bg-[#4B16B2] text-white h-10 font-extrabold flex items-center justify-center">
            PREFERRED GAMES
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 p-4 max-h-[400px] overflow-y-auto">
            {renderMeetings(preferredMeetings, true)}
          </div>
        </div>

        <div className="bg-[#6B5794]/[0.84] rounded-2xl overflow-hidden lg:flex-1">
          <h3 className="bg-[#D1CCB6] text-black h-10 font-extrabold flex items-center justify-center">
            OTHER GAMES
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 p-4 max-h-[400px] overflow-y-auto">
            {renderMeetings(otherMeetings, false)}
          </div>
        </div>
      </div>
    </div>
  );
}
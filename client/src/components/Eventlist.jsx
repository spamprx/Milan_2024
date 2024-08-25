import React from 'react';
import { format } from 'date-fns';
import Meeting from './Meetings.jsx';

export default function EventList({ preferredMeetings, otherMeetings, onGameSelect, calendarHeight, selectedDay }) {
  const renderMeetings = (meetings) => {
    if (meetings.length === 0) {
      return (
        <p className="text-sm text-gray-500">
          No games scheduled for today.
        </p>
      );
    }

    return meetings.map((meeting, index) => (
      <Meeting 
        key={`${meeting.title}-${meeting.time}-${index}`} 
        meeting={meeting} 
        onSelect={onGameSelect}
      />
    ));
  };

  return (
    <div className="md:col-span-4">
      <section className="mt-12 md:mt-0 h-full">
        <div className="flex flex-col gap-4 space-x-4 h-[calc(100%-2rem)]">
          <div className="flex-1 overflow-hidden bg-[#270B5D]/[0.75] rounded-2xl">
            <h3 className="font-bold text-white p-2 mb-4 rounded-2xl bg-[#270B5D]">
              PREFERRED GAMES
            </h3>
            <ol
              className="space-y-1 overflow-y-auto"
              style={{ maxHeight: `${calendarHeight - 80}px` }}
            >
              {renderMeetings(preferredMeetings)}
            </ol>
          </div>

          <div className="flex-1 overflow-hidden bg-[#6B5794]/[0.85] rounded-2xl">
            <h3 className="font-bold text-black p-2 mb-4 rounded-2xl bg-[#D1CCB6]">
              OTHER GAMES
            </h3>
            <ol className="space-y-1 overflow-y-auto" style={{ maxHeight: `${calendarHeight - 80}px` }}>
              {renderMeetings(otherMeetings)}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
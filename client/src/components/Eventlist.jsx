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
        <h2 className="font-semibold text-gray-900 mb-4">
          Schedule for{" "}
          <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
            {format(selectedDay, "MMM dd, yyyy")}
          </time>
        </h2>

        <div className="flex flex-row space-x-4 h-[calc(100%-2rem)]">
          <div className="flex-1 overflow-hidden">
            <h3 className="font-semibold text-gray-700 mb-4">
              Preferred Games
            </h3>
            <ol className="space-y-1 overflow-y-auto pr-2" style={{ maxHeight: `${calendarHeight - 80}px` }}>
              {renderMeetings(preferredMeetings)}
            </ol>
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="font-semibold text-gray-700 mb-4">
              Other Games
            </h3>
            <ol className="space-y-1 overflow-y-auto pr-2" style={{ maxHeight: `${calendarHeight - 80}px` }}>
              {renderMeetings(otherMeetings)}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
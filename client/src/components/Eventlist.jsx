import React from 'react';
import Meeting from './Meetings.jsx';

export default function EventList({ preferredMeetings, otherMeetings, onGameSelect }) {
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
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <div className="bg-[#6B5794]/[0.84] rounded-2xl overflow-hidden">
          <h3 className="bg-[#4B16B2] text-white h-10 font-extrabold flex items-center justify-center">
            PREFERRED GAMES
          </h3>
          <div className="grid grid-cols-2 gap-4 p-4 max-h-[400px] overflow-y-auto">
            {renderMeetings(preferredMeetings, true)}
          </div>
        </div>

        <div className="bg-[#6B5794]/[0.84] rounded-2xl overflow-hidden">
          <h3 className="bg-[#D1CCB6] text-black h-10 font-extrabold flex items-center justify-center">
            OTHER GAMES
          </h3>
          <div className="grid grid-cols-2 gap-4 p-4 max-h-[400px] overflow-y-auto">
            {renderMeetings(otherMeetings, false)}
          </div>
        </div>
      </div>
    </div>
  );
}

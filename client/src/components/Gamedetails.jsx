/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { format } from 'date-fns';

const GameDetails = React.forwardRef(({ game }, ref) => {
  if (!game) return null;

  return (
    <div ref={ref} className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2 text-center">
        {game.title}
      </h3>
      <p className="text-sm text-gray-500 mb-6 text-center">{game.category}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 text-center">
          <p><strong>Teams:</strong> {game.teams}</p>
          <p><strong>Venue:</strong> {game.body}</p>
          <p><strong>Time:</strong> {game.time}</p>
          <p><strong>Winner:</strong> {game.winner || 'Not decided'}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-center">Block Metrics</h4>
          <div className="space-y-6">
            <div className="text-center">
              <p>No team-specific metrics available for this event.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GameDetails.displayName = 'GameDetails';

export default GameDetails;
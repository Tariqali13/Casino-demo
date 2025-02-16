import { useEffect } from 'react';
import useLeaderboardStore from '../store/leaderboardStore';

const PlayerLeaderboard = () => {
  const { leaderboardData, fetchLeaderboard } = useLeaderboardStore();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="p-6 bg-white shadow-md rounded">
      <h2 className="text-xl mb-4">Player Leaderboard</h2>
      <ul>
        {leaderboardData.map((player, index) => (
          <li key={index} className="border-b py-2">
            {player.username} - Winnings: {player.totalWinnings}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerLeaderboard;
import { create } from 'zustand';
import axios from '../utils/api';

const useLeaderboardStore = create((set) => ({
  leaderboardData: [],
  fetchLeaderboard: async () => {
    try {
      const response = await axios.get('/leaderboard');
      set({ leaderboardData: response.data });
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  },
}));

export default useLeaderboardStore;

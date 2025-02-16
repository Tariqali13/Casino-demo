import { create } from 'zustand';
import axios from '../utils/api';

const useGameStore = create((set) => ({
  balance: 0,
  betAmount: 0,
  gameResult: null,
  setBetAmount: (amount) => set({ betAmount: amount }),
  playGame: async (gameId, betAmount) => {
    try {
      const response = await axios.post('/games/play', { gameId, betAmount });
      set({ gameResult: response.data, balance: response.data.newBalance });
    } catch (error) {
      console.error('Game error:', error);
    }
  },
}));

export default useGameStore;
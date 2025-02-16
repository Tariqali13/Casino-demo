import { create } from 'zustand';
import axios from '../utils/api';

const useStatisticsStore = create((set) => ({
  agentStatistics: [],
  fetchStatistics: async () => {
    try {
      const response = await axios.get('/admin/agent-statistics');
      set({ agentStatistics: response.data });
    } catch (error) {
      console.error('Failed to fetch agent statistics:', error);
    }
  },
}));

export default useStatisticsStore;

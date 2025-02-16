import { create } from 'zustand';
import axios from '../utils/api';

const useFinancialStore = create((set) => ({
  financialData: [],
  fetchFinancialData: async () => {
    try {
      const response = await axios.get('/admin/financial-report');
      set({ financialData: response.data });
    } catch (error) {
      console.error('Failed to fetch financial report:', error);
    }
  },
}));

export default useFinancialStore;
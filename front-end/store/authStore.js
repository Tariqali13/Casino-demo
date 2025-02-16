import { create } from 'zustand';
import axios from '../utils/api';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: async (credentials) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      set({ user: response.data.user, token: response.data.token });
    } catch (error) {
      console.error('Login failed:', error);
    }
  },
  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;
import { create } from 'zustand';
import axios from '../utils/api';

const useAdminStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const response = await axios.get('/admin/users');
      set({ users: response.data });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  },
}));

export default useAdminStore;

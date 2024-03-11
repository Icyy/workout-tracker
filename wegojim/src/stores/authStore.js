import create from 'zustand';

const useAuthStore = create((set) => ({
  userId: null,
  user: false, // Change default value to null
  token: null, // Add token field
  setUser: (userData) => set({ user: userData }),
  setEmail: (email) => set({ email }),
  setUserId: (userId) => set({ userId }),
  setToken: (token) => set({ token }), // Setter for token
  clearUser: () => set({ user: null, email: null, userId: null, token: null }), // Clear all user data including token
  loadUser: () => {
    try {
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }
      const storedToken = localStorage.getItem('token'); // Load token from localStorage
      if (storedToken) {
        set({ token: storedToken });
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  },
}));

export default useAuthStore;

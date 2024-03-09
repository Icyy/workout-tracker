import create from 'zustand';

const useAuthStore = create((set) => ({
  userId: null,
  user: false,
  email: null,
  setUser: (user) => set({ user }),
  setEmail: (email) => set({ email }),
  setUserId: (userId) => set({userId}),
  clearUser: () => set({ user: false }),
  loadUser: () => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
}));

export default useAuthStore;
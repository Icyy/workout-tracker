import create from 'zustand';

const useAuthStore = create((set) => ({
  user: false,
  email: null,
  setUser: (user) => set({ user }),
  setEmail: (email) => set({ email }),
}));

export default useAuthStore;
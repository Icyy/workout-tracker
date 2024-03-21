import create from 'zustand';

const useAuthStore = create((set) => ({
  userId: null,
  username: null,
  email: null,
  userLoggedIn: false,
  expiryDate: null,

  setUser: (userData) => {
    set({
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      userLoggedIn: userData.userLoggedIn,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });
  },

  clearUser: () => {
    set({
      userId: null,
      username: null,
      email: null,
      userLoggedIn: false,
      expiryDate: null,
    });
  },

  loadUser: ()=>{
    const storedData = localStorage.getItem('userData')
    try {
      if(storedData){
        set({
          userId: storedData.userId,
          username: storedData.username,
          email: storedData.email,
          userLoggedIn: storedData.userLoggedIn,
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        });
      }
    } catch (error) {
      console.log("no data stored")
      throw new Error("No Data Stored")
    }
  }
}));

export default useAuthStore;

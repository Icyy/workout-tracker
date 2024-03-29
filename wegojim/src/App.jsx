import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Progress from "./pages/Progress";
import Plans from "./pages/Plans";
import Login from "./pages/Login";
import Pull from "./pages/Pull";
import Legs from "./pages/Legs";
import NavBar from "./components/navigation/NavBar";
import Register from "./pages/Register";
import useAuthStore from "./stores/authStore";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem('userData')
  console.log(userData)

  useEffect(() => {
    const loadUserData = async () => {
      await useAuthStore.getState().loadUser();
      setLoading(false);
    };
  
    loadUserData();
  }, []);

  // useEffect(()=>{
  //   setLoading(false)
  // },userId)
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="mt-5">
        {/* NavBar */}
        <NavBar user={userData} />

        {/* Routed Pages */}
        <div className="mx-auto p-10">
          <Routes>
            <Route path="/" element={userData ? <Home /> : <Navigate to="/login" />} />
            <Route path="/progress" element={userData ? <Progress /> : <Navigate to="/login" />} />
            <Route path="/plans" element={userData ? <Plans /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pull" element={userData ? <Pull /> : <Navigate to="/login" />} />
            <Route path="/legs" element={userData ? <Legs /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
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


function App() {
  const user = useAuthStore((state) => state.user);
  console.log(user);

  return (
    <BrowserRouter>
      <div className="mt-5">
        {/* NavBar */}
        <NavBar user={user}/>

        {/* Routed Pages */}
        <div className="mx-auto p-10">
          <Routes>
            <Route
              path="/"
              element={user?<Home />:<Navigate to="/register" />}
            />
            <Route
              path="/progress"
              element={<Progress />}
            />
            <Route
              path="/plans"
              element={<Plans />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route path="/pull" element={<Pull />} />
            <Route path="/legs" element={<Legs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

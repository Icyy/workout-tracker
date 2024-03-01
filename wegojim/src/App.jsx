import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Progress from "./pages/Progress";
import Plans from "./pages/Plans";
import Login from "./pages/Login";
import Pull from "./pages/Pull";
import Legs from "./pages/Legs";
import NavBar from "./components/navigation/NavBar";


function App() {
  const user = true;

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
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/progress"
              element={user ? <Progress /> : <Navigate to="/login" />}
            />
            <Route
              path="/plans"
              element={user ? <Plans /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/pull" element={<Pull />} />
            <Route path="/legs" element={<Legs />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Progress from './pages/Progress';
import Plans from './pages/Plans';
import Login from './pages/Login';
import Push from './pages/Push';
import Pull from './pages/Pull';
import Legs from './pages/Legs';

// import Sidebar from './components/navigation/Sidebar';

function App() {

  const user = true;

  return (
    <>
      <BrowserRouter>
        <div className='flex justify-center items-center'>

          {/* <Sidebar /> */}

          <div className="mx-auto p-10 "> {/* Use mx-auto to center horizontally */}
            <Routes>
              <Route path="/" element={user? <Home /> : <Navigate to='/login'/>} />  
              <Route path="/progress" element={user?<Progress />:<Navigate to='/login'/>} />   
              <Route path="/plans" element={user?<Plans />:<Navigate to='/login'/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/push" element={<Push />} />
              <Route path="/pull" element={<Pull />} />
              <Route path="/legs" element={<Legs />} />
            </Routes>
          </div>
        
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;

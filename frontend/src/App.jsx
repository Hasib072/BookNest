import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-white font-bold text-xl">
            BookNest
          </Link>
          <div>
            <Link to="/" className="text-white mr-4">
              Home
            </Link>
            <Link to="/login" className="text-white mr-4">
              Login
            </Link>
            <Link to="/profile" className="text-white mr-4">
              Profile
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    
    </>
  )
}

export default App

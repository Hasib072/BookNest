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
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>      
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

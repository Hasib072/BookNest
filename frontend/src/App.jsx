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
import Explore from './pages/Explore';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>      
      {/* Define Routes */}
      <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyEmail />} />


        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={
            <PrivateRoute>
                  <Profile />
              </PrivateRoute>
          }
          />
          <Route path="/explore" element={<Explore />} />
        </Route>
        
        
         {/* Catch-all Route for 404 Not Found */}
         <Route path="*" element={<NotFound />} />
      </Routes>
      </AuthProvider>
    </>
  )
}
export default App

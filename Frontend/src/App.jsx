import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import Signup from './pages/auth/signup.jsx'
import Login from './pages/auth/login.jsx'
import Verify from './pages/auth/verify.jsx'
import LandingPage from './pages/landingPage/LandingPage.jsx'
import Home from './pages/home/Home.jsx'
import Chat from './pages/home/chatBot/Chat.jsx'
import Notebooks from './pages/home/notebook/Notebooks.jsx'
import NotebookDetail from './pages/home/notebook/NotebookDetail.jsx'
import Explore from './pages/Explore.jsx'
import Community from './pages/Community.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Account from './pages/Account.jsx'
import Plan from './pages/Plan.jsx'
import Navbar from './components/Navbar.jsx'
import UnderDevelopment from './utils/UnderDevelopment.jsx'
import { div } from 'framer-motion/client'

function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <Navbar user={user} onLogout={onLogout} />
      <main className=" ">{children}</main>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} onLogout={handleLogout}><LandingPage /></Layout>} />
        <Route path="/underdev" element={<Layout user={user} onLogout={handleLogout}><UnderDevelopment /></Layout>} />
        <Route path="/home" element={<Layout user={user} onLogout={handleLogout}><Home /></Layout>} />
        <Route path="/chat" element={<Layout user={user} onLogout={handleLogout}><Chat /></Layout>} />
        <Route path="/notebooks" element={<Layout user={user} onLogout={handleLogout}><Notebooks /></Layout>} />
        <Route path="/notebooks/:id" element={<Layout user={user} onLogout={handleLogout}><NotebookDetail /></Layout>} />
        <Route path="/explore" element={<Layout user={user} onLogout={handleLogout}><Explore /></Layout>} />
        <Route path="/community" element={<Layout user={user} onLogout={handleLogout}><Community /></Layout>} />
        <Route path="/about" element={<Layout user={user} onLogout={handleLogout}><About /></Layout>} />
        <Route path="/contact" element={<Layout user={user} onLogout={handleLogout}><Contact /></Layout>} />
        <Route path="/account" element={<Layout user={user} onLogout={handleLogout}><Account /></Layout>} />
        <Route path="/plan" element={<Layout user={user} onLogout={handleLogout}><Plan /></Layout>} />
        <Route path="/signup" element={<Layout user={user} onLogout={handleLogout}><Signup onSignup={handleLogin} /></Layout>} />
        <Route path="/login" element={<Layout user={user} onLogout={handleLogout}><Login onLogin={handleLogin} /></Layout>} />
        <Route path="/verify" element={<Layout user={user} onLogout={handleLogout}><Verify /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

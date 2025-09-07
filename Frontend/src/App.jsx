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
import { verifySession, logoutUser, getCookie } from './utils/auth'
import { div } from 'framer-motion/client'

function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF', color: '#001918' }}>

      <Navbar user={user} onLogout={onLogout} />
      <main className=" ">{children}</main>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // First check if there's a session token
        const token = getCookie('session_token')
        if (token) {
          // Verify the session with the backend
          const userData = await verifySession()
          if (userData) {
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
          }
        } else {
          // Fallback to localStorage if no token
          const savedUser = localStorage.getItem('user')
          if (savedUser) {
            setUser(JSON.parse(savedUser))
          }
        }
      } catch (error) {
        console.error('Session verification failed:', error)
        // Clear any invalid session data
        localStorage.removeItem('user')
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    logoutUser() // This will clear the session cookie
    setUser(null)
    localStorage.removeItem('user')
  }

  // Show loading spinner while checking session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p style={{ color: '#6B7280' }}>Loading...</p>
        </div>
      </div>
    )
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

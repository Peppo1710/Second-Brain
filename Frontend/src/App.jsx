import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import Signup from './pages/auth/signup.jsx'
import Login from './pages/auth/login.jsx'
import Verify from './pages/auth/verify.jsx'
import LandingPage from './pages/landingPage/LandingPage.jsx'
import Home from './pages/home/Home.jsx'
import Chat from './pages/home/chatBot/Chat.jsx'
import Notebooks from './pages/home/notebook/Notebooks.jsx'
import NotebookDetail from './pages/home/notebook/NotebookDetail.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold tracking-tight">SecondBrain</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link className="hover:text-gray-600" to="/chat">Chat</Link>
            <Link className="hover:text-gray-600" to="/notebooks">Notebooks</Link>
            <Link className="hover:text-gray-600" to="/login">Login</Link>
            <Link className="hover:text-gray-600" to="/signup">Signup</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/chat" element={<Layout><Chat /></Layout>} />
        <Route path="/notebooks" element={<Layout><Notebooks /></Layout>} />
        <Route path="/notebooks/:id" element={<Layout><NotebookDetail /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/verify" element={<Layout><Verify /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

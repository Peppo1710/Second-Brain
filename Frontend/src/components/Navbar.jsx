import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toggleTheme } from '../utils/theme'
import { Sun, Moon } from "lucide-react";


// Avatar component similar to shadcn/ui
function Avatar({ user, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        aria-label="Open profile menu"
        onClick={toggleDropdown}
        className="flex h-9 w-9 items-center justify-center rounded-full text-white ring-1 ring-black/10 dark:ring-white/10 transition-all shadow-teal hover:scale-105 bg-gradient-to-br from-[#01322F] to-[#012824] dark:shadow-none"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="text-sm font-medium">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-[#CBD5E1] bg-white/95 backdrop-blur shadow-xl dark:border-slate-700 dark:bg-slate-800/95">
          <div className="py-2">
            <Link
              to="/profile"
              className="block px-4 py-2.5 text-sm text-[#001918] hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              My Account
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2.5 text-sm text-[#001918] hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              My Notebooks
            </Link>
            <Link
              to="/help"
              className="block px-4 py-2.5 text-sm text-[#001918] hover:bg-gray-50 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              My Plan
            </Link>
            <div className="my-2 h-px bg-[#F3F4F6] dark:bg-slate-700" />
            <button
              onClick={() => {
                onLogout()
                setIsDropdownOpen(false)
              }}
              className="block w-full px-4 py-2.5 text-left text-sm text-[#DC2626] hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggle = () => {
    toggleTheme();
    setIsDark(document.documentElement.classList.contains("dark"));
  };


  const NavLinks = () => (
    <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
      <Link to="/UnderDev" className="px-3 py-2 rounded-md text-[#001918] hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 dark:hover:bg-slate-800 dark:md:hover:bg-transparent dark:md:hover:text-slate-100 transition-colors dark:text-slate-200">Explore</Link>
      <Link to="/UnderDev" className="px-3 py-2 rounded-md text-[#001918] hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 dark:hover:bg-slate-800 dark:md:hover:bg-transparent dark:md:hover:text-slate-100 transition-colors dark:text-slate-200">Community</Link>
      <Link to="/UnderDev" className="px-3 py-2 rounded-md text-[#001918] hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 dark:hover:bg-slate-800 dark:md:hover:bg-transparent dark:md:hover:text-slate-100 transition-colors dark:text-slate-200">About</Link>
      <Link to="/UnderDev" className="px-3 py-2 rounded-md text-[#001918] hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 dark:hover:bg-slate-800 dark:md:hover:bg-transparent dark:md:hover:text-slate-100 transition-colors dark:text-slate-200">Contact</Link>
    </nav>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-black dark:supports-[backdrop-filter]:bg-black">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg  flex items-center justify-center ">
              <img src="sb_logo.png" alt="logo" className='h-8 w-8' />
            </div>
            <span className="text-base md:text-lg font-semibold tracking-tight text-[#001918] dark:text-slate-100">SecondBrain</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <NavLinks />
          </div>

          {/* Right side */}
          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={handleToggle}
              aria-label="Toggle dark mode"
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-gray-300 
               bg-white hover:bg-gray-100 transition-colors 
               dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-600"
            >
              {isDark ? (
                // show Sun when currently dark (action = go light)
                <Sun className="h-5 w-5 text-gray-500 group-hover:text-gray-900 dark:text-slate-300 dark:group-hover:text-slate-100" />
              ) : (
                // show Moon when currently light (action = go dark)
                <Moon className="h-5 w-5 text-gray-600 group-hover:text-gray-900 dark:text-slate-300 dark:group-hover:text-slate-100" />
              )}
            </button>

            {user ? (
              <Avatar user={user} onLogout={onLogout} />
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-[#001918] hover:text-gray-900 dark:text-slate-200 dark:hover:text-slate-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 dark:bg-[#009b92] bg-[#01322F] hover:scale-105 dark:shadow-none  dark:hover:brightness-110"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#1B1B1B] dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <NavLinks />
              {!user && (
                <div className="mt-3 flex items-center gap-3">
                  <Link to="/login" className="flex-1 text-center rounded-md border border-[#CBD5E1] text-[#001918] py-2 transition-colors dark:border-slate-600 dark:text-slate-200">Login</Link>
                  <Link to="/signup" className="flex-1 text-center rounded-md py-2 text-white transition-all duration-300 bg-gradient-to-br from-[#01322F] to-[#012824] dark:hover:brightness-110">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

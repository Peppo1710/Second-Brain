import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
        className="flex h-9 w-9 items-center justify-center rounded-full text-white ring-1 ring-black/10 transition-colors shadow-teal"
        style={{ background: 'linear-gradient(135deg, #01322F 0%, #012824 100%)' }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
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
        <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border backdrop-blur shadow-xl" style={{ borderColor: '#CBD5E1', backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
          <div className="py-2">
            <Link
              to="/profile"
              className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
              style={{ color: '#001918' }}
              onClick={() => setIsDropdownOpen(false)}
            >
              My Account
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
              style={{ color: '#001918' }}
              onClick={() => setIsDropdownOpen(false)}
            >
              My Notebooks
            </Link>
            <Link
              to="/help"
              className="block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
              style={{ color: '#001918' }}
              onClick={() => setIsDropdownOpen(false)}
            >
              My Plan
            </Link>
            <div className="my-2 h-px" style={{ backgroundColor: '#F3F4F6' }} />
            <button
              onClick={() => {
                onLogout()
                setIsDropdownOpen(false)
              }}
              className="block w-full px-4 py-2.5 text-left text-sm hover:bg-red-50"
              style={{ color: '#DC2626' }}
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

  const NavLinks = () => (
    <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
      <Link to="/UnderDev" className="px-3 py-2 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 transition-colors" style={{ color: '#001918' }}>Explore</Link>
      <Link to="/UnderDev" className="px-3 py-2 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 transition-colors" style={{ color: '#001918' }}>Community</Link>
      <Link to="/UnderDev" className="px-3 py-2 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 transition-colors" style={{ color: '#001918' }}>About</Link>
      <Link to="/UnderDev" className="px-3 py-2 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900 transition-colors" style={{ color: '#001918' }}>Contact</Link>
    </nav>
  )

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-white/60" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg  flex items-center justify-center ">
              <img src="sb_logo.png" alt="logo" className='h-8 w-8' />
            </div>
            <span className="text-base md:text-lg font-semibold tracking-tight" style={{ color: '#001918' }}>SecondBrain</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <NavLinks />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <Avatar user={user} onLogout={onLogout} />
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="hover:text-gray-900 transition-colors" style={{ color: '#001918' }}>Login</Link>
                <Link
                  to="/signup"
                  className="rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #01322F 0%, #012824 100%)' }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              aria-label="Toggle menu"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white"
              style={{ borderColor: '#D1D5DB', color: '#1B1B1B' }}
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
            <div className="rounded-xl border p-3 shadow-sm" style={{ borderColor: '#E5E7EB', backgroundColor: 'white' }}>
              <NavLinks />
              {!user && (
                <div className="mt-3 flex items-center gap-3">
                  <Link to="/login" className="flex-1 text-center rounded-md border py-2 transition-colors" style={{ borderColor: '#CBD5E1', color: '#001918' }}>Login</Link>
                  <Link to="/signup" className="flex-1 text-center rounded-md py-2 text-white transition-all duration-300" style={{ background: 'linear-gradient(135deg, #01322F 0%, #012824 100%)' }}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

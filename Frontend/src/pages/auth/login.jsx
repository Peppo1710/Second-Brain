import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../utils/auth'

export default function Login({ onLogin }){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    
    if (!username || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const response = await loginUser(username, password)
      
      if (response.success) {
        const userData = {
          id: response.user?.id || 1,
          name: response.user?.name || username,
          email: response.user?.email || `${username}@example.com`,
          avatar: response.user?.avatar || null
        }
        onLogin(userData)
        navigate('/home')
      }
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Background Vector Graphics - Bigger Corner Graphics */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full" style={{ color: '#34D399' }}>
          <path d="M0 0 L200 0 Q300 50 300 150 L300 300 Q250 350 150 350 L0 350 Z" fill="currentColor" opacity="0.3"/>
          <path d="M50 50 L150 50 Q200 75 200 125 L200 250 Q175 275 125 275 L50 275 Z" fill="currentColor" opacity="0.2"/>
        </svg>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full" style={{ color: '#01322F' }}>
          <path d="M400 0 L200 0 Q100 50 100 150 L100 300 Q150 350 250 350 L400 350 Z" fill="currentColor" opacity="0.25"/>
          <path d="M350 50 L250 50 Q200 75 200 125 L200 250 Q225 275 275 275 L350 275 Z" fill="currentColor" opacity="0.2"/>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full" style={{ color: '#F59E0B' }}>
          <path d="M0 400 L200 400 Q300 350 300 250 L300 100 Q250 50 150 50 L0 50 Z" fill="currentColor" opacity="0.2"/>
          <path d="M50 350 L150 350 Q200 325 200 275 L200 150 Q175 125 125 125 L50 125 Z" fill="currentColor" opacity="0.15"/>
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full" style={{ color: '#34D399' }}>
          <path d="M400 400 L200 400 Q100 350 100 250 L100 100 Q150 50 250 50 L400 50 Z" fill="currentColor" opacity="0.25"/>
          <path d="M350 350 L250 350 Q200 325 200 275 L200 150 Q225 125 275 125 L350 125 Z" fill="currentColor" opacity="0.2"/>
        </svg>
      </div>

      {/* Light Green Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-20" style={{ backgroundColor: '#34D399' }}>
        <div className="w-full h-full rounded-full blur-xl"></div>
      </div>
      
      <div className="absolute top-3/4 right-1/3 w-24 h-24 opacity-15" style={{ backgroundColor: '#34D399' }}>
        <div className="w-full h-full rounded-full blur-xl"></div>
      </div>

      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 opacity-18" style={{ backgroundColor: '#34D399' }}>
        <div className="w-full h-full rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-teal" style={{ background: 'linear-gradient(135deg, #01322F 0%, #012824 100%)' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: 'AndadaPro, serif', color: '#001918' }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Sign in to continue your SecondBrain journey.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border p-8 shadow-teal" style={{ borderColor: '#CBD5E1', backgroundColor: 'white' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="login-username" className="block text-sm font-medium mb-2" style={{ color: '#001918' }}>
                  Username
                </label>
                <input 
                  id="login-username" 
                  className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                  style={{ 
                    borderColor: '#CBD5E1', 
                    backgroundColor: '#F8FAFC',
                    color: '#001918'
                  }}
                  placeholder="johndoe" 
                  value={username} 
                  onChange={(e)=>setUsername(e.target.value)} 
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="login-password" className="block text-sm font-medium" style={{ color: '#001918' }}>
                    Password
                  </label>
                  <Link to="/UnderDev" className="text-xs transition-colors" style={{ color: '#34D399' }} onMouseEnter={(e) => e.target.style.color = '#10B981'} onMouseLeave={(e) => e.target.style.color = '#34D399'}>
                    Forgot?
                  </Link>
                </div>
                <input 
                  id="login-password" 
                  className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                  style={{ 
                    borderColor: '#CBD5E1', 
                    backgroundColor: '#F8FAFC',
                    color: '#001918'
                  }}
                  placeholder="••••••••" 
                  type="password" 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                />
              </div>

              {error && (
                <div className="text-sm p-3 rounded-xl" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B' }}>
                  {error}
                </div>
              )}

              <button 
                className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-teal disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{ background: 'linear-gradient(135deg, #01322F 0%, #012824 100%)' }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              New here?{' '}
              <Link 
                to="/signup" 
                className="font-medium transition-colors" 
                style={{ color: '#34D399' }}
                onMouseEnter={(e) => e.target.style.color = '#10B981'}
                onMouseLeave={(e) => e.target.style.color = '#34D399'}
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

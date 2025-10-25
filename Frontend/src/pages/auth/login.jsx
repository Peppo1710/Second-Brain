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
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Vector Graphics - Bigger Corner Graphics */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#34D399] dark:text-emerald-500">
          <path d="M0 0 L200 0 Q300 50 300 150 L300 300 Q250 350 150 350 L0 350 Z" fill="currentColor" opacity="0.3"/>
          <path d="M50 50 L150 50 Q200 75 200 125 L200 250 Q175 275 125 275 L50 275 Z" fill="currentColor" opacity="0.2"/>
        </svg>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#01322F] dark:text-slate-600">
          <path d="M400 0 L200 0 Q100 50 100 150 L100 300 Q150 350 250 350 L400 350 Z" fill="currentColor" opacity="0.25"/>
          <path d="M350 50 L250 50 Q200 75 200 125 L200 250 Q225 275 275 275 L350 275 Z" fill="currentColor" opacity="0.2"/>
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#F59E0B] dark:text-amber-600">
          <path d="M0 400 L200 400 Q300 350 300 250 L300 100 Q250 50 150 50 L0 50 Z" fill="currentColor" opacity="0.2"/>
          <path d="M50 350 L150 350 Q200 325 200 275 L200 150 Q175 125 125 125 L50 125 Z" fill="currentColor" opacity="0.15"/>
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-15">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#34D399] dark:text-emerald-500">
          <path d="M400 400 L200 400 Q100 350 100 250 L100 100 Q150 50 250 50 L400 50 Z" fill="currentColor" opacity="0.25"/>
          <path d="M350 350 L250 350 Q200 325 200 275 L200 150 Q225 125 275 125 L350 125 Z" fill="currentColor" opacity="0.2"/>
        </svg>
      </div>

      {/* Light Green Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-20 bg-[#34D399] dark:bg-emerald-500">
        <div className="w-full h-full rounded-full blur-xl"></div>
      </div>
      
      <div className="absolute top-3/4 right-1/3 w-24 h-24 opacity-15 bg-[#34D399] dark:bg-emerald-500">
        <div className="w-full h-full rounded-full blur-xl"></div>
      </div>

      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 opacity-18 bg-[#34D399] dark:bg-emerald-500">
        <div className="w-full h-full rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-teal bg-gradient-to-br from-[#01322F] to-[#012824] dark:shadow-none dark:brightness-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-[#001918] dark:text-slate-100" style={{ fontFamily: 'AndadaPro, serif' }}>
              Welcome back
            </h1>
            <p className="text-sm text-[#6B7280] dark:text-slate-400">
              Sign in to continue your SecondBrain journey.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-[#CBD5E1] bg-white p-8 shadow-teal dark:shadow-none dark:border-slate-700 dark:bg-slate-900">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="login-username" className="block text-sm font-medium mb-2 text-[#001918] dark:text-slate-200">
                  Username
                </label>
                <input 
                  id="login-username" 
                  className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#001918] px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200" 
                  placeholder="johndoe" 
                  value={username} 
                  onChange={(e)=>setUsername(e.target.value)} 
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="login-password" className="block text-sm font-medium text-[#001918] dark:text-slate-200">
                    Password
                  </label>
                  <Link to="/UnderDev" className="text-xs text-[#34D399] hover:text-[#10B981] transition-colors dark:hover:text-emerald-500">
                    Forgot?
                  </Link>
                </div>
                <input 
                  id="login-password" 
                  className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-[#001918] px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200" 
                  placeholder="••••••••" 
                  type="password" 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                />
              </div>

              {error && (
                <div className="text-sm p-3 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] dark:bg-amber-900/30 dark:text-amber-400">
                  {error}
                </div>
              )}

              <button 
                className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-teal bg-gradient-to-br from-[#01322F] to-[#012824] dark:shadow-none dark:hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-[#6B7280] dark:text-slate-400">
              New here?{' '}
              <Link 
                to="/signup" 
                className="font-medium text-[#34D399] hover:text-[#10B981] transition-colors dark:hover:text-emerald-500"
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

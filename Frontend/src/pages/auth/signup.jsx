import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../utils/auth'

export default function Signup({ onSignup }){
  const navigate = useNavigate()
  const [form, setForm] = useState({ username:'', firstname:'', lastname:'', age:'', phone:'', password:'' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(key, value){
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    
    if ((form.password||'').length < 6){
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (!form.username || !form.firstname || !form.lastname || !form.password) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      const userData = {
        username: form.username,
        firstName: form.firstname,
        lastName: form.lastname,
        age: form.age ? parseInt(form.age) : null,
        phone: form.phone || null,
        password: form.password
      }

      const response = await registerUser(userData)
      
      if (response.success) {
        const userInfo = {
          id: response.user?.id || 1,
          name: `${form.firstname} ${form.lastname}`,
          email: response.user?.email || `${form.username}@example.com`,
          avatar: response.user?.avatar || null
        }
        onSignup(userInfo)
        navigate('/verify')
      }
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.')
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ fontFamily: 'AndadaPro, serif', color: '#001918' }}>
              Create your account
            </h1>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Start your journey with SecondBrain. It takes less than a minute.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border p-8 shadow-teal" style={{ borderColor: '#CBD5E1', backgroundColor: 'white' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: '#001918' }}>
                  Username
                </label>
                <input 
                  id="username" 
                  className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                  style={{ 
                    borderColor: '#CBD5E1', 
                    backgroundColor: '#F8FAFC',
                    color: '#001918',
                    focusRingColor: '#01322F'
                  }}
                  placeholder="johndoe" 
                  value={form.username} 
                  onChange={(e)=>update('username', e.target.value)} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium mb-2" style={{ color: '#001918' }}>
                    First name
                  </label>
                  <input 
                    id="firstname" 
                    className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                    style={{ 
                      borderColor: '#CBD5E1', 
                      backgroundColor: '#F8FAFC',
                      color: '#001918'
                    }}
                    placeholder="John" 
                    value={form.firstname} 
                    onChange={(e)=>update('firstname', e.target.value)} 
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium mb-2" style={{ color: '#001918' }}>
                    Last name
                  </label>
                  <input 
                    id="lastname" 
                    className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                    style={{ 
                      borderColor: '#CBD5E1', 
                      backgroundColor: '#F8FAFC',
                      color: '#001918'
                    }}
                    placeholder="Doe" 
                    value={form.lastname} 
                    onChange={(e)=>update('lastname', e.target.value)} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="block text-sm font-medium mb-2" style={{ color: '#001918' }}>
                    Age
                  </label>
                  <input 
                    id="age" 
                    className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                    style={{ 
                      borderColor: '#CBD5E1', 
                      backgroundColor: '#F8FAFC',
                      color: '#001918'
                    }}
                    placeholder="20" 
                    type="number" 
                    value={form.age} 
                    onChange={(e)=>update('age', e.target.value)} 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#001918' }}>
                    Phone
                  </label>
                  <input 
                    id="phone" 
                    className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                    style={{ 
                      borderColor: '#CBD5E1', 
                      backgroundColor: '#F8FAFC',
                      color: '#001918'
                    }}
                    placeholder="9876543210" 
                    value={form.phone} 
                    onChange={(e)=>update('phone', e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium" style={{ color: '#001918' }}>
                    Password
                  </label>
                  <Link to="/UnderDev" className="text-xs transition-colors" style={{ color: '#34D399' }} onMouseEnter={(e) => e.target.style.color = '#10B981'} onMouseLeave={(e) => e.target.style.color = '#34D399'}>
                    Forgot?
                  </Link>
                </div>
                <input 
                  id="password" 
                  className="w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50" 
                  style={{ 
                    borderColor: '#CBD5E1', 
                    backgroundColor: '#F8FAFC',
                    color: '#001918'
                  }}
                  placeholder="••••••••" 
                  type="password" 
                  value={form.password} 
                  onChange={(e)=>update('password', e.target.value)} 
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
                {loading ? 'Creating account...' : 'Create account'}
              </button>

              <p className="text-xs text-center" style={{ color: '#6B7280' }}>
                By signing up, you agree to our Terms and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium transition-colors" 
                style={{ color: '#34D399' }}
                onMouseEnter={(e) => e.target.style.color = '#10B981'}
                onMouseLeave={(e) => e.target.style.color = '#34D399'}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

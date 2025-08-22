import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ onLogin }){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    if (username && password){
      const userData = {
        id: 1,
        name: username,
        email: `${username}@example.com`,
        avatar: null
      }
      onLogin(userData)
      navigate('/home')
    }
  }

  return (
    <div className="min-h-[78vh] grid grid-cols-1 md:grid-cols-10">
      {/* Left: Form (30%) */}
      <div className="md:col-span-3 lg:col-span-3 border-r border-gray-200 bg-white">
        <div className="mx-auto max-w-md px-6 py-10">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-600">Sign in to continue your SecondBrain journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4">
              <div>
                <label htmlFor="login-username" className="mb-1 block text-xs font-medium text-gray-700">Username</label>
                <input id="login-username" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="johndoe" value={username} onChange={(e)=>setUsername(e.target.value)} />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="mb-1 block text-xs font-medium text-gray-700">Password</label>
                  <Link to="/UnderDev" className="text-xs text-blue-600 hover:text-blue-700">Forgot?</Link>
                </div>
                <input id="login-password" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="••••••••" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
            </div>
            <button className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/90">Sign in</button>
            <p className="mt-3 text-sm text-gray-600">New here? <Link to="/signup" className="text-blue-600 hover:text-blue-700">Create an account</Link></p>
          </form>
        </div>
      </div>

      {/* Right: GIF Illustration (70%) */}
      <div className="hidden md:flex md:col-span-7 items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <img src="/Login.gif" alt="Login" className="max-h-[70vh] w-auto object-contain" />
      </div>
    </div>
  )
}

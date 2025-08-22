import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }){
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    // Placeholder login logic
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
    <div className="mx-auto max-w-md">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="rounded-md border border-gray-200 bg-white p-4">
        <div className="grid gap-3">
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/90">Sign in</button>
      </form>
    </div>
  )
}

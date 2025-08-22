import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup({ onSignup }){
  const navigate = useNavigate()
  const [form, setForm] = useState({ username:'', firstname:'', lastname:'', age:'', phone:'', password:'' })
  const [error, setError] = useState('')

  function update(key, value){
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e){
    e.preventDefault()
    if ((form.password||'').length < 6){
      setError('Password must be at least 6 characters')
      return
    }
    setError('')
    // Placeholder signup logic
    const userData = {
      id: 1,
      name: `${form.firstname} ${form.lastname}`,
      email: `${form.username}@example.com`,
      avatar: null
    }
    onSignup(userData)
    navigate('/verify')
  }

  return (
    <div className="mx-auto max-w-md">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="rounded-md border border-gray-200 bg-white p-4">
        <div className="grid gap-3">
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Username" value={form.username} onChange={(e)=>update('username', e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="First name" value={form.firstname} onChange={(e)=>update('firstname', e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Last name" value={form.lastname} onChange={(e)=>update('lastname', e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Age" type="number" value={form.age} onChange={(e)=>update('age', e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Phone" value={form.phone} onChange={(e)=>update('phone', e.target.value)} />
          <input className="rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Password" type="password" value={form.password} onChange={(e)=>update('password', e.target.value)} />
        </div>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
        <button className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/90">Create account</button>
      </form>
    </div>
  )
}

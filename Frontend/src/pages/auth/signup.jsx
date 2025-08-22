import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
    <div className="flex flex-row justify-around align-center">
      {/* Left: Form (30%) */}
      <div className=''>

      <div className="md:col-span-3 lg:col-span-3 ">
        <div className="mx-auto max-w-md px-6 py-10">
          {/* Title + Subtitle */}
          <div className="mb-6">
            <h1 className="flex justify-center text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="flex justify-center mt-1 text-sm text-gray-600">Start your journey with SecondBrain. It takes less than a minute.</p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4">
              <div>
                <label htmlFor="username" className="mb-1 block text-xs font-medium text-gray-700">Username</label>
                <input id="username" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="johndoe" value={form.username} onChange={(e)=>update('username', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="mb-1 block text-xs font-medium text-gray-700">First name</label>
                  <input id="firstname" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="John" value={form.firstname} onChange={(e)=>update('firstname', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="lastname" className="mb-1 block text-xs font-medium text-gray-700">Last name</label>
                  <input id="lastname" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="Doe" value={form.lastname} onChange={(e)=>update('lastname', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className="mb-1 block text-xs font-medium text-gray-700">Age</label>
                  <input id="age" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="20" type="number" value={form.age} onChange={(e)=>update('age', e.target.value)} />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1 block text-xs font-medium text-gray-700">Phone</label>
                  <input id="phone" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="9876543210" value={form.phone} onChange={(e)=>update('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="mb-1 block text-xs font-medium text-gray-700">Password</label>
                  <Link to="/UnderDev" className="text-xs text-blue-600 hover:text-blue-700">Forgot?</Link>
                </div>
                <input id="password" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" placeholder="••••••••" type="password" value={form.password} onChange={(e)=>update('password', e.target.value)} />
              </div>
            </div>
            {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
            <button className="mt-4 w-full rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/90">Create account</button>
            <p className="mt-3 text-xs text-gray-500">By signing up, you agree to our Terms and Privacy Policy.</p>
            <p className="mt-3 text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-700">Log in</Link></p>
          </form>
        </div>
      </div>
      </div>

      {/* Right: GIF Illustration (70%) */}
      {/* <div className="hidden md:flex md:col-span-7 items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <img src="/Signup.gif" alt="Signup" className=" w-auto object-contain" />
      </div> */}
    </div>
  )
}

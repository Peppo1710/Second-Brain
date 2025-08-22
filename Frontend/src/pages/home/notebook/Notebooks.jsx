import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function loadNotebooks() {
  try {
    const raw = localStorage.getItem('sb_notebooks')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveNotebooks(notebooks) {
  localStorage.setItem('sb_notebooks', JSON.stringify(notebooks))
}

export default function Notebooks() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [notebooks, setNotebooks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setNotebooks(loadNotebooks())
  }, [])

  function handleCreate(e) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    const newNotebook = { id: crypto.randomUUID(), title: t, subtitle: subtitle.trim(), divs: [] }
    const next = [newNotebook, ...notebooks]
    setNotebooks(next)
    saveNotebooks(next)
    setTitle('')
    setSubtitle('')
    navigate(`/notebooks/${newNotebook.id}`)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Notebooks</h2>
      <form onSubmit={handleCreate} className="mb-6 rounded-md border border-gray-200 bg-white p-4">
        <div className="mb-3">
          <label className="block text-sm mb-1">Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Project Notes" />
        </div>
        <div className="mb-3">
          <label className="block text-sm mb-1">Subtitle</label>
          <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Optional" />
        </div>
        <button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/90">Create Notebook</button>
      </form>

      <ul className="space-y-2">
        {notebooks.map(nb => (
          <li key={nb.id} className="rounded-md border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50">
            <Link to={`/notebooks/${nb.id}`} className="block">
              <div className="font-medium">{nb.title}</div>
              {nb.subtitle && <div className="text-xs text-gray-500">{nb.subtitle}</div>}
            </Link>
          </li>
        ))}
        {notebooks.length === 0 && (
          <li className="text-sm text-gray-500">No notebooks yet. Create one above.</li>
        )}
      </ul>
    </div>
  )
}



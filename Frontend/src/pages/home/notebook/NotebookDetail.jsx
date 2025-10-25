import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

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

export default function NotebookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [notebooks, setNotebooks] = useState([])
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [links, setLinks] = useState('')

  useEffect(() => {
    setNotebooks(loadNotebooks())
  }, [])

  const notebook = useMemo(() => notebooks.find(n => n.id === id), [notebooks, id])

  useEffect(() => {
    if (!notebook && notebooks.length) {
      navigate('/notebooks')
    }
  }, [notebook, notebooks, navigate])

  function handleAddDiv(e) {
    e.preventDefault()
    if (!notebook) return
    const t = title.trim()
    if (!t) return
    const newDiv = {
      id: crypto.randomUUID(),
      title: t,
      subtitle: subtitle.trim(),
      content: content.trim(),
      links: links.split('\n').map(s => s.trim()).filter(Boolean),
    }
    const next = notebooks.map(n => n.id === notebook.id ? { ...n, divs: [newDiv, ...(n.divs || [])] } : n)
    setNotebooks(next)
    saveNotebooks(next)
    setTitle('')
    setSubtitle('')
    setContent('')
    setLinks('')
  }

  function handleDeleteDiv(divId) {
    if (!notebook) return
    const next = notebooks.map(n => n.id === notebook.id ? { ...n, divs: (n.divs || []).filter(d => d.id !== divId) } : n)
    setNotebooks(next)
    saveNotebooks(next)
  }

  if (!notebook) {
    return <div className="text-sm text-gray-500 dark:text-slate-400">Loading...</div>
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold dark:text-slate-100">{notebook.title}</h2>
          {notebook.subtitle && <div className="text-sm text-gray-500 dark:text-slate-400">{notebook.subtitle}</div>}
        </div>
        <Link to="/notebooks" className="text-sm text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200">Back</Link>
      </div>

      <form onSubmit={handleAddDiv} className="mb-6 rounded-md border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm mb-1 dark:text-slate-200">Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-slate-500" placeholder="Daily Notes" />
          </div>
          <div>
            <label className="block text-sm mb-1 dark:text-slate-200">Subtitle</label>
            <input value={subtitle} onChange={(e)=>setSubtitle(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-slate-500" placeholder="Optional" />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-sm mb-1 dark:text-slate-200">Content</label>
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-slate-500" placeholder="Write text here..."></textarea>
        </div>
        <div className="mt-3">
          <label className="block text-sm mb-1 dark:text-slate-200">Links (one per line)</label>
          <textarea value={links} onChange={(e)=>setLinks(e.target.value)} rows={3} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-slate-500" placeholder="https://...\nhttps://..."></textarea>
        </div>
        <div className="mt-3">
          <button className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/90 dark:bg-slate-700 dark:hover:bg-slate-600">Add Div</button>
        </div>
      </form>

      <div className="space-y-3">
        {(notebook.divs || []).map(div => (
          <div key={div.id} className="rounded-md border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium dark:text-slate-100">{div.title}</div>
                {div.subtitle && <div className="text-xs text-gray-500 dark:text-slate-400">{div.subtitle}</div>}
              </div>
              <button onClick={() => handleDeleteDiv(div.id)} className="text-xs text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-200">Delete</button>
            </div>
            {div.content && <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap dark:text-slate-300">{div.content}</p>}
            {div.links && div.links.length > 0 && (
              <ul className="mt-2 space-y-1">
                {div.links.map((l, idx) => (
                  <li key={idx}>
                    <a href={l} target="_blank" rel="noreferrer" className="text-sm text-gray-700 underline break-all dark:text-slate-400 dark:hover:text-slate-300">{l}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {(notebook.divs || []).length === 0 && (
          <div className="text-sm text-gray-500 dark:text-slate-400">No divs yet. Add one above.</div>
        )}
      </div>
    </div>
  )
}



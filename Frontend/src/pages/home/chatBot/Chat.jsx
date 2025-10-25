import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hi! How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  function handleSend(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    const userMsg = { id: Date.now(), role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Placeholder for LLM integration
    setTimeout(() => {
      const replyText = trimmed.toLowerCase().includes('hello') || trimmed.toLowerCase().includes('hi')
        ? 'Hello! 👋'
        : 'Got it. (LLM placeholder response)'
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: replyText }])
    }, 500)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 dark:text-slate-100">Chat</h2>
      <div ref={listRef} className="h-[60vh] overflow-y-auto rounded-md border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        {messages.map(m => (
          <div key={m.id} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`${m.role === 'user' ? 'bg-gray-900 text-white dark:bg-slate-700' : 'bg-gray-100 text-gray-900 dark:bg-slate-800 dark:text-slate-200'} max-w-[75%] rounded-lg px-3 py-2 text-sm`}> 
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-slate-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black/90 dark:bg-slate-700 dark:hover:bg-slate-600">Send</button>
      </form>
    </div>
  )
}



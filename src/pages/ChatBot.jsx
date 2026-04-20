import { useState, useEffect } from 'react'

const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { text: input, sender: 'user' }])
    setTimeout(() => {
      setMessages(prev => [...prev, { text: 'Merci pour ton message ! Notre équipe te répondra très rapidement sur WhatsApp.', sender: 'bot' }])
    }, 500)
    setInput('')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 shadow-lg transition-all animate-bounce"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-navy text-white px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <span className="font-semibold">Aide Zouwor</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.length === 0 && (
              <div className="bg-white rounded-lg p-2 shadow text-sm text-gray-600">
                👋 Salut ! Comment puis-je t'aider ?
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-navy text-white' : 'bg-white shadow'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t p-2 flex gap-2 bg-white">
            <input
              type="text"
              placeholder="Écris ton message..."
              className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-orange-500 text-white px-3 py-2 rounded-xl text-sm">➤</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatBot
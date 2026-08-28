import { createContext, useContext, useState } from 'react'

const NotifyContext = createContext(null)

export const NotifyProvider = ({ children }) => {
  const [notes, setNotes] = useState([])

  const pushNote = (text, tone = 'ok') => {
    const id = Date.now() + Math.random()
    setNotes((prev) => [...prev, { id, text, tone }])

    setTimeout(() => {
      setNotes((prev) => prev.filter((n) => n.id !== id))
    }, 2800)
  }

  const dropNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotifyContext.Provider value={{ notes, pushNote, dropNote }}>
      {children}
    </NotifyContext.Provider>
  )
}

export const useNotify = () => {
  const ctx = useContext(NotifyContext)
  if (!ctx) throw new Error('useNotify needs NotifyProvider')
  return ctx
}

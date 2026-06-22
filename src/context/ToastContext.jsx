/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  const showToast = useCallback((text) => {
    clearTimeout(timerRef.current)
    setMessage(text)
    setVisible(true)
    timerRef.current = setTimeout(() => setVisible(false), 1800)
  }, [])

  return (
    <ToastContext.Provider value={{ message, visible, showToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

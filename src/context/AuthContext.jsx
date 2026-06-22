/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

function authErrorMessage(error) {
  const msg = error?.message || ''
  if (msg.includes('Invalid login credentials')) return '이메일 또는 비밀번호가 올바르지 않습니다.'
  if (msg.includes('User already registered')) return '이미 가입된 이메일입니다.'
  if (msg.includes('Email not confirmed')) return '이메일 인증이 필요합니다. 메일함을 확인해주세요.'
  if (msg.includes('Password should be at least')) return '비밀번호는 6자 이상이어야 합니다.'
  return msg || '처리 중 오류가 발생했습니다.'
}

function deriveUser(session) {
  if (!session?.user) return null
  const meta = session.user.user_metadata || {}
  return {
    name: meta.name || '',
    email: session.user.email || '',
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession)
      setStatus('ready')
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error(authErrorMessage(error))
    setSession(data.session)
    return data.session
  }

  async function signUp(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    })
    if (error) throw new Error(authErrorMessage(error))
    if (data.session) setSession(data.session)
    return data.session
  }

  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
  }

  const value = {
    session,
    user: deriveUser(session),
    status,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

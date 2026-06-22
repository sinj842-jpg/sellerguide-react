import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Toast } from '../Toast'

export function AppLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <>
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <Toast />
    </>
  )
}

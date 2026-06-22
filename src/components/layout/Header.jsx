import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export function Header() {
  const { user, signOut } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/', { replace: true })
    showToast('로그아웃되었습니다.')
  }

  return (
    <header className="topbar">
      <Link className="brand home-link" to="/" aria-label="셀러가이드 홈으로 이동">
        <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="6" y="9" width="20" height="18" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path
            d="M11.5 10V8.2C11.5 5.9 13.4 4 15.8 4h.4c2.4 0 4.3 1.9 4.3 4.2V10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="m12.3 18 2.7 2.8 5.4-6.1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="brand-text">셀러가이드</span>
      </Link>
      <nav className="nav" aria-label="주 메뉴">
        <Link className="active nav-admin-link" to="/">
          행정절차 도움
        </Link>
        <Link className="nav-ai-link" to="/detail-page-ai">
          상세페이지 AI
        </Link>
      </nav>
      <div className="userbar">
        <a className="top-link" href="#">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M10 19a2 2 0 0 0 4 0" />
          </svg>
          공지사항
        </a>
        <a className="top-link" href="#">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M9.8 9a2.4 2.4 0 1 1 3.7 2c-.9.6-1.5 1.1-1.5 2.2" />
            <path d="M12 17h.01" />
          </svg>
          도움말
        </a>
        <span className="top-divider"></span>
        {user ? (
          <>
            <button className="login-btn" type="button" onClick={() => navigate('/my-info')}>
              {user.name}님
            </button>
            <button className="logout-btn" type="button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <button className="login-btn" type="button" onClick={() => navigate('/login')}>
            로그인
          </button>
        )}
      </div>
    </header>
  )
}

import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export function LoginPage() {
  const { signIn } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    try {
      await signIn(email, password)
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
      showToast('로그인되었습니다.')
    } catch (error) {
      showToast(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-screen login-screen" aria-label="로그인">
      <div className="auth-shell">
        <article className="auth-panel">
          <button className="auth-back-btn" type="button" onClick={() => navigate('/')}>
            ‹ 이전 페이지
          </button>
          <span className="auth-kicker">로그인</span>
          <h1>셀러가이드에 다시 오신 것을 환영합니다</h1>
          <p>저장된 진행 상태와 추천 정보를 불러오기 위해 로그인해주세요.</p>
          <form className="auth-form login-form" onSubmit={handleSubmit}>
            <label>
              이메일
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              비밀번호
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button className="auth-submit" type="submit" disabled={submitting}>
              로그인
            </button>
          </form>
          <div className="auth-switch">
            아직 계정이 없나요?
            <button className="link-button route-signup" type="button" onClick={() => navigate('/signup')}>
              회원가입
            </button>
          </div>
        </article>
        <aside className="auth-side">
          <div className="auth-side-visual">✓</div>
          <h2>
            로그인하면 <em>진행 상태를 안전하게 저장</em>할 수 있어요.
          </h2>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <i>1</i>
              <div>
                <strong>페이지 전환 준비</strong>
                <span>히어로, 로그인, 회원가입, 완료 화면만 연결했습니다.</span>
              </div>
            </div>
            <div className="auth-benefit">
              <i>2</i>
              <div>
                <strong>안전한 인증</strong>
                <span>Supabase 계정으로 이메일과 비밀번호를 안전하게 보관합니다.</span>
              </div>
            </div>
            <div className="auth-benefit">
              <i>3</i>
              <div>
                <strong>다음 개발 구조</strong>
                <span>온보딩과 사업자등록 가이드를 붙일 수 있는 진입점만 준비했습니다.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

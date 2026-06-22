import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export function SignupPage() {
  const { signUp } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    try {
      const session = await signUp(name, email, password)
      if (!session) {
        showToast('입력하신 이메일로 인증 메일을 보냈습니다. 메일함을 확인해주세요.')
        navigate('/login', { replace: true })
        return
      }
      navigate('/', { replace: true })
      showToast('회원가입이 완료되었습니다.')
    } catch (error) {
      showToast(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-screen signup-screen" aria-label="회원가입">
      <div className="auth-shell">
        <article className="auth-panel">
          <button className="auth-back-btn" type="button" onClick={() => navigate('/login')}>
            ‹ 이전 페이지
          </button>
          <span className="auth-kicker">회원가입</span>
          <h1>처음 시작하는 셀러를 위한 계정을 만드세요</h1>
          <p>이메일과 비밀번호로 계정을 만들고 진행 상태를 저장하세요.</p>
          <form className="auth-form signup-form" onSubmit={handleSubmit}>
            <label>
              이름
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
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
                autoComplete="new-password"
                minLength={6}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button className="auth-submit" type="submit" disabled={submitting}>
              회원가입 후 로그인
            </button>
          </form>
          <div className="auth-switch">
            이미 계정이 있나요?
            <button className="link-button route-login" type="button" onClick={() => navigate('/login')}>
              로그인
            </button>
          </div>
        </article>
        <aside className="auth-side">
          <div className="auth-side-visual">▣</div>
          <h2>
            가입 후 바로 <em>히어로 화면</em>으로 이동합니다.
          </h2>
          <div className="auth-benefits">
            <div className="auth-benefit">
              <i>✓</i>
              <div>
                <strong>간단한 입력</strong>
                <span>이름, 이메일, 비밀번호만 받습니다.</span>
              </div>
            </div>
            <div className="auth-benefit">
              <i>↻</i>
              <div>
                <strong>상태 유지</strong>
                <span>새로고침해도 로그인 완료 상태가 유지됩니다.</span>
              </div>
            </div>
            <div className="auth-benefit">
              <i>→</i>
              <div>
                <strong>다음 단계 대기</strong>
                <span>온보딩 시작 버튼은 다음 구현 단계로 남겨뒀습니다.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

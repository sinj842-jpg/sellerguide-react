import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LandingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense script may not be loaded yet (e.g. blocked by an ad blocker)
    }
  }, [])

  function goAdminFlow() {
    navigate(user ? '/onboarding' : '/login')
  }

  function goAiPage() {
    navigate('/detail-page-ai')
  }

  return (
    <section className="landing" aria-label="셀러가이드 소개">
      <div className="landing-inner">
        <div className="landing-copy">
          <div className="hero-badge">★ 초보 셀러를 위한 올인원 가이드</div>
          <h1 className="hero-title">
            온라인 판매,
            <br />
            <em>어디서부터 시작해야 할지</em>
            <br />
            막막하다면
          </h1>
          <p className="hero-sub">
            <strong>
              사업자등록부터 통신판매업 신고, 스토어 개설 준비,
            </strong>
            <br />
            상세페이지 제작까지 셀러가이드가 단계별로 도와드립니다.
          </p>
          <div className="hero-actions">
            <button className="hero-main-btn" onClick={goAdminFlow}>
              <svg className="hero-btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="5" width="12" height="16" rx="2" />
                <path d="M9 11.5 11 13.5 15 9.5" />
              </svg>
              행정절차 시작하기 <span>›</span>
            </button>
            <button className="hero-sub-btn" onClick={goAiPage}>
              <svg className="hero-btn-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
                <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
              </svg>
              상세페이지 AI 보기 <span>›</span>
            </button>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <span className="hero-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M9 11.5 11.2 14 15.5 9" />
                  <rect x="5" y="4" width="14" height="16" rx="2" />
                  <path d="M9 4.5h6" />
                </svg>
              </span>
              <div className="hero-feature-copy">
                <strong>사업자등록 기반 안내</strong>
                <span>놓치는 절차 없이 차근차근</span>
              </div>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M7 17.5h10a4 4 0 0 0 .7-7.9A6 6 0 0 0 6.2 8.3 4.6 4.6 0 0 0 7 17.5Z" />
                  <path d="M12 12v7" />
                  <path d="m9 16 3 3 3-3" />
                </svg>
              </span>
              <div className="hero-feature-copy">
                <strong>진행 상태 저장</strong>
                <span>중단해도 이어서 계속</span>
              </div>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.2" />
                  <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
                </svg>
              </span>
              <div className="hero-feature-copy">
                <strong>초보자 맞춤 가이드</strong>
                <span>복잡한 절차도 쉽게 이해</span>
              </div>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
                  <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
                </svg>
              </span>
              <div className="hero-feature-copy">
                <strong>상세페이지 AI 지원</strong>
                <span>상품 설명 초안까지 자동 생성</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <article className="visual-card progress-demo">
            <div className="demo-title">
              <span className="demo-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6" y="5" width="12" height="16" rx="2" />
                  <path d="M9 11.5 11 13.5 15 9.5" />
                </svg>
              </span>
              행정절차 도움
            </div>
            <div className="demo-progress-box">
              <p>전체 진행률</p>
              <strong>
                2 <span style={{ fontSize: '16px', fontWeight: 700 }}>/ 4 단계 완료</span>
              </strong>
              <div className="demo-line">
                <div className="demo-track">
                  <i></i>
                </div>
                <span className="demo-percent">50%</span>
              </div>
            </div>
            <div className="demo-steps">
              <div className="demo-step done">
                <span className="circle">✓</span>
                <strong>1</strong>
                <span>사업자등록 정보 준비</span>
                <span>완료</span>
              </div>
              <div className="demo-step active">
                <span className="circle">2</span>
                <strong>2</strong>
                <span>사업자등록 신청</span>
                <span className="demo-state">진행 중</span>
              </div>
              <div className="demo-step">
                <span className="circle">3</span>
                <strong>3</strong>
                <span>통신판매업 신고</span>
                <span className="demo-state">대기</span>
              </div>
              <div className="demo-step">
                <span className="circle">4</span>
                <strong>4</strong>
                <span>스토어 개설 준비</span>
                <span className="demo-state">대기</span>
              </div>
            </div>
            <div className="notice-demo">
              <strong>ⓘ 안내 사항</strong>
              현재 단계는 사업자등록을 진행하는 단계입니다.
              <br />
              필요한 서류를 준비하고 신청을 완료해 주세요.
            </div>
          </article>

          <article className="visual-card apply-card">
            <div className="apply-head">
              <h3>사업자등록 신청</h3>
              <span className="stage-pill">2단계</span>
            </div>
            <p className="apply-desc">국세청 홈택스를 통해 신청할 수 있어요.</p>
            <div className="apply-list">
              <div className="apply-item">
                <i>▱</i>
                <div>
                  <strong>온라인 신청</strong>
                  <span>홈택스에서 간편하게 신청</span>
                </div>
              </div>
              <div className="apply-item">
                <i>▤</i>
                <div>
                  <strong>필요 서류</strong>
                  <span>신분증, 임대차계약서 등</span>
                </div>
              </div>
              <div className="apply-item">
                <i>◷</i>
                <div>
                  <strong>소요 시간</strong>
                  <span>약 10~15분 내외</span>
                </div>
              </div>
            </div>
            <button className="card-green-btn" onClick={goAdminFlow}>
              자세히 보기 ›
            </button>
          </article>

          <article className="visual-card ai-card">
            <h3>AI&nbsp;&nbsp;상세페이지 AI</h3>
            <p>
              상품 정보를 입력하면
              <br />
              상세페이지 초안을 자동으로 제작해드려요.
            </p>
            <div className="ai-preview">
              <div className="product-shot"></div>
              <div className="preview-lines">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
            <button className="card-purple-btn" onClick={goAiPage}>
              상세페이지 만들기 ›
            </button>
          </article>
          <div className="float-badge one">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="12" height="16" rx="2" />
              <path d="M9 11.5 11 13.5 15 9.5" />
            </svg>
          </div>
          <div className="float-badge two">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
              <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="ad-slot" aria-label="광고" style={{ width: 'min(1380px,100%)', margin: '32px auto 0', padding: '0 56px' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8776924232323406"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </section>
  )
}

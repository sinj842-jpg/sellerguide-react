import { useNavigate, useParams } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import { useToast } from '../context/ToastContext'
import { activeChecklistConfig } from '../features/checklist/checklistConfig'

export function ReadyCompletePage() {
  const params = useParams()
  const type = params.type === 'joint' ? 'joint' : 'individual'
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { onboarding, getChecklistState } = useAppState()

  const config = activeChecklistConfig(type, onboarding)
  const completedMap = getChecklistState(type, onboarding.registrationStatus)
  const done = config.steps.filter((_, index) => completedMap[index]).length
  const headText =
    done === config.steps.length
      ? '이제 상품 등록 준비를 시작해보세요.'
      : '아직 완료하지 않은 항목이 있습니다. 사업자등록 단계에서 다시 확인해보세요.'

  function notReady() {
    showToast('상세페이지 AI 기능은 다음 단계에서 연결합니다.')
  }

  return (
    <section className="ready-complete-screen" aria-label="행정절차 준비 완료">
      <div className="ready-complete-shell">
        <header className="ready-complete-head">
          <div className="ready-status-pill">✓ 완료</div>
          <h1>
            행정절차 준비가 <em>완료</em>되었습니다
          </h1>
          <p>{headText}</p>
        </header>

        <div className="ready-complete-grid">
          <main className="ready-complete-card">
            <div className="ready-check-visual">✓</div>
            <h2>모든 행정절차 준비를 완료했습니다!</h2>
            <p>사업 운영에 필요한 필수 절차를 모두 완료했습니다. 이제 상품을 등록하고 판매를 시작할 준비가 되었습니다.</p>

            <section className="ready-done-list">
              <h3>완료한 절차</h3>
              <ul className="ready-complete-list">
                {config.steps.map((step) => (
                  <li key={step.title}>
                    <span>
                      <i>✓</i>
                      {step.title}
                    </span>
                    <span>완료</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="ready-recommend">
              <div className="ready-ai-icon">AI</div>
              <div>
                <h3>다음 추천 단계</h3>
                <strong>상세페이지 AI로 이동</strong>
                <p>AI가 상품에 맞는 상세페이지를 자동으로 제안해드립니다.</p>
              </div>
              <span>›</span>
            </section>

            <button className="ready-primary ready-ai-start" type="button" onClick={() => navigate('/detail-page-ai')}>
              상세페이지 AI 시작하기 ›
            </button>
            <button className="ready-secondary ready-dashboard" type="button" onClick={() => navigate('/')}>
              대시보드로 돌아가기
            </button>
          </main>

          <aside className="ready-next-panel">
            <h2>다음에 할 수 있는 일</h2>
            <div className="ready-action-list">
              <button className="ready-action" type="button" onClick={notReady}>
                <div className="ready-action-icon">상품</div>
                <div>
                  <strong>상품 정보 입력</strong>
                  <p>상품명, 가격, 옵션 등 기본 정보를 입력해보세요.</p>
                </div>
                <span>›</span>
              </button>
              <button className="ready-action" type="button" onClick={notReady}>
                <div className="ready-action-icon">구성</div>
                <div>
                  <strong>상세페이지 구성 생성</strong>
                  <p>AI가 상품에 맞는 레이아웃과 구성을 제안해드립니다.</p>
                </div>
                <span>›</span>
              </button>
              <button className="ready-action" type="button" onClick={notReady}>
                <div className="ready-action-icon">문구</div>
                <div>
                  <strong>문구 초안 만들기</strong>
                  <p>매력적인 상품 소개 문구를 AI가 작성해드립니다.</p>
                </div>
                <span>›</span>
              </button>
            </div>

            <div className="ready-guide-box">
              <strong>판매자 가이드가 필요하신가요?</strong>
              <p>이용가이드와 FAQ에서 자세한 내용을 확인하세요.</p>
              <button
                className="ready-guide-button"
                type="button"
                onClick={() => showToast('이용가이드는 다음 단계에서 연결합니다.')}
              >
                이용가이드 보기
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

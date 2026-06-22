import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import { activeChecklistConfig, guideForStep } from '../features/checklist/checklistConfig'
import { GuideAccordion } from '../features/checklist/GuideAccordion'

export function StepDetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const type = params.type === 'joint' ? 'joint' : 'individual'
  const index = Number(params.index) - 1
  const { onboarding, getChecklistState, toggleChecklistStep } = useAppState()

  const config = activeChecklistConfig(type, onboarding)
  const step = config.steps[index]

  if (!step) {
    return <Navigate to={`/checklist/${type}`} replace />
  }

  const completedMap = getChecklistState(type, onboarding.registrationStatus)
  const isDone = Boolean(completedMap[index])
  const guide = guideForStep(config, index)
  const isLastStep = index === config.steps.length - 1

  function goToStep(stepIndex) {
    navigate(`/checklist/${type}/step/${stepIndex + 1}`)
  }

  function handleNext() {
    if (isLastStep) {
      navigate(`/checklist/${type}`)
      return
    }
    goToStep(index + 1)
  }

  return (
    <section className="step-detail-screen" aria-label="사업자등록 단계 상세">
      <div className="detail-shell">
        <aside className="detail-sidebar">
          <button className="detail-back" type="button" onClick={() => navigate(`/checklist/${type}`)}>
            ‹ 사업자등록으로 돌아가기
          </button>
          <span className="check-kicker detail-type-label">{config.label}</span>
          <h2 className="check-sidebar-title detail-sidebar-title">{config.label} 단계</h2>
          <div className="detail-stage-list" aria-label="단계 목록">
            {config.steps.map((item, stepIndex) => (
              <button
                key={`${item.title}-${stepIndex}`}
                type="button"
                className={`detail-stage-btn${stepIndex === index ? ' active' : ''}${completedMap[stepIndex] ? ' done' : ''}`}
                onClick={() => goToStep(stepIndex)}
              >
                <span>{completedMap[stepIndex] ? '✓' : stepIndex + 1}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="detail-main">
          <section className="detail-hero">
            <div>
              <span className="check-kicker detail-step-badge">{index + 1}단계</span>
              <h1 className="detail-title">{step.title}</h1>
              <p className="detail-desc">{step.summary}</p>
            </div>
            <button
              className={`complete-toggle${isDone ? ' done' : ''}`}
              type="button"
              onClick={() => toggleChecklistStep(type, onboarding.registrationStatus, index)}
            >
              {isDone ? '✓ 완료됨' : '완료 체크'}
            </button>
          </section>

          <section className="detail-info-grid">
            <div className="detail-info-card">
              <strong>해야 할 일</strong>
              <span className="detail-todo">{step.detail[0] || step.summary}</span>
            </div>
            <div className="detail-info-card">
              <strong>예상 소요 시간</strong>
              <span className="detail-time">{index === 0 ? '약 10~20분' : '약 15~30분'}</span>
            </div>
            <div className="detail-info-card">
              <strong>중요도</strong>
              <span className="detail-priority">{index <= 1 ? '매우 중요' : '중요'}</span>
            </div>
          </section>

          <div className="image-placeholder">
            안내 이미지 placeholder
            <br />
            실제 화면 캡처 또는 가이드 이미지를 연결할 영역입니다.
          </div>

          <section className="guide-section">
            <div className="guide-section-head">
              <h2>실행 가이드</h2>
              <p>아래 순서대로 확인하고 필요한 내용을 정리하세요.</p>
            </div>
            <GuideAccordion items={guide} />
          </section>

          <section className="detail-combined-grid" aria-label="상세 보조 정보">
            <div className="detail-combined-card wide">
              <h2>핵심 요약</h2>
              <ul className="detail-summary-list">
                <li>
                  {config.label} {index + 1}/{config.steps.length}단계
                </li>
                <li>{isDone ? '완료 처리된 단계입니다.' : '아직 완료되지 않은 단계입니다.'}</li>
                <li>완료 상태는 브라우저에 저장됩니다.</li>
              </ul>
            </div>
          </section>

          <div className="detail-nav-actions">
            <button className="detail-prev-btn" type="button" disabled={index === 0} onClick={() => goToStep(index - 1)}>
              이전 단계
            </button>
            <button className="detail-next-btn" type="button" onClick={handleNext}>
              {isLastStep ? '사업자등록으로 돌아가기' : '다음 단계'}
            </button>
          </div>
        </main>
      </div>
    </section>
  )
}

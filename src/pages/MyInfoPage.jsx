import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import { useToast } from '../context/ToastContext'
import {
  businessTypeLabel,
  normalizeBusinessType,
  normalizePlatforms,
  platformLabel,
  registrationStatusLabel,
  togglePlatform,
} from '../features/onboarding/onboardingLogic'
import { checklistProgressSummary } from '../features/checklist/checklistConfig'

const businessTypeOptions = [
  { value: 'personal', label: '개인사업자' },
  { value: 'joint', label: '공동사업자' },
  { value: 'undecided', label: '아직 결정하지 않음' },
]

const platformOptions = [
  { value: 'smartstore', label: '스마트스토어' },
  { value: 'coupang', label: '쿠팡' },
  { value: 'openmarket', label: '11번가/G마켓' },
  { value: 'own_mall', label: '자사몰' },
  { value: 'other', label: '기타' },
  { value: 'undecided', label: '아직 결정하지 않음' },
]

export function MyInfoPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { onboarding, setOnboardingField, setPlatforms, getChecklistState } = useAppState()
  const [draft, setDraft] = useState({
    businessType: onboarding.businessType || '',
    platforms: [...(onboarding.platforms || [])],
  })

  const summaryType = normalizeBusinessType(draft.businessType) === 'joint' ? 'joint' : 'individual'
  const completedMap = getChecklistState(summaryType, onboarding.registrationStatus)
  const progress = checklistProgressSummary(completedMap, summaryType, onboarding)
  const platformsText = draft.platforms.length ? draft.platforms.map(platformLabel).join(', ') : '미선택'

  function selectBusinessType(value) {
    setDraft((prev) => ({ ...prev, businessType: value }))
  }

  function selectPlatform(value) {
    setDraft((prev) => ({ ...prev, platforms: togglePlatform(prev.platforms, value) }))
  }

  function handleSave() {
    setOnboardingField('businessType', normalizeBusinessType(draft.businessType))
    setPlatforms(normalizePlatforms(draft.platforms))
    showToast('내 정보를 저장했습니다.')
  }

  return (
    <section className="my-info-screen" aria-label="내 정보">
      <div className="my-info-shell">
        <main className="my-info-main">
          <div className="my-info-head">
            <div>
              <button className="my-info-back" type="button" onClick={() => navigate('/')}>
                ‹ 이전 페이지
              </button>
              <h1>내 정보</h1>
              <p>사업자 유형과 판매 플랫폼 정보를 수정하고 현재 진행 상황을 확인합니다.</p>
            </div>
          </div>

          <section className="info-form-section">
            <h2>사업자 유형</h2>
            <div className="info-options" data-info-group="businessType">
              {businessTypeOptions.map((option) => (
                <button
                  key={option.value}
                  className={`info-option${draft.businessType === option.value ? ' selected' : ''}`}
                  type="button"
                  onClick={() => selectBusinessType(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section className="info-form-section">
            <h2>판매 플랫폼</h2>
            <div className="info-options platforms" data-info-group="platforms">
              {platformOptions.map((option) => (
                <button
                  key={option.value}
                  className={`info-option${draft.platforms.includes(option.value) ? ' selected' : ''}`}
                  type="button"
                  onClick={() => selectPlatform(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <div className="my-info-actions">
            <button className="my-info-cancel" type="button" onClick={() => navigate('/')}>
              취소
            </button>
            <button className="my-info-save" type="button" onClick={handleSave}>
              정보 저장
            </button>
          </div>
        </main>

        <aside className="my-info-side">
          <h2>진행 요약</h2>
          <div className="summary-metrics">
            <div className="summary-metric">
              <span>사업자 유형</span>
              <strong className="my-summary-type">{businessTypeLabel(draft.businessType)}</strong>
            </div>
            <div className="summary-metric">
              <span>플랫폼</span>
              <strong className="my-summary-platforms">{platformsText}</strong>
            </div>
            <div className="summary-metric">
              <span>사업자등록 진행률</span>
              <strong className="my-summary-progress">{progress.percent}%</strong>
              <div className="progress-mini">
                <i style={{ width: `${progress.percent}%` }}></i>
              </div>
            </div>
          </div>
          <ul className="summary-list-plain">
            <li className="my-summary-status">사업자등록 상태: {registrationStatusLabel(onboarding.registrationStatus)}</li>
            <li className="my-summary-next">다음 할 일: {progress.nextTitle}</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

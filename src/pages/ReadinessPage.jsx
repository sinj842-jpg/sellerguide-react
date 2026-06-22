import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import { useToast } from '../context/ToastContext'
import {
  checklistTypeForBusinessType,
  missingOnboardingTarget,
  normalizeBusinessType,
  onboardingComplete,
  togglePlatform,
} from '../features/onboarding/onboardingLogic'

const registrationChoices = [
  { value: 'not_started', title: '아직 시작하지 않았어요', desc: '사업자등록에 필요한 정보를 준비하는 단계부터 시작합니다.' },
  { value: 'applied', title: '신청했어요', desc: '사업자등록 신청 후 결과를 기다리고 있거나 보완 중인 상태입니다.' },
  { value: 'completed', title: '사업자등록이 끝났어요', desc: '사업자등록증이 발급된 상태이며 다음 행정절차부터 시작합니다.' },
]

const workplaceChoices = [
  { value: 'leased', icon: '임대', title: '네, 임대 사업장이 있어요', desc: '홈택스 신청 시 임대차 내역을 입력하고 임대차계약서를 준비합니다.' },
  { value: 'not_leased', icon: '없음', title: '아니요, 임대 사업장은 없어요', desc: '자택, 본인 소유 공간, 임대차 내역이 없는 경우에 해당합니다.' },
]

const platformChoices = [
  { value: 'smartstore', icon: 'N', label: '스마트스토어' },
  { value: 'coupang', icon: 'C', label: '쿠팡' },
  { value: 'openmarket', icon: '11', label: '11번가G마켓' },
  { value: 'own_mall', icon: '몰', label: '자사몰' },
  { value: 'other', icon: '기타', label: '기타' },
  { value: 'undecided', icon: '...', label: '아직 결정하지 않았어요' },
]

export function ReadinessPage() {
  const { onboarding, setOnboardingField, setPlatforms } = useAppState()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [helperAnswers, setHelperAnswers] = useState({ shareProfit: '', partner: '', sharedResponsibility: '' })

  const complete = onboardingComplete(onboarding)

  function selectField(field, value) {
    setOnboardingField(field, value)
  }

  function selectPlatform(value) {
    setPlatforms(togglePlatform(onboarding.platforms || [], value))
  }

  function handleHelperChange(key, value) {
    setHelperAnswers((prev) => ({ ...prev, [key]: value }))
  }

  function helperResultText() {
    const values = Object.values(helperAnswers)
    const yesCount = values.filter((value) => value === 'yes').length
    if (!values.some(Boolean)) return '질문에 답하면 참고 안내를 보여드립니다.'
    if (yesCount >= 2) return '입력한 내용상 공동사업자 검토가 필요할 수 있어요.'
    return '입력한 내용상 개인사업자 형태에 가까워요.'
  }

  function handlePrev() {
    navigate('/')
  }

  function handleNext() {
    if (!complete) {
      const target = missingOnboardingTarget(onboarding)
      if (target) document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      showToast('필수 항목을 모두 선택해주세요.')
      return
    }
    const type = checklistTypeForBusinessType(onboarding.businessType)
    navigate(`/checklist/${type}`)
  }

  return (
    <section className="onboarding-screen readiness-screen integrated-onboarding" aria-label="통합 온보딩">
      <div className="onboarding-shell">
        <article className="onboarding-panel">
          <div className="step-dots">
            <span className="active">1</span>
            <i></i>
            <span>2</span>
            <i></i>
            <span>3</span>
            <i></i>
            <span>4</span>
          </div>
          <div className="onboarding-count">통합 온보딩</div>
          <h1>현재 준비 상태를 알려주세요</h1>
          <p className="onboarding-lead">선택한 정보를 바탕으로 필요한 절차만 정리해드릴게요.</p>

          <div className="question-block" data-question="registrationStatus" id="question-registration">
            <div className="question-title">
              <b>Q1</b>현재 사업자등록 상태를 알려주세요.
            </div>
            <div className="choice-grid registration-grid">
              {registrationChoices.map((choice, index) => (
                <button
                  key={choice.value}
                  className={`choice-card onboarding-choice${onboarding.registrationStatus === choice.value ? ' selected' : ''}`}
                  type="button"
                  onClick={() => selectField('registrationStatus', choice.value)}
                >
                  <i>{index + 1}</i>
                  <span className="choice-copy">
                    <span className="choice-title">{choice.title}</span>
                    <span className="choice-desc">{choice.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="question-block" data-question="businessType" id="question-business-type">
            <div className="question-title">
              <b>Q2</b>어떤 형태로 사업을 운영하시나요?
            </div>
            <div className="business-grid">
              <button
                className={`type-card onboarding-choice${onboarding.businessType === 'personal' ? ' selected' : ''}`}
                type="button"
                onClick={() => setOnboardingField('businessType', normalizeBusinessType('personal'))}
              >
                <span className="type-icon">1</span>
                <span className="type-copy">
                  <span className="type-title">개인사업자</span>
                  <span className="type-desc">혼자 운영하고 수익과 비용을 본인이 관리하는 경우</span>
                  <ul className="type-points">
                    <li>대표자 1명</li>
                    <li>절차가 상대적으로 단순함</li>
                    <li>본인 명의로 진행</li>
                  </ul>
                </span>
              </button>
              <button
                className={`type-card onboarding-choice${onboarding.businessType === 'joint' ? ' selected' : ''}`}
                type="button"
                onClick={() => setOnboardingField('businessType', normalizeBusinessType('joint'))}
              >
                <span className="type-icon">2</span>
                <span className="type-copy">
                  <span className="type-title">공동사업자</span>
                  <span className="type-desc">2명 이상이 함께 운영하고 수익과 비용을 나누는 경우</span>
                  <ul className="type-points">
                    <li>대표자 설정 필요</li>
                    <li>공동사업자 정보 준비</li>
                    <li>동업계약서 및 배분 기준 확인 필요</li>
                  </ul>
                </span>
              </button>
            </div>
            <button
              className={`undecided-card onboarding-choice${onboarding.businessType === 'undecided' ? ' selected' : ''}`}
              type="button"
              onClick={() => setOnboardingField('businessType', normalizeBusinessType('undecided'))}
            >
              <span>
                <strong>아직 결정하지 않았어요</strong>
                <br />
                <span className="choice-desc">개인사업자와 공동사업자 차이를 먼저 확인합니다.</span>
              </span>
              <span>확인하기</span>
            </button>
            <div className={`decision-helper${onboarding.businessType === 'undecided' ? ' show' : ''}`} aria-live="polite">
              <h3>어떤 유형에 가까운지 확인해보세요.</h3>
              <p>아래 질문은 일반적인 판단을 돕기 위한 참고용입니다.</p>
              <label className="helper-question">
                사업 수익과 비용을 여러 명이 나누나요?
                <select value={helperAnswers.shareProfit} onChange={(e) => handleHelperChange('shareProfit', e.target.value)}>
                  <option value="">선택</option>
                  <option value="no">아니요</option>
                  <option value="yes">예</option>
                </select>
              </label>
              <label className="helper-question">
                함께 운영하는 사람이 직원이나 외주가 아니라 동업자인가요?
                <select value={helperAnswers.partner} onChange={(e) => handleHelperChange('partner', e.target.value)}>
                  <option value="">선택</option>
                  <option value="no">아니요</option>
                  <option value="yes">예</option>
                </select>
              </label>
              <label className="helper-question">
                사업 운영 권한과 책임을 여러 명이 함께 가지나요?
                <select
                  value={helperAnswers.sharedResponsibility}
                  onChange={(e) => handleHelperChange('sharedResponsibility', e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="no">아니요</option>
                  <option value="yes">예</option>
                </select>
              </label>
              <div className="helper-result">{helperResultText()}</div>
              <p>이 결과는 일반적인 판단을 돕기 위한 참고 정보입니다. 최종 사업자 형태는 관할 세무서 또는 세무 전문가에게 확인하세요.</p>
            </div>
          </div>

          <div className="question-block" data-question="workplaceLease" id="question-workplace-lease">
            <div className="question-title">
              <b>Q3</b>사무실 등 사업장을 빌려서 사용하시나요?
            </div>
            <div className="choice-grid choice-grid two">
              {workplaceChoices.map((choice) => (
                <button
                  key={choice.value}
                  className={`choice-card onboarding-choice${onboarding.workplaceLease === choice.value ? ' selected' : ''}`}
                  type="button"
                  onClick={() => selectField('workplaceLease', choice.value)}
                >
                  <i>{choice.icon}</i>
                  <span className="choice-copy">
                    <span className="choice-title">{choice.title}</span>
                    <span className="choice-desc">{choice.desc}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="question-block" data-question="platforms" id="question-platforms">
            <div className="question-title">
              <b>Q4</b>어디에서 판매할 예정인가요?
            </div>
            <div className="choice-grid platform-grid">
              {platformChoices.map((choice) => (
                <button
                  key={choice.value}
                  className={`choice-card platform-choice${onboarding.platforms?.includes(choice.value) ? ' selected' : ''}`}
                  type="button"
                  onClick={() => selectPlatform(choice.value)}
                >
                  <i>{choice.icon}</i>
                  {choice.label}
                </button>
              ))}
            </div>
          </div>

          <div className="onboarding-actions">
            <button className="onboarding-prev readiness-prev" type="button" onClick={handlePrev}>
              이전
            </button>
            <span className="onboarding-warning">{complete ? '' : '필수 항목을 모두 선택해주세요.'}</span>
            <button className="onboarding-next readiness-next" type="button" disabled={!complete} onClick={handleNext}>
              사업자등록 가이드 만들기
            </button>
          </div>
        </article>

        <aside className="onboarding-side">
          <div className="side-illustration">1</div>
          <h2>
            선택한 정보로
            <br />
            <em>사업자등록 가이드</em>를 바로 생성합니다.
          </h2>
          <div className="side-list">
            <div className="auth-benefit">
              <i>1</i>
              <div>
                <strong>사업자등록 상태 반영</strong>
                <span>이미 지난 절차를 건너뛰고 현재 필요한 단계부터 시작합니다.</span>
              </div>
            </div>
            <div className="auth-benefit">
              <i>2</i>
              <div>
                <strong>사업자 유형 반영</strong>
                <span>개인사업자와 공동사업자 절차를 구분합니다.</span>
              </div>
            </div>
            <div className="auth-benefit">
              <i>3</i>
              <div>
                <strong>판매 플랫폼 저장</strong>
                <span>이후 플랫폼별 준비 항목을 표시할 수 있도록 값을 보관합니다.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

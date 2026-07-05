import { useNavigate, useParams } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import { activeChecklistConfig, registrationApplicationImageMarkup } from '../features/checklist/checklistConfig'
import { SequentialProcedure } from '../features/checklist/SequentialProcedure'

function GuideImage({ markup }) {
  if (markup.placeholder) return <>{markup.placeholder}</>
  return <img src={markup.src} alt={markup.alt} />
}

export function ChecklistPage() {
  const params = useParams()
  const type = params.type === 'joint' ? 'joint' : 'individual'
  const navigate = useNavigate()
  const { onboarding, setOnboardingField } = useAppState()

  const config = activeChecklistConfig(type, onboarding)
  const hasLeasedWorkplace = onboarding.workplaceLease === 'leased'
  const hasNoLeasedWorkplace = onboarding.workplaceLease === 'not_leased'

  function switchType(nextType) {
    setOnboardingField('businessType', nextType === 'joint' ? 'joint' : 'personal')
    navigate(`/checklist/${nextType}`)
  }

  const steps = config.steps.map((step, index) => {
    const isRegistrationApplyStep = step.title === '사업자등록 신청'
    const isRegistrationGuideStep = step.source === 'registrationApplicationGuide'

    let content
    if (isRegistrationApplyStep) {
      const requiredDocs = [...(type === 'joint' ? ['동업계약서'] : []), ...(hasLeasedWorkplace ? ['임대차계약서'] : [])]
      content = (
        <>
          <div className="smartstore-guide-block">
            {requiredDocs.length > 0 && (
              <div className="smartstore-note">
                <strong>필수서류</strong> {requiredDocs.join(', ')}
              </div>
            )}
            <div className="smartstore-guide-shot">
              <img src="/assets/guide/hometax-home.png" alt="홈택스 통신판매업 간편 사업자등록 신청 메뉴 화면" />
            </div>
            <div className="smartstore-note">개인사업자등록신청도 가능하나 통신판매업 간편 사업자등록으로 진행하시는게 더 편리합니다.</div>
            <ul>
              {step.detail.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hometax-link-card">
            <div>
              <strong>{type === 'joint' ? '홈택스 사업자등록 신청 페이지' : '홈택스 개인사업자 신청 페이지'}</strong>
              <span>사업자등록 신청은 홈택스에서 진행합니다.</span>
            </div>
            <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer">
              홈택스 바로가기
            </a>
          </div>
        </>
      )
    } else if (isRegistrationGuideStep) {
      const hasIndustryCode = step.title.includes('업종코드')
      const markup = registrationApplicationImageMarkup(type, step.guideIndex, hasNoLeasedWorkplace)
      content = (
        <div className="smartstore-guide-block">
          <div className="smartstore-guide-shot">
            <GuideImage markup={markup} />
          </div>
          {hasIndustryCode && (
            <div className="smartstore-guide-shot">
              <img src="/assets/guide/industry-code.png" alt="홈택스 업종코드 선택 화면" />
            </div>
          )}
          <div className="smartstore-note">{step.summary}</div>
          {hasIndustryCode && (
            <div className="smartstore-note">
              사입 및 위탁은 <strong>&quot;525101 전자상거래 소매업&quot;</strong>을 선택하시면 됩니다. 해외직구대행의 경우{' '}
              <strong>&quot;525105 해외직구대행업&quot;</strong>을 선택하시면 됩니다.
            </div>
          )}
        </div>
      )
    } else {
      content = (
        <div className="smartstore-guide-block">
          <ul>
            {step.detail.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }

    return { key: `${step.title}-${index}`, title: step.title, summary: step.summary, content }
  })

  const sideItems =
    type === 'joint'
      ? ['동업계약서', ...(hasLeasedWorkplace ? ['임대차계약서'] : []), '대표자 신분증', '공동대표자 신분증', '홈택스 공동인증서']
      : [...(hasLeasedWorkplace ? ['임대차계약서'] : []), '대표자 신분증', '홈택스 공동인증서']

  function handleComplete() {
    navigate('/smartstore-setup', { state: { type } })
  }

  const requiredDocsInfo = [
    { label: '대표자 신분증', note: '주민등록증 또는 운전면허증', always: true },
    { label: '공동대표자 신분증', note: '공동사업자 필수', always: false, condition: type === 'joint' },
    { label: '동업계약서', note: '공동사업자 필수', always: false, condition: type === 'joint' },
    { label: '임대차계약서', note: '임대 사업장이 있는 경우', always: false, condition: hasLeasedWorkplace },
    { label: '홈택스 공동인증서', note: '홈택스 로그인용', always: true },
  ].filter((doc) => doc.always || doc.condition)

  return (
    <section className="checklist-screen" aria-label="사업자등록 가이드">
      <div className="smartstore-shell">
        <main className="smartstore-main">
          <div className="phase-overview" aria-label="전체 진행 단계">
            <div className="phase-card active registration-phase-card">
              <span className="registration-phase-state">1단계 진행 중</span>
              <strong>사업자등록</strong>
              <p className="registration-phase-desc">홈택스 사업자등록 절차를 진행 중입니다.</p>
              <div className="phase-meter">
                <i className="registration-phase-meter" style={{ width: '0%' }}></i>
              </div>
            </div>
            <div className="phase-card">
              <span>2단계 남음</span>
              <strong>스마트스토어 가입 및 세팅</strong>
              <p>사업자등록 완료 후 판매자 가입과 기본 세팅을 진행합니다.</p>
              <div className="phase-meter">
                <i style={{ width: '0%' }}></i>
              </div>
            </div>
            <div className="phase-card">
              <span>3단계 남음</span>
              <strong>통신판매업 신고 및 계좌/카드 등록</strong>
              <p>통신판매업 신고, 사업용계좌, 신용카드 등록</p>
              <div className="phase-meter">
                <i style={{ width: '0%' }}></i>
              </div>
            </div>
          </div>
          <div className="smartstore-head">
            <div>
              <span className="check-kicker">1단계</span>
              <h1 className="check-title">{config.label} 사업자등록</h1>
              <p className="check-desc">{config.desc}</p>
            </div>
            <div className="check-type-switch" aria-label="사업자등록 유형 전환">
              <button
                type="button"
                className={type === 'individual' ? 'active' : ''}
                onClick={() => switchType('individual')}
              >
                개인사업자
              </button>
              <button type="button" className={type === 'joint' ? 'active' : ''} onClick={() => switchType('joint')}>
                공동사업자
              </button>
            </div>
          </div>
          <div className="required-docs-banner">
            <p className="required-docs-banner-title">신청 전 준비할 서류</p>
            <ul className="required-docs-list">
              {requiredDocsInfo.map((doc) => (
                <li key={doc.label} className="required-docs-item">
                  <span className="required-docs-item-label">{doc.label}</span>
                  <span className="required-docs-item-note">{doc.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <SequentialProcedure steps={steps} className="checklist-steps-container" onAllComplete={handleComplete} />
          <div className="smartstore-complete-action checklist-complete-action">
            <button className="smartstore-complete-btn checklist-complete-btn" type="button" onClick={handleComplete}>
              사업자등록 완료, 다음 단계로 이동하기
            </button>
          </div>
        </main>
        <aside className="smartstore-side checklist-side">
          <h2>준비할 서류</h2>
          <ul>
            {sideItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className="checklist-back-to-onboarding" type="button" onClick={() => navigate('/onboarding')}>
            ‹ 사업자 유형 다시 선택
          </button>
        </aside>
      </div>
    </section>
  )
}

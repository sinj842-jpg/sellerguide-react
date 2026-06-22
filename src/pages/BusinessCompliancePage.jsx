import { useNavigate } from 'react-router-dom'
import { SequentialProcedure } from '../features/checklist/SequentialProcedure'

const steps = [
  {
    title: '통신판매업 신고',
    summary: '스마트스토어 정보와 사업자등록증 정보를 기준으로 신고합니다.',
    content: (
      <>
        <p>정부24 또는 관할 구청 경로에서 신고하고, 완료 후 발급되는 신고번호를 보관합니다.</p>
        <ul className="compliance-list">
          <li>구매안전서비스 이용확인증 준비</li>
          <li>사업자등록번호와 대표자 정보 확인</li>
          <li>신고 완료 후 신고번호 보관</li>
        </ul>
      </>
    ),
  },
  {
    title: '사업용계좌 등록',
    summary: '정산 계좌를 홈택스 사업용계좌 메뉴에 등록합니다.',
    content: (
      <>
        <p>매출과 비용 관리를 분리할 수 있도록 실제 사업에 사용할 계좌를 등록합니다.</p>
        <ul className="compliance-list">
          <li>대표자 또는 사업자 명의 계좌 준비</li>
          <li>홈택스 사업용계좌 등록 메뉴 이동</li>
          <li>은행명, 계좌번호 입력 후 저장</li>
        </ul>
      </>
    ),
  },
  {
    title: '사업용 신용카드 등록',
    summary: '사업 지출에 사용할 카드를 홈택스에 등록합니다.',
    content: (
      <>
        <p>사입, 광고비, 구독료 등에 사용할 카드를 등록해 비용 증빙을 쉽게 정리합니다.</p>
        <ul className="compliance-list">
          <li>사업 지출용 카드 선정</li>
          <li>홈택스 사업용 신용카드 등록</li>
          <li>등록 처리 상태 확인</li>
        </ul>
      </>
    ),
  },
]

const sideItems = ['구매안전서비스 이용확인증 확보', '통신판매업 신고번호 저장', '홈택스 사업용계좌 등록', '홈택스 사업용 신용카드 등록', '스토어에 신고번호 반영']

export function BusinessCompliancePage() {
  const navigate = useNavigate()

  return (
    <section className="compliance-screen" aria-label="통신판매업 신고 및 사업용계좌, 신용카드 등록">
      <div className="smartstore-shell">
        <main className="smartstore-main">
          <div className="phase-overview" aria-label="전체 진행 단계">
            <div className="phase-card done">
              <span>1단계 완료</span>
              <strong>사업자등록</strong>
              <p>사업자등록증 발급 및 기본 정보 준비 완료</p>
              <div className="phase-meter">
                <i style={{ width: '100%' }}></i>
              </div>
            </div>
            <div className="phase-card done">
              <span>2단계 완료</span>
              <strong>스마트스토어 가입 및 세팅</strong>
              <p>판매자 가입과 스토어 기본 세팅 완료</p>
              <div className="phase-meter">
                <i style={{ width: '100%' }}></i>
              </div>
            </div>
            <div className="phase-card active">
              <span>3단계 진행 중</span>
              <strong>통신판매업 신고 및 계좌/카드 등록</strong>
              <p>마지막 행정 세팅 단계입니다.</p>
              <div className="phase-meter">
                <i style={{ width: '100%' }}></i>
              </div>
            </div>
          </div>

          <div className="smartstore-head">
            <div>
              <span className="check-kicker">마지막 단계</span>
              <h1>통신판매업 신고 및 사업용계좌, 신용카드 등록</h1>
              <p>스마트스토어 개설 후 통신판매업 신고를 진행하고, 홈택스에 사업용계좌와 사업용 신용카드를 등록합니다.</p>
            </div>
            <button className="smartstore-back compliance-back" type="button" onClick={() => navigate('/smartstore-setup')}>
              ‹ 스마트스토어로 돌아가기
            </button>
          </div>

          <SequentialProcedure steps={steps} className="compliance-steps" isCompliance />

          <div className="compliance-ai-footer">
            <button className="compliance-detail-page-btn" type="button" onClick={() => navigate('/detail-page-ai')}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
                <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
              </svg>
              상세페이지 제작하기
            </button>
          </div>
        </main>

        <aside className="smartstore-side">
          <h2>완료까지 남은 일</h2>
          <ul>
            {sideItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

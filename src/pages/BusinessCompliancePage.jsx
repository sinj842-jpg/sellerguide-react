import { useNavigate } from 'react-router-dom'
import { SequentialProcedure } from '../features/checklist/SequentialProcedure'

const steps = [
  {
    title: '구매안전서비스 이용확인증 발급받기',
    summary: '통신판매업 신고에 필요한 구매안전서비스 이용확인증을 스마트스토어센터에서 발급받습니다.',
    content: (
      <div className="smartstore-guide-block">
        <p>
          통신판매업 신고를 위한 &apos;구매안전서비스 이용확인증&apos; 발급 안내입니다. 출력은 PC에서만 가능하며, 자세한 내용은
          아래를 확인해 주세요.
        </p>
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/구매안전서비스 이용확인증.png" alt="구매안전서비스 이용확인증 발급 화면" />
        </div>
        <div className="smartstore-note">
          <strong>구매안전서비스 이용확인증 발급방법</strong>
          <p>
            [판매자정보 &gt; 판매자 관리 &gt; 판매자 정보] 메뉴 상단에서 &apos;구매안전서비스 이용확인증(에스크로)&apos;을
            다운로드할 수 있습니다.
          </p>
          <p>도움말을 열어두셨다면 해당 버튼이 가려져서 보이지 않을 수 있으니, 도움말을 닫고 확인해 주세요!</p>
        </div>
        <div className="smartstore-note">
          <strong>잠깐! 버튼이 노출되지 않는다면?</strong>
          <p>
            국내 개인판매회원으로 가입하셨을 경우에는 [판매자정보 &gt; 판매자 정보변경 &gt; 사업자 전환 신청] 메뉴를 통해
            신청을 먼저 진행해 주셔야 &apos;구매안전서비스 이용확인증&apos; 버튼이 노출됩니다.
          </p>
          <p>사업자 전환 신청 시 통신판매업 신고여부에는 &apos;미신고&apos;를 선택하여 신청 완료 후 다운로드해 주세요.</p>
        </div>
      </div>
    ),
  },
  {
    title: '통신판매업 신고',
    summary: '스마트스토어 정보와 사업자등록증 정보를 기준으로 신고합니다.',
    content: (
      <div className="smartstore-guide-block">
        <p>정부24 또는 관할 구청에서 온라인 또는 방문으로 신고할 수 있으며, 완료 후 발급되는 신고번호는 꼭 보관해 주세요.</p>
        <div className="smartstore-note">
          <strong>신고 시 필요한 서류</strong>
          <p>사업자등록증(사업자등록증명) 사본 1부</p>
          <p>구매안전서비스(에스크로) 이용확인증 1부</p>
          <p>법인인 경우 법인 등기부등본 1부 추가</p>
        </div>
        <div className="smartstore-note highlight">
          <strong>사업자등록증, 첨부 안 해도 되는 경우</strong>
          <p>
            정부24 신청 화면에서 &apos;본인정보 제공 동의&apos;에 체크하면 행정정보 공동이용을 통해 사업자등록 정보가
            자동으로 조회되어, 사업자등록증 사본을 별도로 첨부하지 않아도 신고가 가능합니다.
          </p>
        </div>
        <div className="external-link-card">
          <div>
            <strong>정부24 통신판매업 신고 페이지</strong>
            <span>통신판매업 신고는 정부24에서 온라인으로 진행합니다.</span>
          </div>
          <a
            href="https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=11300000006"
            target="_blank"
            rel="noopener noreferrer"
          >
            정부24 바로가기
          </a>
        </div>
        <div className="smartstore-note">
          <strong>신고 후에는 스마트스토어에도 신고번호를 등록해야 완료예요</strong>
          <p>스마트스토어센터 [판매자정보 &gt; 정보변경 신청] 메뉴로 이동합니다.</p>
          <p>&apos;통신판매업신고번호 확인하기&apos; 버튼을 눌러 발급받은 신고번호를 입력하고 조회합니다.</p>
          <p>공정거래위원회 데이터베이스와 대조되어 정상 확인되면 신고번호가 스마트스토어에 반영됩니다.</p>
          <p>
            신고 직후에는 공정위 DB 반영에 시간차가 있어 바로 조회되지 않을 수 있습니다. 확인이 안 되면 하루 이틀 뒤 다시
            시도해 주세요.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: '사업용계좌 등록',
    summary: '정산 계좌를 홈택스 사업용계좌 메뉴에 등록합니다.',
    content: (
      <div className="smartstore-guide-block">
        <p>매출과 비용 관리를 분리할 수 있도록 실제 사업에 사용할 계좌를 홈택스에 등록합니다.</p>
        <div className="smartstore-note">
          <strong>사업용계좌, 지금 당장은 의무가 아닐 수 있어요</strong>
          <p>
            사업용계좌 신고는 &apos;복식부기의무자&apos;(전년도 수입금액이 업종별 기준 이상인 사업자)에게만 법적 의무가
            있습니다. 이제 막 시작한 소규모 판매자라면 대부분 해당하지 않는 부가적인 절차입니다.
          </p>
        </div>
        <div className="smartstore-note highlight">
          <strong>그래도 미리 등록해두면 좋은 이유</strong>
          <p>개인 지출과 사업 매출·비용이 섞이지 않아 장부 정리와 세금 신고가 훨씬 수월해집니다.</p>
          <p>매출이 늘어 나중에 복식부기의무자가 되더라도, 이미 분리된 계좌가 있으면 별도 준비 없이 바로 신고할 수 있습니다.</p>
          <p>세무조사나 매출 소명이 필요할 때 거래 내역을 한눈에 확인할 수 있어 대응이 쉬워집니다.</p>
        </div>
        <div className="hometax-link-card">
          <div>
            <strong>홈택스 사업용계좌 등록 메뉴</strong>
            <span>로그인 후 [세금신고 &gt; 사업용계좌 신고] 메뉴에서 등록할 수 있습니다.</span>
          </div>
          <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer">
            홈택스 바로가기
          </a>
        </div>
      </div>
    ),
  },
  {
    title: '사업용 신용카드 등록',
    summary: '사업 지출에 사용할 카드를 홈택스에 등록합니다.',
    content: (
      <div className="smartstore-guide-block">
        <p>사입, 광고비, 구독료 등에 사용할 카드를 등록해 비용 증빙을 쉽게 정리합니다.</p>
        <div className="smartstore-note">
          <strong>사업용 신용카드, 등록 의무는 없어요</strong>
          <p>
            사업용계좌와 달리 사업용 신용카드 등록은 법적 의무가 전혀 없는 편의 제도입니다. 등록하지 않아도 불이익은
            없습니다.
          </p>
        </div>
        <div className="smartstore-note highlight">
          <strong>그래도 등록해두면 좋은 이유</strong>
          <p>
            등록한 카드의 결제 내역은 사용일자, 금액, 가맹점 정보, 부가가치세 매입세액까지 홈택스에 자동으로 집계됩니다.
          </p>
          <p>부가세 신고 시 매입세액공제와 종합소득세 경비 처리에 바로 반영되어, 매출전표를 따로 모아둘 필요가 없습니다.</p>
          <p>등록한 달의 사용 내역부터 반영되므로, 지출이 생기기 전에 미리 등록해두는 것이 유리합니다.</p>
        </div>
        <div className="hometax-link-card">
          <div>
            <strong>홈택스 사업용 신용카드 등록 메뉴</strong>
            <span>대표자 또는 사업자 명의의 신용카드·체크카드만 등록 가능하며, 가족카드는 등록할 수 없습니다.</span>
          </div>
          <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer">
            홈택스 바로가기
          </a>
        </div>
      </div>
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

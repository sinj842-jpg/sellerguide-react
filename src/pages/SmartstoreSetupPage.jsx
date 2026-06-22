import { useLocation, useNavigate } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import { checklistTypeForBusinessType } from '../features/onboarding/onboardingLogic'
import { SequentialProcedure } from '../features/checklist/SequentialProcedure'

const steps = [
  {
    title: '회원가입하기',
    summary: '네이버 아이디 또는 이메일 아이디로 네이버 커머스 ID 회원가입을 시작합니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/smartstore-join-1.png" alt="스마트스토어 회원가입 화면" />
        </div>
        <div className="smartstore-note">
          스마트스토어센터, 커머스솔루션마켓, 커머스API센터는 네이버 커머스 ID 하나로 이용할 수 있습니다. 사용하기 편한 방식으로
          회원가입을 진행해 주세요.
        </div>
        <ul>
          <li>네이버 아이디 또는 이메일 아이디로 가입하기를 선택합니다.</li>
          <li>이미 네이버 커머스 ID가 있다면 로그인으로 진행합니다.</li>
          <li>가입을 완료한 뒤 판매자 가입 절차로 이동합니다.</li>
        </ul>
        <div className="smartstore-check-grid">
          <span>네이버 아이디 가입</span>
          <span>이메일 아이디 가입</span>
          <span>커머스 ID 확인</span>
          <span>판매자 가입 이동</span>
        </div>
      </div>
    ),
  },
  {
    title: '사업자등록번호 입력',
    summary: '사업자등록증에 있는 사업자등록번호를 입력하고 사업자 정보를 불러옵니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/business-registration-number.png" alt="스마트스토어 사업자등록번호 입력 화면" />
        </div>
        <ul>
          <li>사업자등록증에 적힌 사업자등록번호를 그대로 입력합니다.</li>
          <li>번호 입력 후 조회되는 사업자 정보가 등록증과 일치하는지 확인합니다.</li>
          <li>오탈자가 있으면 이후 심사에서 보류될 수 있으니 숫자를 다시 확인합니다.</li>
        </ul>
      </div>
    ),
  },
  {
    title: '네이버 비즈니스 서비스 연결하기',
    summary: '네이버 쇼핑, 네이버 톡톡, 쇼핑광고대행사 선택 항목을 설정합니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/naver-business-service.png" alt="네이버 비즈니스 서비스 연결 화면" />
        </div>
        <div className="smartstore-note">
          네이버 쇼핑 및 네이버 톡톡은 연결을 권장드립니다. 쇼핑광고대행사는 광고 대행사 선택 항목이므로 처음에는
          &quot;선택없음&quot;으로 진행해 주세요. 광고 대행사는 추후에 설정해도 괜찮습니다.
        </div>
        <ul>
          <li>네이버 쇼핑 연결을 확인합니다.</li>
          <li>네이버 톡톡은 고객 문의 대응을 위해 연결을 권장합니다.</li>
          <li>쇼핑광고대행사는 선택없음으로 진행합니다.</li>
        </ul>
        <div className="smartstore-check-grid">
          <span>네이버 쇼핑 연결</span>
          <span>네이버 톡톡 연결</span>
          <span>쇼핑광고대행사 선택없음</span>
          <span>다음 단계 이동</span>
        </div>
      </div>
    ),
  },
  {
    title: '약관동의 및 가입 필수서류 확인',
    summary: '약관에 동의하고 이후 단계에서 필요한 서류 제출 조건을 확인합니다.',
    content: (
      <ul>
        <li>필수 약관에 동의한 뒤 다음으로 이동합니다.</li>
        <li>가입 필수서류 안내를 확인합니다.</li>
        <li>이후 단계에서 대표자 본인명의 휴대폰 인증을 진행하면 인감증명서 제출은 생략됩니다.</li>
      </ul>
    ),
  },
  {
    title: '사업장 정보 입력',
    summary: '상호, 사업장 주소, 업태, 업종, 통신판매업 신고 상태를 입력합니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/smartstore-join-5.png" alt="스마트스토어 사업장 정보 입력 화면" />
        </div>
        <div className="smartstore-note">
          업태, 업종에는 &quot;소매업&quot;, &quot;전자상거래소매&quot;를 입력하면 됩니다. 통신판매업 신고번호는
          &quot;통신판매업 미 신고&quot;를 선택해 주세요. 통신판매업 신고는 스마트스토어 개설 이후 진행하는 편이 더 편리합니다.
        </div>
        <ul>
          <li>상호는 사업자등록증에 있는 상호명을 그대로 입력합니다.</li>
          <li>주소찾기로 사업장 주소를 입력하고 상세 주소까지 확인합니다.</li>
          <li>업태는 소매업, 업종은 전자상거래소매로 입력합니다.</li>
          <li>통신판매업 신고번호는 통신판매업 미 신고를 선택합니다.</li>
        </ul>
        <div className="smartstore-check-grid">
          <span>상호명</span>
          <span>사업장 주소</span>
          <span>소매업 / 전자상거래소매</span>
          <span>통신판매업 미 신고</span>
        </div>
      </div>
    ),
  },
  {
    title: '대표자 정보 입력',
    summary: '대표자 구성과 대표자 명의 휴대전화 인증을 진행합니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/smartstore-join-4.png" alt="스마트스토어 대표자 정보 입력 화면" />
        </div>
        <div className="smartstore-note">
          개인사업자는 1인 대표를, 공동사업자는 공동대표를 선택하면 됩니다. 꼭 &quot;대표자 명의 휴대전화 인증&quot;으로 진행해
          주세요. 공동사업자의 경우 공동대표의 인증도 함께 진행하면 됩니다.
        </div>
        <ul>
          <li>개인사업자는 1인 대표를 선택합니다.</li>
          <li>공동사업자는 공동대표를 선택합니다.</li>
          <li>대표자명은 대표자 명의 휴대전화 인증으로 확인합니다.</li>
          <li>공동사업자는 공동대표 인증까지 같이 진행합니다.</li>
        </ul>
        <div className="smartstore-check-grid">
          <span>1인 대표 / 공동대표 선택</span>
          <span>대표자 명의 휴대전화 인증</span>
          <span>공동대표 인증</span>
          <span>생년월일 / 성별 / 국적</span>
        </div>
      </div>
    ),
  },
  {
    title: '스마트스토어 정보 입력',
    summary: '스토어 이름, URL, 소개 정보 등 고객에게 보이는 기본 정보를 입력합니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/smartstore-info-input.png" alt="스마트스토어 정보 입력 화면" />
        </div>
        <ul>
          <li>스마트스토어 이름과 URL을 입력합니다.</li>
          <li>스토어 이름은 가입 후 1회만 수정할 수 있으므로 신중하게 정합니다.</li>
          <li>스토어 소개, 대표 카테고리, 고객센터 정보를 입력합니다.</li>
        </ul>
      </div>
    ),
  },
  {
    title: '상품정보 입력',
    summary: '대표상품 카테고리와 기본 상품 정보를 입력합니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-shot">
          <img src="/assets/guide/product-category.png" alt="스마트스토어 상품 카테고리 입력 화면" />
        </div>
        <ul>
          <li>대표상품 카테고리를 선택합니다.</li>
          <li>대표상품 카테고리는 변경 가능하므로 처음에는 임시로 선택해도 괜찮습니다.</li>
          <li>주력 상품군이 정해져 있다면 가장 가까운 카테고리를 선택합니다.</li>
        </ul>
      </div>
    ),
  },
  {
    title: '배송 정산정보 입력',
    summary: '정산 계좌, 출고지, 반품지, 배송비 기준을 입력합니다.',
    content: (
      <div className="smartstore-guide-block">
        <div className="smartstore-guide-pair">
          <div className="smartstore-guide-shot">
            <img src="/assets/guide/shipping-info-1.png" alt="스마트스토어 배송정보 입력 화면 1" />
          </div>
          <div className="smartstore-guide-shot">
            <img src="/assets/guide/shipping-info-2.png" alt="스마트스토어 배송정보 입력 화면 2" />
          </div>
        </div>
        <ul>
          <li>정산 받을 계좌 정보를 입력합니다.</li>
          <li>출고지와 반품지 주소를 등록합니다.</li>
          <li>기본 배송비, 제주/도서산간 추가 배송비, 교환/반품 배송비를 입력합니다.</li>
        </ul>
      </div>
    ),
  },
  {
    title: '담당자 정보 입력',
    summary: '운영 담당자의 이름, 연락처, 이메일을 입력합니다.',
    content: (
      <ul>
        <li>담당자 이름을 입력합니다.</li>
        <li>연락 가능한 전화번호를 입력합니다.</li>
        <li>스마트스토어 알림을 받을 이메일을 입력합니다.</li>
      </ul>
    ),
  },
]

const sideItems = [
  '사업자등록증 정보',
  '대표자 명의 휴대폰',
  '공동사업자는 공동대표 선택 여부',
  '통신판매업 신고 상태',
  '정산 계좌',
  '출고지와 반품지 주소',
  '스토어 이름 후보',
  '담당자 이름, 연락처, 이메일',
]

export function SmartstoreSetupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { onboarding } = useAppState()
  const backType = location.state?.type || checklistTypeForBusinessType(onboarding.businessType)

  return (
    <section className="smartstore-screen" aria-label="스마트스토어 개설 및 세팅">
      <div className="smartstore-shell">
        <main className="smartstore-main">
          <div className="phase-overview" aria-label="전체 진행 단계">
            <div className="phase-card done">
              <span>1단계 완료</span>
              <strong>사업자등록</strong>
              <p>홈택스 사업자등록 절차 완료</p>
              <div className="phase-meter">
                <i style={{ width: '100%' }}></i>
              </div>
            </div>
            <div className="phase-card active">
              <span>2단계 진행 중</span>
              <strong>스마트스토어 가입 및 세팅</strong>
              <p>현재 단계입니다. 완료 후 다음 행정 절차로 이동합니다.</p>
              <div className="phase-meter">
                <i style={{ width: '66%' }}></i>
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
              <span className="check-kicker">다음 단계</span>
              <h1>스마트스토어 가입 및 세팅</h1>
              <p>판매자 유형 선택부터 담당자 정보 입력까지 스마트스토어 가입 절차를 순서대로 진행합니다.</p>
            </div>
            <button className="smartstore-back" type="button" onClick={() => navigate(`/checklist/${backType}`)}>
              ‹ 사업자등록으로 돌아가기
            </button>
          </div>

          <SequentialProcedure steps={steps} onAllComplete={() => navigate('/business-compliance')} />

          <div className="smartstore-complete-action">
            <button className="smartstore-complete-btn" type="button" onClick={() => navigate('/business-compliance')}>
              스마트스토어 세팅 완료, 다음 단계로 이동하기
            </button>
          </div>
        </main>

        <aside className="smartstore-side">
          <h2>가입 전 준비할 정보</h2>
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

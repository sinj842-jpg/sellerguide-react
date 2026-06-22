import { useNavigate } from 'react-router-dom'

export function DetailPageAiPage() {
  const navigate = useNavigate()

  return (
    <section className="detail-page-ai-screen" aria-label="상세페이지 AI">
      <div className="ai-page-layout">
        <div className="ai-input-panel">
          <h2 className="ai-panel-head">상품 정보 입력</h2>
          <div className="ai-form-group">
            <label className="ai-form-label">
              상품명
              <input className="ai-form-input" type="text" placeholder="예) 프리미엄 면 티셔츠" />
            </label>
            <label className="ai-form-label">
              카테고리
              <input className="ai-form-input" type="text" placeholder="예) 의류 > 상의 > 티셔츠" />
            </label>
            <label className="ai-form-label">
              가격
              <input className="ai-form-input" type="text" placeholder="예) 29,900원" />
            </label>
            <label className="ai-form-label">
              주요 특징
              <textarea
                className="ai-form-textarea"
                placeholder={'상품의 주요 특징을 입력해 주세요.\n예) 100% 면 소재, 4계절 착용 가능, 다양한 컬러'}
              ></textarea>
            </label>
          </div>
          <button className="ai-generate-btn" type="button">
            <svg
              width="20"
              height="20"
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
            AI 상세페이지 생성
          </button>
        </div>
        <div className="ai-image-panel">
          <h2 className="ai-panel-head">세부이미지 섹션</h2>
          <div className="ai-image-main-thumb">대표 이미지</div>
          <div className="ai-image-thumbs">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="ai-image-thumb" key={n}>
                이미지 {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ai-ready-overlay" id="aiReadyOverlay">
        <div className="ai-ready-modal">
          <div className="ai-ready-icon">⏳</div>
          <h2>서비스 준비 중입니다</h2>
          <p>
            셀러가이드 AI는 기능 전 단계 출시를 앞두고 있습니다.
            <br />
            빠른 시일 내에 서비스를 제공할 예정입니다.
          </p>
          <button className="ai-ready-back-btn" type="button" onClick={() => navigate('/')}>
            돌아가기
          </button>
        </div>
      </div>
    </section>
  )
}

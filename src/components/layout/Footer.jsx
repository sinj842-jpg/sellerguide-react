export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">
            <svg
              className="brand-mark"
              viewBox="0 0 32 32"
              aria-hidden="true"
              style={{ display: 'inline-block', verticalAlign: '-8px', marginRight: '8px' }}
            >
              <rect x="6" y="9" width="20" height="18" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
              <path
                d="M11.5 10V8.2C11.5 5.9 13.4 4 15.8 4h.4c2.4 0 4.3 1.9 4.3 4.2V10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="m12.3 18 2.7 2.8 5.4-6.1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            셀러가이드
          </div>
          <p>
            사업자와 셀러의 성장을 돕는
            <br />
            행정절차 가이드 서비스
          </p>
        </div>
        <div>
          <h3>서비스</h3>
          <a href="#">행정절차 도움</a>
          <a href="#">상세페이지 AI</a>
        </div>
        <div>
          <h3>고객지원</h3>
          <a href="#">공지사항</a>
          <a href="#">도움말</a>
          <a href="#">문의하기</a>
        </div>
        <div>
          <h3>약관 및 정책</h3>
          <a href="/terms.html">이용약관</a>
          <a href="/privacy.html">개인정보처리방침</a>
        </div>
        <div className="socials" aria-label="소셜 링크">
          <span>N</span>
          <span>톡</span>
          <span>▶</span>
        </div>
        <div className="biz-info">
          밀리코드 · 대표 오승민, 신지우, 강선구 · 사업자등록번호 507-45-01200
          <br />
          경기도 고양시 덕양구 도래울로 111 베네하임 5차 612호 · 이메일{' '}
          <a href="mailto:mlrc0928@naver.com" style={{ display: 'inline', color: 'inherit' }}>
            mlrc0928@naver.com
          </a>
        </div>
        <div className="copyright">© 밀리코드(SellerGuide). All rights reserved.</div>
      </div>
    </footer>
  )
}

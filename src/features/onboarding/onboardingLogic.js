export function normalizeBusinessType(value) {
  if (value === 'joint' || value === 'together' || value === 'team') return 'joint'
  if (value === 'personal' || value === 'individual' || value === 'solo') return 'personal'
  if (value === 'undecided') return 'undecided'
  return ''
}

export function normalizeRegistrationStatus(value) {
  if (value === 'not_started' || value === 'not-started') return 'not_started'
  if (value === 'applied' || value === 'in-progress') return 'applied'
  if (value === 'completed' || value === 'done') return 'completed'
  return ''
}

export function normalizePlatforms(value) {
  const arr = Array.isArray(value) ? value : value ? [value] : []
  const map = {
    gmarket: 'openmarket',
    open_market: 'openmarket',
    ownmall: 'own_mall',
  }
  const normalized = arr.map((item) => map[item] || item).filter(Boolean)
  return [...new Set(normalized)]
}

export function togglePlatform(platforms, platform) {
  if (platform === 'undecided') {
    return platforms.includes('undecided') ? [] : ['undecided']
  }
  const withoutUndecided = platforms.filter((item) => item !== 'undecided')
  return withoutUndecided.includes(platform)
    ? withoutUndecided.filter((item) => item !== platform)
    : [...withoutUndecided, platform]
}

export function checklistTypeForBusinessType(businessType) {
  return businessType === 'joint' ? 'joint' : 'individual'
}

export function onboardingComplete(onboarding) {
  return Boolean(
    onboarding.registrationStatus &&
      onboarding.businessType &&
      onboarding.businessType !== 'undecided' &&
      onboarding.workplaceLease &&
      onboarding.platforms?.length,
  )
}

export function missingOnboardingTarget(onboarding) {
  if (!onboarding.registrationStatus) return 'question-registration'
  if (!onboarding.businessType || onboarding.businessType === 'undecided') return 'question-business-type'
  if (!onboarding.workplaceLease) return 'question-workplace-lease'
  if (!onboarding.platforms?.length) return 'question-platforms'
  return ''
}

export function businessTypeLabel(value) {
  const normalized = normalizeBusinessType(value)
  if (normalized === 'personal') return '개인사업자'
  if (normalized === 'joint') return '공동사업자'
  if (normalized === 'undecided') return '아직 결정하지 않음'
  return '미선택'
}

export function registrationStatusLabel(value) {
  if (value === 'not_started') return '사업자등록 전'
  if (value === 'applied') return '사업자등록 신청 중'
  if (value === 'completed') return '사업자등록 완료'
  return '미선택'
}

export function platformLabel(value) {
  const labels = {
    smartstore: '스마트스토어',
    coupang: '쿠팡',
    openmarket: '11번가/G마켓',
    own_mall: '자사몰',
    other: '기타',
    undecided: '아직 결정하지 않음',
  }
  return labels[value] || value
}

import { percent } from '../../utils/format'

export const defaultGuide = [
  {
    title: '필요 서류와 정보를 확인하기',
    body: '이 단계에서 제출하거나 입력해야 하는 정보가 무엇인지 먼저 확인합니다. 사업자 정보와 플랫폼 심사에 반복 사용될 수 있으니 파일명과 메모를 정리해두세요.',
  },
  {
    title: '공식 사이트에서 진행하기',
    body: '홈택스, 정부24, 판매자센터처럼 공식 사이트에서 직접 진행합니다. 유사 사이트나 광고 페이지를 통한 입력은 피하는 편이 안전합니다.',
  },
  {
    title: '완료 증빙 저장하기',
    body: '신청 완료 화면, 접수번호, 발급 문서, 신고번호 등 다음 단계에서 다시 필요한 정보를 캡처하거나 PDF로 저장합니다.',
  },
]

export const firstStepGuide = [
  {
    title: '상호명 정하기',
    body: '사업자등록에 사용할 상호명을 정합니다. 스토어명과 같게 둘지, 세금계산서와 신고에 사용할 공식 상호만 별도로 둘지 미리 결정하세요.',
  },
  {
    title: '사업장 주소 확인',
    body: '집, 사무실, 공유오피스 중 사업자등록과 플랫폼 심사에 사용할 주소를 정합니다. 임대차계약서가 필요한 상황인지도 함께 확인하세요.',
  },
  {
    title: '업종 및 판매 상품군 정리',
    body: '판매할 상품군을 기준으로 업종 후보를 정리합니다. 온라인 판매라면 전자상거래 소매업을 기본 후보로 두고, 실제 상품에 맞는 세부 업종을 확인하세요.',
  },
  {
    title: '과세유형 검토',
    body: '간이과세자와 일반과세자 중 본인 상황에 맞는 유형을 검토합니다. 초기 매출 예상, 거래처 요구, 간이과세 배제 업종 여부를 함께 확인하세요.',
  },
]

export const checklistByType = {
  individual: {
    label: '개인사업자',
    title: '개인사업자 사업자등록',
    desc: '홈택스에서 진행하는 사업자등록 핵심 절차입니다.',
    steps: [
      {
        title: '사업자등록 신청',
        summary: '홈택스에서 개인 사업자등록 신청서를 작성하고 제출합니다.',
        detail: ['홈택스에 로그인합니다.', '개인 사업자등록 신청 메뉴로 이동합니다.', '기본 정보와 업종 정보를 입력한 뒤 제출합니다.'],
      },
      {
        title: '사업자등록증 발급 확인',
        summary: '처리 결과와 사업자등록증 정보를 확인하고 파일로 보관합니다.',
        detail: ['민원 처리 상태를 확인합니다.', '사업자등록증 PDF를 저장합니다.', '상호, 주소, 업종 오탈자를 점검합니다.'],
      },
    ],
  },
  joint: {
    label: '공동사업자',
    title: '공동사업자 사업자등록',
    desc: '홈택스에서 진행하는 공동사업자 등록 핵심 절차입니다.',
    steps: [
      {
        title: '사업자등록 신청',
        summary: '홈택스 또는 세무서를 통해 공동사업자 형태로 등록을 진행합니다.',
        detail: ['대표 신청자 계정으로 신청합니다.', '공동사업자 정보를 함께 입력합니다.', '기본 정보와 업종 정보를 입력한 뒤 제출합니다.'],
      },
      {
        title: '사업자등록증 발급 확인',
        summary: '공동사업자 정보와 대표자 정보가 정확한지 확인합니다.',
        detail: ['등록증의 대표자와 공동사업자 정보를 확인합니다.', '상호, 주소, 업종을 점검합니다.', 'PDF 파일로 보관합니다.'],
      },
    ],
  },
}

export function stepTemplate(title, summary = '', detail = []) {
  const allSteps = [...checklistByType.individual.steps, ...checklistByType.joint.steps]
  const found = allSteps.find(
    (step) => step.title === title || (title === '스토어 개설 준비' && step.title.includes('스토어 개설')),
  )
  return {
    title,
    summary: summary || found?.summary || `${title} 단계를 진행합니다.`,
    detail: detail.length ? detail : found?.detail || [`${title}에 필요한 정보를 확인합니다.`, '완료 후 다음 단계로 이동하세요.'],
  }
}

export function checklistStepsFor(type, status) {
  const personal = {
    not_started: [stepTemplate('사업자등록 신청'), stepTemplate('사업자등록증 발급 확인')],
    applied: [
      stepTemplate(
        '사업자등록 신청 상태 확인',
        '사업자등록 신청 결과를 확인하고 보완 요청 여부를 점검합니다.',
        ['홈택스 민원 처리 상태를 확인합니다.', '접수만 했는지, 승인 대기인지, 보완 요청인지 확인합니다.', '보완 요청이 있다면 필요한 자료를 준비합니다.'],
      ),
      stepTemplate('사업자등록증 발급 확인'),
    ],
    completed: [
      stepTemplate('사업자등록증 발급 확인', '사업자등록증 파일과 입력 정보를 다시 확인합니다.', [
        '사업자등록증 PDF를 저장했는지 확인합니다.',
        '상호, 주소, 업종 오탈자를 점검합니다.',
      ]),
    ],
  }

  const joint = {
    not_started: [stepTemplate('사업자등록 신청'), stepTemplate('사업자등록증 발급 확인')],
    applied: [
      stepTemplate(
        '사업자등록 신청 상태 확인',
        '공동사업자 등록 신청 결과와 보완 요청 여부를 확인합니다.',
        ['홈택스 또는 세무서 처리 상태를 확인합니다.', '공동사업자 정보 보완 요청이 있는지 확인합니다.', '보완 자료를 준비합니다.'],
      ),
      stepTemplate('사업자등록증 발급 확인'),
    ],
    completed: [
      stepTemplate('사업자등록증 발급 확인', '공동사업자 정보와 대표자 정보가 정확한지 다시 확인합니다.', [
        '등록증의 대표자와 공동사업자 정보를 확인합니다.',
        '상호, 주소, 업종을 점검합니다.',
        'PDF 파일로 보관합니다.',
      ]),
    ],
  }

  return (type === 'joint' ? joint : personal)[status || 'not_started']
}

export function registrationApplicationGuideItems(type, workplaceLease) {
  const hasLeasedWorkplace = workplaceLease === 'leased'
  const hasNoLeasedWorkplace = workplaceLease === 'not_leased'
  const businessTypeGuideText =
    '사업자 유형은 대부분 일반과세자, 간이과세자, 면세사업자 중에서 선택합니다. 처음 온라인 쇼핑몰을 시작하고 예상 연 매출이 1억 4백만원 미만이며 간이과세 배제 업종이 아니라면 간이과세자를 먼저 검토하면 됩니다. 매출 규모가 크거나, 세금계산서 발행이 자주 필요하거나, 간이과세 선택이 불가능한 업종/지역에 해당하면 일반과세자를 선택해야 합니다. 면세사업자는 부가가치세가 면제되는 상품이나 용역을 판매할 때만 선택하며, 일반적인 사입/위탁 온라인 판매는 보통 면세사업자에 해당하지 않습니다.'
  const leaseGuideText = '임대차 정보는 임대차 입력/수정 클릭 후 임대차계약서에 적힌 정보를 그대로 입력해 주세요.'
  const secondTitle = type === 'joint' ? '사업장정보 및 업종코드 입력' : '사업장 정보입력 및 업종코드 입력'
  const secondBody =
    type === 'joint'
      ? `${hasLeasedWorkplace ? '사업장 임대차 내역을 입력하고 ' : ''}공동사업자 정보를 추가한 뒤, 판매 상품에 맞는 업종코드를 입력합니다.`
      : `${hasLeasedWorkplace ? '사업장 임대차 내역을 입력하고 ' : ''}판매 상품에 맞는 업종코드를 입력합니다.`

  if (hasNoLeasedWorkplace) {
    return [
      {
        title: '기본정보 입력',
        body: '대표자 정보를 입력한 후, 현재 사업장 상황에 맞게 항목을 선택해 주세요.',
      },
      {
        title: '사업장 정보입력, 업종코드, 사업자 유형 선택',
        body: `임대차 내역 입력 없이 사업장 정보를 확인하고 업종코드를 입력한 뒤 사업자 유형을 선택합니다. ${businessTypeGuideText}`,
      },
      ...(type === 'joint'
        ? [
            {
              title: '공동사업자 정보 입력',
              body: '공동사업자 정보입력 영역에서 공동사업자 인적사항과 지분율 등 필요한 정보를 입력합니다.',
            },
          ]
        : []),
    ]
  }

  return [
    {
      title: '기본정보 입력',
      body: '대표자 정보를 입력한 후, 현재 사업장 상황에 맞게 항목을 선택해 주세요.',
    },
    {
      title: secondTitle,
      body: secondBody,
    },
    {
      title: type === 'joint' ? '사업자유형,임대차 정보, 공동사업자 정보 입력' : '사업자 유형,임대차 정보 입력',
      body:
        type === 'joint'
          ? `${businessTypeGuideText} ${leaseGuideText} 공동사업자 정보까지 입력한 뒤 신청 내용을 저장합니다.`
          : `${businessTypeGuideText} ${leaseGuideText} 신청 내용을 확인한 뒤 저장합니다.`,
    },
  ]
}

export function expandRegistrationApplicationSteps(type, steps, workplaceLease) {
  return steps.flatMap((step) => {
    if (step.title !== '사업자등록 신청') return [step]
    const guideSteps = registrationApplicationGuideItems(type, workplaceLease).map((guide, guideIndex) => ({
      title: guide.title,
      summary: guide.body,
      detail: [guide.body],
      source: 'registrationApplicationGuide',
      guideIndex,
    }))
    return [step, ...guideSteps]
  })
}

export function registrationApplicationImageMarkup(type, guideIndex, hasNoLeasedWorkplace) {
  if (guideIndex === 0) {
    return { src: '/assets/guide/registration-start.png', alt: '홈택스 통신판매업 사업자 등록신청 기본정보 입력 화면' }
  }
  if (guideIndex === 1) {
    const src =
      hasNoLeasedWorkplace && type === 'joint'
        ? '/assets/guide/workplace-no-lease-joint.png'
        : `/assets/guide/${hasNoLeasedWorkplace ? 'workplace-no-lease.png' : 'workplace-lease-step1.png'}`
    return { src, alt: '홈택스 사업장 정보입력 및 업종코드 입력 화면' }
  }
  if (hasNoLeasedWorkplace && type === 'joint' && guideIndex === 2) {
    return { src: '/assets/guide/joint-no-lease.png', alt: '홈택스 공동사업자 정보 입력 화면' }
  }
  if (!hasNoLeasedWorkplace && type === 'joint' && guideIndex === 2) {
    return { src: '/assets/guide/joint-lease.png', alt: '홈택스 임대차 정보 및 공동사업자 정보 입력 화면' }
  }
  if (!hasNoLeasedWorkplace && type !== 'joint' && guideIndex === 2) {
    return { src: '/assets/guide/personal-lease.png', alt: '홈택스 사업자 유형 및 임대차 정보 입력 화면' }
  }
  return { placeholder: `안내 이미지 ${guideIndex + 1}` }
}

export function activeChecklistConfig(type, onboarding) {
  const status = onboarding.registrationStatus || 'not_started'
  const base = type === 'joint' ? checklistByType.joint : checklistByType.individual
  const steps = expandRegistrationApplicationSteps(type, checklistStepsFor(type, status), onboarding.workplaceLease)
  const statusLabel = {
    not_started: '처음부터 시작',
    applied: '신청 상태부터 시작',
    completed: '다음 행정절차부터 시작',
  }[status]
  return {
    ...base,
    title: `${base.label} 사업자등록 가이드`,
    desc: `${statusLabel}하는 맞춤 절차입니다. 선택 플랫폼: ${(onboarding.platforms || []).join(', ') || '미정'}`,
    steps,
  }
}

export function guideForStep(config, index) {
  const step = config.steps[index]
  if (step?.title === '사업자등록 정보 준비') return firstStepGuide
  if (step?.title === '사업자등록 신청') return []
  if (step?.source === 'registrationApplicationGuide') return [{ title: step.title, body: step.summary }]
  return defaultGuide
}

export function checklistProgressSummary(completedMap, type, onboarding) {
  const config = activeChecklistConfig(type, onboarding)
  const total = config.steps.length
  const done = config.steps.filter((_, index) => completedMap[index]).length
  const next = config.steps.find((_, index) => !completedMap[index])
  return {
    done,
    total,
    percent: percent(done, total),
    nextTitle: next?.title || '모든 단계를 완료했습니다',
  }
}

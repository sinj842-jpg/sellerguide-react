import { percent } from '../../utils/format'
import { platformLabel } from '../onboarding/onboardingLogic'

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

export const businessTypeCriteriaGuide = {
  title: '사업자 유형 판단기준',
  intro:
    '처음이라면 두 가지만 확인하면 충분해요. ① 예상 매출 규모 ② 세금계산서 발행이 잦은지 여부입니다. 예를 들어 이제 막 부업으로 스마트스토어를 시작해서 예상 월매출이 200~300만원 정도라면, 아래 기준상 간이과세자에 해당할 가능성이 높습니다.',
  examples: [
    {
      type: '간이과세자',
      criteria: '예상 연 매출 1억 4백만원 미만이고, 간이과세 배제 업종이 아닌 경우',
      example: '이제 막 스마트스토어를 시작하는 1인 셀러, 예상 월매출 300만원 수준',
    },
    {
      type: '일반과세자',
      criteria: '예상 매출이 크거나, 세금계산서 발행이 잦거나, 간이과세가 불가능한 업종·지역인 경우',
      example: '사입 규모가 커서 매입 세금계산서를 자주 받는 셀러, 예상 연매출 1억 4백만원 이상',
    },
    {
      type: '면세사업자',
      criteria: '부가가치세가 면제되는 상품·용역만 판매하는 경우',
      example: '농산물 직거래, 도서 판매 등 (일반적인 사입·위탁 온라인 판매는 대부분 해당하지 않음)',
    },
  ],
}

export const jointOwnerGuide = {
  title: '공동사업자 정보 입력 안내',
  body: [
    '지분율은 공동사업자 전원의 합이 반드시 100%가 되도록 입력해야 합니다.',
    '출자금은 사업에 실제 사용할 출자(투입)자금을 기준으로 입력하는 것이 원칙입니다. 다만 아직 금액이 확정되지 않았다면, 초기 동업계약서에는 임의로 소액(예: 각 100만 원)을 출자한 것으로 기재하고, 이후 실제 자금 집행이 완료된 뒤 투자 비용을 별도로 정산하거나 별도 합의서를 작성하는 방식도 실무상 가능합니다.',
  ],
}

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
    body: '간이과세자, 일반과세자, 면세사업자 중 본인 상황에 맞는 유형을 검토합니다. 자세한 선택 기준과 예시는 아래 "사업자 유형 확인하기"에서 확인하세요.',
  },
  {
    title: '사업자 유형 확인하기',
    body: '처음이라면 아래 세 가지 기준으로 나에게 맞는 사업자 유형을 확인하세요. 헷갈릴 땐 예시와 가장 비슷한 상황을 고르면 됩니다.',
    criteriaGuide: businessTypeCriteriaGuide,
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
    '사업자 유형은 일반과세자, 간이과세자, 면세사업자 중에서 선택합니다. 아래 기준과 예시를 참고해 본인 상황에 맞는 유형을 고르세요.'
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
        criteriaGuide: businessTypeCriteriaGuide,
      },
      ...(type === 'joint'
        ? [
            {
              title: '공동사업자 정보 입력',
              body: '공동사업자 정보입력 영역에서 공동사업자 인적사항과 지분율 등 필요한 정보를 입력합니다.',
              note: jointOwnerGuide,
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
      criteriaGuide: businessTypeCriteriaGuide,
      ...(type === 'joint' ? { note: jointOwnerGuide } : {}),
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
      criteriaGuide: guide.criteriaGuide,
      note: guide.note,
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
    desc: `${statusLabel}하는 맞춤 절차입니다. 선택 플랫폼: ${(onboarding.platforms || []).map(platformLabel).join(', ') || '미정'}`,
    steps,
  }
}

export function guideForStep(config, index) {
  const step = config.steps[index]
  if (step?.title === '사업자등록 정보 준비') return firstStepGuide
  if (step?.title === '사업자등록 신청') return []
  if (step?.source === 'registrationApplicationGuide')
    return [{ title: step.title, body: step.summary, criteriaGuide: step.criteriaGuide, note: step.note }]
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

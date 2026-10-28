/**
 * AI Technology — four topics, told as one story: the tools → what was built with them → a work task they
 * automated → the rules for using them. Structure only for now: each section says what it will cover
 * (`intent`) and lists the planned items (`plan`). Replace a section's `plan` with real content as it is written,
 * and add only facts and figures that can be checked (no invented numbers).
 */
export interface AiSection {
  id: string;
  title: string;
  /** What this section will show — shown on the page as the draft summary */
  intent: string;
  /** Planned items, shown as a checklist until the section is written */
  plan: string[];
}

export interface AiTopic {
  id: string;
  title: string;
  ko: string;
  sub: string;
  /** One-paragraph lede for the topic page and the index */
  summary: string;
  sections: AiSection[];
}

export const AI_TOPICS: AiTopic[] = [
  {
    id: "generative-ai",
    title: "Generative AI at Work",
    ko: "생성형 AI 활용",
    sub: "What Generative AI Did During the Internship",
    summary: "인턴십 기간에 생성형 AI를 어떤 업무에, 어떤 도구로 활용했는지 정리합니다.",
    sections: [
      { id: "what", title: "What Generative AI Is", intent: "생성형 AI의 개념과, 글을 다루는 언어 모델과 이미지를 만드는 생성 모델의 차이를 짧게 소개합니다.",
        plan: ["생성형 AI 한 문단 정의", "언어 모델 vs 이미지 생성 모델", "‘질문 → 생성 → 확인’ 기본 사용 방식"] },
      { id: "tools", title: "Tools Used During the Internship", intent: "실제로 사용한 도구와 각각의 용도를 표로 보여 줍니다.",
        plan: ["도구별 용도 표 (예: 코드 작성, 이미지 생성, 문서 정리)", "도구를 고른 이유", "사용 화면 캡처 (민감 정보 제외)"] },
      { id: "use-cases", title: "Use Cases", intent: "업무에서 생성형 AI를 활용한 대표 사례를 카드로 보여 줍니다.",
        plan: ["기술 자료 조사·요약", "설명 이미지 생성 (이 사이트의 AI 생성 이미지)", "발표 구성과 문서 정리"] },
      { id: "takeaways", title: "What Worked, What Didn't", intent: "효과가 컸던 부분과 한계가 드러난 부분을 함께 정리합니다.",
        plan: ["효과가 컸던 작업", "결과를 그대로 쓸 수 없었던 경우", "사람이 꼭 확인해야 하는 부분"] },
    ],
  },
  {
    id: "vibe-coding",
    title: "Vibe Coding: Building This Website",
    ko: "바이브 코딩과 홈페이지 구축",
    sub: "From Plain-Language Requests to a Working Website",
    summary: "자연어로 요청하고 AI가 코드를 만드는 바이브 코딩의 방식과, 이 방식으로 지금 보고 있는 홈페이지를 만든 과정을 소개합니다.",
    sections: [
      { id: "what", title: "What Is Vibe Coding", intent: "코드를 직접 쓰는 대신 원하는 결과를 말로 설명하고, AI가 만든 코드를 확인하며 다듬는 개발 방식을 설명합니다.",
        plan: ["바이브 코딩 정의", "기존 개발 방식과의 차이", "적합한 일 / 주의가 필요한 일"] },
      { id: "workflow", title: "The Workflow", intent: "요청 → 생성 → 확인 → 수정이 반복되는 실제 작업 흐름을 단계로 보여 줍니다.",
        plan: ["요청: 원하는 화면과 내용을 설명", "생성: AI가 코드 작성", "확인: 화면·빌드 검증", "수정: 피드백 반영 후 반복"] },
      { id: "this-site", title: "Building This Website", intent: "이 사이트의 구성과 사용한 기술, 배포 과정을 소개합니다.",
        plan: ["사이트 구성: Journey · Petroleum Technology · AI Technology · Beyond the Field", "기술 스택: Next.js · TypeScript · GitHub · Vercel", "변경 → PR → 병합 → 자동 배포 흐름"] },
      { id: "numbers", title: "By the Numbers", intent: "GitHub 기록에서 집계한 실제 수치로 작업 규모를 보여 줍니다.",
        plan: ["PR·커밋 수 (GitHub 기록 기준)", "페이지·토픽 수", "작업 기간"] },
      { id: "lessons", title: "Lessons", intent: "바이브 코딩으로 작업하며 배운 점을 정리합니다.",
        plan: ["요청을 구체적으로 쓰는 법", "결과를 검증하는 습관", "AI에 맡기기 어려웠던 부분"] },
    ],
  },
  {
    id: "production-report",
    title: "Automating the Daily Production Report",
    ko: "업무자동화 — Black Gold 생산일보 자동집계",
    sub: "From Manual Collation to an Automated Daily Report",
    summary: "캐나다 오일샌드 필드 Black Gold의 생산일보 집계 업무를 자동화하는 사례입니다. Python으로 일보 문서를 파싱해 Excel에 자동 기재하고, 그 결과를 대시보드로 보여 주는 응용 프로그램을 만듭니다.",
    sections: [
      { id: "problem", title: "The Problem", intent: "자동화 이전에 생산일보를 받아 Excel에 옮겨 적고 집계하던 작업 과정과, 그 과정의 반복 작업과 오류 가능성을 설명합니다.",
        plan: ["Black Gold 필드와 생산일보 소개 (공개 가능한 범위)", "기존 집계 절차 (단계별)", "반복 작업과 오류가 생기기 쉬운 지점"] },
      { id: "pipeline", title: "Parse → Excel: The Pipeline", intent: "Python 코드가 일보 문서를 읽어 필요한 값을 추출하고, Excel 집계표에 자동으로 기재하는 흐름을 그림으로 보여 줍니다.",
        plan: ["데이터 흐름도: 일보 문서 → Python 파싱 → Excel 자동 기재", "사용한 Python 라이브러리와 파일 형식", "검증 단계 (누락·이상값·중복 확인)"] },
      { id: "dashboard", title: "The Dashboard", intent: "집계된 자료를 한눈에 볼 수 있는 대시보드 응용 프로그램의 화면 구성과 기능을 소개합니다.",
        plan: ["대시보드 화면 구성 (익명화한 예시)", "주요 지표와 추이 그래프", "사용 방법 (실행 → 갱신 → 확인)"] },
      { id: "before-after", title: "Before & After", intent: "자동화 전후의 작업 시간과 단계를 비교합니다. 실측값이 아직 없으므로, 추정치를 쓸 때는 추정 근거와 함께 ‘추정’으로 표시합니다.",
        plan: ["작업 시간 비교 (추정 예정 · 근거 명시)", "작업 단계 수 비교", "정확도·일관성 변화"] },
      { id: "security", title: "Data & Security", intent: "공개 사이트에 맞게 실제 생산 자료 대신 익명화한 예시를 사용한다는 원칙을 밝힙니다.",
        plan: ["익명화한 예시 화면과 가상 데이터", "공개 범위 확인 결과", "내부 자료 취급 원칙"] },
    ],
  },
  {
    id: "responsible-ai",
    title: "Using AI Responsibly",
    ko: "AI 활용 원칙",
    sub: "Verify Sources, Never Invent Numbers, Protect the Data",
    summary: "이 사이트를 만들며 실제로 지킨 AI 활용 원칙과, 앞으로 업무에 적용할 방향을 정리합니다.",
    sections: [
      { id: "verify", title: "Verify, Then Trust", intent: "AI가 만든 기술 설명을 공개 자료와 대조해 확인하고 출처를 남긴 과정을 설명합니다.",
        plan: ["출처 확인 절차", "페이지별 출처 목록 사례", "확인할 수 없는 내용의 처리"] },
      { id: "no-invented-numbers", title: "No Invented Numbers", intent: "AI가 그럴듯한 수치를 만들어 낼 수 있다는 한계와, 검증되지 않은 수치를 쓰지 않는 원칙을 다룹니다.",
        plan: ["그럴듯한 오답(환각) 사례", "개념도에 ‘값 없음’을 표시한 이유", "수치를 쓸 때의 기준"] },
      { id: "protect-data", title: "Protect the Data", intent: "내부 자료와 개인정보를 AI 도구와 공개 사이트에서 다루는 기준을 정리합니다.",
        plan: ["AI 도구에 입력하지 않을 정보", "공개 사이트 게시 기준", "사내 보안 기준과의 연계"] },
      { id: "ahead", title: "Looking Ahead", intent: "석유개발 업무에서 생성형 AI를 더 활용할 수 있는 방향을 제안합니다.",
        plan: ["반복 업무 자동화 확대", "기술 자료 정리·검색", "사람의 판단이 필요한 영역"] },
    ],
  },
];

export const aiTopicHref = (t: AiTopic) => `/ai-technology/${t.id}`;

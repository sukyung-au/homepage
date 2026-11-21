/**
 * AI Technology — four topics, told as one story: the tools → a briefing deck made with them → this website →
 * a work task they automated. A draft topic's sections say what they will cover (`intent`) and list the
 * planned items (`plan`); once a topic is written, its body lives in a component (TOPIC_BODIES in
 * app/ai-technology/[topic]/page.tsx) and its sections here only feed the outline. Add only facts and figures
 * that can be checked (no invented numbers).
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
      { id: "how-llm-works", title: "How an LLM Works", intent: "LLM이 토큰 단위로 다음에 올 글을 예측해 답을 만드는 원리와, 학습 단계, 모델이 아는 것과 모르는 것을 설명합니다.",
        plan: ["토큰 → 어텐션 → 다음 토큰 예측 → 반복", "사전학습 · 미세조정 · RLHF", "컨텍스트 창, 최신 정보, 그럴듯함과 사실의 차이"] },
      { id: "tools", title: "Tools Used During the Internship", intent: "실제로 사용한 도구와 각각의 용도를 표로 보여 줍니다.",
        plan: ["도구별 용도 표 (예: 코드 작성, 이미지 생성, 문서 정리)", "도구를 고른 이유", "사용 화면 캡처 (민감 정보 제외)"] },
      { id: "use-cases", title: "Use Cases", intent: "업무에서 생성형 AI를 활용한 대표 사례를 카드로 보여 줍니다.",
        plan: ["기술 자료 조사·요약", "설명 이미지 생성 (이 사이트의 AI 생성 이미지)", "발표 구성과 문서 정리"] },
      { id: "takeaways", title: "What Worked, What Didn't", intent: "효과가 컸던 부분과 한계가 드러난 부분을 함께 정리합니다.",
        plan: ["효과가 컸던 작업", "결과를 그대로 쓸 수 없었던 경우", "사람이 꼭 확인해야 하는 부분"] },
    ],
  },
  {
    id: "ai-presentation",
    title: "AI-Powered Presentation",
    ko: "AI 기반 업무 발표자료 제작",
    sub: "From Field Information to a Briefing Deck",
    summary: "2027년도 작업계획 및 예산 검토 과정에서 Dana Claymore 유전의 일반현황을 정리하고, Claude를 활용해 HTML 기반 발표자료를 만들어 팀 내에서 발표한 경험입니다.",
    sections: [
      { id: "task", title: "The Task", intent: "작업계획·예산 검토를 위해 Claymore 유전의 일반현황을 정리해야 했던 업무 배경.", plan: [] },
      { id: "approach", title: "The Approach", intent: "Claude로 자료를 구조화하고 HTML 발표자료로 만든 과정.", plan: [] },
      { id: "outcome", title: "The Outcome", intent: "실제 발표자료의 대표 화면과 팀 내 발표.", plan: [] },
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
    ko: "업무자동화 — 공사 보유 해외 Oil Field 생산일보 자동집계",
    sub: "From Manual Collation to an Automated Daily Report",
    summary: "공사 보유 해외 Oil Field의 생산일보(ODR) 집계 업무를 자동화한 과정입니다.\n반복적인 수기 입력에서 문제를 발견하고 PDF를 읽어 검증한 뒤 Excel에 저장하는 프로그램과\n대시보드를 만들고 실무자 피드백으로 개선했습니다.",
    sections: [
      { id: "problem", title: "The Problem", intent: "매일 ODR PDF의 값을 Excel에 손으로 옮겨 적던 반복 업무와 그 문제.", plan: [] },
      { id: "solution", title: "The Solution", intent: "PDF 확인 · 데이터 검증 · Excel 저장을 하나로 묶은 Windows 프로그램.", plan: [] },
      { id: "dashboard", title: "The Dashboard", intent: "생산·품질 추세와 Well 비교(Split · Overlay · Selection Total) — 가상 데이터 데모.", plan: [] },
      { id: "before-after", title: "Feedback & Evolution", intent: "사용자와 사업부서 피드백으로 개선한 세 가지 사례.", plan: [] },
      { id: "outcome", title: "Outcome & Reflection", intent: "검증 결과와 배운 점.", plan: [] },
    ],
  },
];

export const aiTopicHref = (t: AiTopic) => `/ai-technology/${t.id}`;

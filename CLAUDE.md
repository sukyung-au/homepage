# Homepage

Next.js (App Router) + TypeScript 프로젝트. Vercel로 배포. "Oil & Gas Development" 탐사형 웹사이트.

- 개발 서버: `npm run dev`
- 빌드 확인: `npm run build` (푸시 전에 통과해야 함)
- 페이지: `src/app/` 아래. 메인은 `src/app/page.tsx`
- `main` 브랜치에 푸시하면 Vercel이 자동 배포
- 사이트 언어는 한국어 (본문 한국어, 제목·라벨은 영어 editorial 스타일)

## 디자인
- 시각적 기준(source of truth)은 Claude Design V1: `design/` (참고용, 앱 빌드에 포함되지 않음)
- 스타일은 `src/styles/tokens/`의 CSS 변수 + CSS Modules. Tailwind 패키지는 설치돼 있지만 `globals.css`에서 import하지 않음
- `DESIGN-notion.md`는 이전 디자인 참고 문서일 뿐, 현재 사이트 스타일을 결정하지 않음
- Journey 5단계(Exploration → Appraisal → Development & Drilling → Production → Decommissioning)는 `src/lib/stages.ts`, Technology 5개 카테고리·토픽은 `src/lib/technology.ts`
- Journey = 개발 프로젝트가 진행되는 과정, Technology = 그 과정에서 쓰이는 기술 지식
- 모든 Journey scene은 같은 필드 단면(`src/components/home/FieldSection.tsx`)을 카메라만 바꿔 보여 줌. 이전 9단계 Journey(V1)는 `main`의 커밋 5b557da와 `design/versions/JOURNEY-V1.md` 참고
- 모션/3D는 아직 구현하지 않음. 각 scene의 `data-motion`, `data-transition-*` 속성과 시각화 안의 `data-layer` / `data-sequence` / `data-step` 속성이 이후 스크롤 모션의 기준
- 기술 내용(수치·설명)을 임의로 추가하지 말 것

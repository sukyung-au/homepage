# Homepage

**OIL & GAS DEVELOPMENT — From Subsurface to Field Development.** 석유개발의 전 과정을 하나의 과학적 여정으로 탐색하는 웹사이트입니다. [Next.js](https://nextjs.org) (App Router)와 TypeScript로 만들고 [Vercel](https://vercel.com)로 배포합니다.

## 시작하기

의존성을 설치하고 개발 서버를 실행합니다.

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 사이트를 볼 수 있습니다. 파일을 수정하면 페이지가 자동으로 새로고침됩니다.

## 명령어

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 (푸시 전에 통과해야 함) |
| `npm run start` | 빌드된 결과물로 서버 실행 |
| `npm run lint` | ESLint 검사 |

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | Journey 홈페이지: 히어로, 단계 인덱스, 9개 scene, 하단 고정 StageNav (스크롤 위치를 따라감) |
| `/technology` | 첫 번째 토픽 페이지로 이동 |
| `/technology/[category]/[topic]` | Technology 토픽 페이지 템플릿과 하단 TechNav. 현재 `petroleum/pt-generation`(1.1)만 있음. `#topics`로 토픽 목록이 열림 |

## 폴더 구조

```
.
├── design/                 # Claude Design V1 원본 (참고용, 빌드에 포함되지 않음)
├── public/                 # 이미지 등 정적 파일 (사진은 public/images/)
└── src/
    ├── app/                # 페이지와 레이아웃 (App Router)
    ├── components/
    │   ├── ds/             # 디자인 시스템 컴포넌트 (StageNav, TechNav, TechViz …)
    │   ├── home/           # 홈페이지 scene
    │   ├── technology/     # 토픽 페이지
    │   └── site/           # 공통 scene 요소, 푸터
    ├── lib/                # 콘텐츠 데이터 (stages.ts, technology.ts) 와 시각화 렌더러
    └── styles/tokens/      # 디자인 토큰 (CSS 변수)
```

## 콘텐츠 수정

- **Journey 단계**: `src/lib/stages.ts`
- **Technology 토픽 추가**: `src/lib/technology.ts`에 토픽을 추가합니다. 페이지를 공개하려면 `hasPage: true`로 바꾸고 `src/app/technology/[category]/[topic]/page.tsx`의 `TOPIC_PAGES`에 등록합니다. 카테고리 5개는 고정이고, 토픽이 늘어나도 하단 바 레이아웃은 바뀌지 않습니다.
- **사진**: 사진 자리는 `<ImageSlot>`이 연한 파란색 자리 표시와 촬영 지시문을 보여 줍니다. 파일을 `public/images/`에 넣고 같은 `id`의 슬롯에 `src="/images/<id>.jpg"`를 지정하면 됩니다.
- **기술 시각화**: 지층 단면·탄성파·검층 등은 `src/lib/techviz.ts`가 그리는 예시 그림입니다. 실제 자료가 생기면 교체합니다.

## 디자인

- 시각적 기준은 Claude Design V1 (`design/`)입니다. `design/ui_kits/explorer/`에 원본 프로토타입, `design/chats/`에 디자인 대화 기록이 있습니다.
- 스타일은 `src/styles/tokens/`의 CSS 변수와 CSS Modules를 사용합니다. Tailwind는 설치만 되어 있고 사용하지 않습니다.
- `DESIGN-notion.md`는 이전 디자인 참고 문서입니다.
- 모션은 아직 구현하지 않았습니다. 각 scene `<section>`에 있는 `data-transition-in` / `-hold` / `-out`, `data-persist` 속성이 이후 스크롤 모션 작업의 기준입니다.

## 배포

`main` 브랜치에 푸시하면 Vercel이 자동으로 배포합니다. 푸시하기 전에 `npm run build`가 성공하는지 꼭 확인하세요.

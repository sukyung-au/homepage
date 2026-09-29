# Homepage

[Next.js](https://nextjs.org) (App Router), TypeScript, Tailwind CSS로 만든 홈페이지입니다. [Vercel](https://vercel.com)로 배포합니다.

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

## 폴더 구조

```
.
├── public/          # 이미지 등 정적 파일
└── src/app/         # 페이지와 레이아웃 (App Router)
    ├── layout.tsx   # 공통 레이아웃
    ├── page.tsx     # 메인 페이지
    └── globals.css  # 전역 스타일
```

## 배포

`main` 브랜치에 푸시하면 Vercel이 자동으로 배포합니다. 푸시하기 전에 `npm run build`가 성공하는지 꼭 확인하세요.

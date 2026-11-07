# Codex 작업 지시서 — Journey 5개 scene 실사 이미지

## 목표

홈페이지 Journey(`/`)의 5개 scene에 넓은 실사 이미지 자리가 placeholder로 비어 있습니다.
Codex의 내장 이미지 생성 기능으로 5장을 만들어 연결해 주세요.

지식은 본문 텍스트가 전달합니다. 이미지의 역할은 각 단계의 현장을 실제처럼 보여 주는 **실체감**입니다.
기존 SVG 단면도는 이미지 아래 펼침 메뉴 "Schematic cross-section"으로 옮겨 그대로 남겼습니다.

| id (파일명) | scene | 비율 · 크기 | 내용 |
|---|---|---|---|
| `journey-exploration` | 01 Exploration | 16:10 · 1600×1000 | 바다에서 스트리머를 끄는 탄성파 탐사선 |
| `journey-appraisal` | 02 Appraisal | 16:10 · 1600×1000 | 트레이에 놓인 코어 시료를 살펴보는 장면 |
| `journey-development` | 03 Development & Drilling | 2:1 · 1920×960 | 대형 크레인선이 강재 재킷 위에 상부 설비를 올리는 장면 |
| `journey-production` | 04 Production | 16:10 · 1600×1000 | 생산 중인 고정식 플랫폼 공정 데크를 걷는 작업자 |
| `journey-decommissioning` | 05 Decommissioning | 16:10 · 1600×1000 | 크레인선이 철거한 재킷 구간을 바지선에 싣는 장면 |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/home/Scenes.tsx`: `PHOTOS`가 이번 작업 대상
- `public/hero-surface.webp`: 메인 화면의 플랫폼 사진. 같은 필드처럼 보이도록 톤을 맞출 기준
- `docs/codex/TASK-re-overview-photo.md`, `public/images/technology/engineering/README.md`: 이전 작업 (파일 처리, README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 5장 생성
  - `public/images/journey/`에 저장하고 같은 폴더에 `README.md` 새로 작성
  - `PHOTOS`의 각 항목에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 페이지 수정
  - 작업과 무관한 미추적 파일(`.playwright-mcp/`, `CONTENT-MAP.md`, `Wettability.jpeg`, `output/`) 커밋
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 공통 스타일

- 사진처럼 보이는 자연스러운 다큐멘터리 톤, 밝은 낮 빛, 차분한 색
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F` (억지로 입히지 말고 어울리는 정도로)
- 5장이 한 프로젝트의 기록처럼 이어져 보여야 함
- 가상의 장면이며 실제 회사·선박·시설을 재현하지 않음
- **넣지 말 것:**
  - 글자, 숫자, 글자처럼 보이는 표식, 선명·선체 표기
  - 로고, 워터마크, 테두리
  - 사람 얼굴 (사람은 뒷모습이나 장갑 낀 손만)

## 프롬프트

모든 프롬프트 끝에 공통으로 붙입니다.

```
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings,
no hull names, no logos, no watermark, no borders, no visible faces.
```

### `journey-exploration` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph of a marine seismic survey vessel at sea, seen from a high rear
three-quarter angle. A wide flat stern with several long thin streamer cables running from the stern into the
water behind the ship, spreading out in parallel, marked by small tail buoys. Open calm sea, soft daylight,
pale overcast sky, plain unmarked hull.
```

### `journey-appraisal` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph of sandstone rock core samples laid out in long shallow trays on a work
bench, seen at a low angle with shallow depth of field. Cylindrical core sections, some split lengthwise to show
fine sedimentary layering. Gloved hands at the edge of the frame examine one piece. Soft cool daylight, neutral
palette with the warm sandstone as the accent. Trays are plain and unmarked.
```

### `journey-development` (2:1)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
2:1 wide landscape documentary photograph of offshore platform installation. A large heavy-lift crane vessel
lowers a complete platform topsides module onto a steel jacket standing in the open sea. Lifting slings run
from the crane hook to the module. The jacket legs rise from the water with clear lattice bracing. Bright
daylight, calm sea, distant horizon, wide composition with the lift at the centre.
```

### `journey-production` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph on the process deck of a producing fixed offshore platform. Horizontal
pressure vessels, continuous pipework, valves and steel grating, with open sea visible beyond the handrail. One
operator in coveralls and a hard hat walks away from the camera. Bright daylight, plain unmarked equipment,
pipework physically continuous and plausibly connected.
```

### `journey-decommissioning` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph of offshore platform removal. A large heavy-lift crane vessel lifts a
cut section of an old steel jacket, weathered with rust and marine growth, onto a flat transport barge. Open sea,
soft overcast daylight, muted colours, calm and orderly mood.
```

## 파일 처리

1. 크기 맞춤: 표의 크기대로. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/journey/<id>.webp`
4. `public/images/journey/README.md` 작성
   - 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지"
   - 프롬프트 전문 (수정 생성을 했다면 그 프롬프트도), 최종 크기·품질·용량 표

## 코드 연결

`src/components/home/Scenes.tsx`의 `PHOTOS` 각 항목에 `src`와 `alt`만 추가합니다. `id`, `placeholder`, `wide`는 그대로 둡니다.
`alt`는 한국어로 쓰고 "AI 생성 이미지"임을 밝힙니다.

```ts
exploration: {
  id: "journey-exploration",
  placeholder: "…(그대로)…",
  src: "/images/journey/journey-exploration.webp",
  alt: "바다에서 여러 줄의 스트리머를 끌고 가는 탄성파 탐사선을 표현한 AI 생성 이미지",
},
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/`의 5개 scene에서 이미지가 보이는지, "Schematic cross-section"을 펼치면 기존 도식이 나오는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·로고처럼 보이는 요소가 있음, 사람 얼굴이 보임
   - 스트리머가 선미에서 이어지지 않음
   - 코어가 원기둥 또는 반으로 쪼갠 형태가 아님
   - 크레인 슬링이 끊겨 있거나 인양물이 공중에 떠 있음
   - 재킷 다리가 물에서 올라오지 않음, 구조물이 물리적으로 말이 안 됨
   - 배관이 끊겨 있음
4. 5장의 색감이 서로, 그리고 `public/hero-surface.webp`와 어울리는지 확인

## 커밋

- 지금 브랜치 `claude/journey-photos`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Journey: add AI-generated scene photos`
- 푸시와 PR은 하지 말 것

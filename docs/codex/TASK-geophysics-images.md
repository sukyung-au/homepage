# Codex 작업 지시서 — Technology 1.1 Geophysics 이미지 생성

## 목표

Technology › 01 Geophysics › 1.1 **Role of Reservoir Geophysics** 페이지
(`/technology/geophysics/gp-fdp-role`)의 **03 From Seismic Signal to Subsurface Model** 구간에는
이미지 카드 4장이 있고, 지금은 점선 placeholder로 비어 있습니다.
Codex의 내장 이미지 생성 기능으로 이미지 4장을 만들어 페이지에 연결해 주세요.

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙. 특히 **기술 내용(수치·설명)을 임의로 추가하지 말 것**
- `src/components/technology/RoleOfReservoirGeophysicsTopic.tsx`: `WORKFLOW` 배열의 `img` 항목이 이번 작업 대상
- `src/components/ds/ImageSlot.tsx`: `src`가 없으면 placeholder, 있으면 `next/image`로 표시

## 작업 범위

- **해도 되는 것:** 이미지 4장 생성, `public/images/technology/geophysics/` 폴더 추가, `WORKFLOW[].img`의 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 페이지 문구, 레이아웃, CSS, 다른 토픽 수정
  - `main` 브랜치에 직접 커밋하거나 푸시하기 (`main`에 푸시하면 Vercel이 바로 배포함)

## 공통 스타일 (4장 모두)

- 비율 **4:3 가로**. 생성 후 **1600×1200**으로 맞춤
- 사이트 톤: 밝고 차분한 editorial 다큐멘터리 스타일, 차가운 중립 블루 계열
  - 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- **넣지 말 것:** 글자, 숫자, 라벨, 축, 눈금, 로고, 회사명·국기·선박명, 워터마크, 테두리, 콜라주
- 실제 특정 회사·현장·조사를 재현한 것처럼 보이지 않게 할 것 (가상의 일러스트)
- 카드 왼쪽 위에 번호 배지(01~04)가 겹치므로, 왼쪽 위 모서리에는 중요한 피사체를 두지 말 것

## 이미지별 사양

| # | id (파일명) | 카드 | 내용 |
|---|---|---|---|
| 01 | `gp-acquisition` | Seismic Acquisition | 해상 탄성파 탐사선 항공 사진풍 |
| 02 | `gp-seismic-section` | Processing & Imaging | 처리된 2D 탄성파 단면 시각화 |
| 03 | `gp-interpretation` | Seismic Interpretation | 해석 작업 중인 워크스테이션 |
| 04 | `gp-attribute-map` | Reservoir Characterization | 탄성파 속성 평면도 시각화 |

### 01 · `gp-acquisition`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization, high aerial view of a modern marine seismic survey
vessel at sea towing several long parallel streamer cables with small floats behind it, the streamers
spreading diagonally toward the lower right, faint white wake lines, calm deep blue open ocean, bright soft
daylight, neutral cool blue palette, crisp atmospheric depth. Vessel in the right half, upper-left corner
kept as open water. No text, no logos, no flags, no ship name, no markings, no borders, no collage.
```

### 02 · `gp-seismic-section`

```
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape clean scientific visualization of a processed 2D seismic reflection section: many thin,
continuous, closely spaced horizontal reflection bands in a blue–white–red polarity color map
(deep blue #1C3F9E, off-white #F4F1EA, deep red #B8322A), gently folded into a broad anticline in the
center, with two small normal faults offsetting the reflections on the right, deeper reflections slightly
weaker and noisier. Flat full-bleed image like a screen capture of seismic data, no axes, no tick marks,
no labels, no text, no grid, no borders, no 3D perspective.
```

### 03 · `gp-interpretation`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization, over-the-shoulder view from behind of a
geoscientist at a desk with two large monitors showing a 3D seismic data cube with colored interpreted
horizon surfaces (blue, cyan, amber) cutting through it, a quiet modern office with soft cool daylight,
shallow depth of field. The person is seen from behind and not identifiable. Screens show imagery only:
no readable text, no menus, no numbers, no logos, no brand names on the hardware. Neutral cool blue palette.
```

### 04 · `gp-attribute-map`

```
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape top-down map visualization of a seismic amplitude attribute over an elongated anticlinal
reservoir: a smooth continuous color ramp from deep navy and blue at the edges through cyan and green to
yellow and orange at the crest (#0B1F6B, #1F4FD1, #16A3D8, #3CC48C, #E9D43A, #F29A1F), subtle sinuous
channel-like patterns, thin dark structural contour lines following the closure. Flat full-bleed map,
no text, no labels, no numbers, no legend, no scale bar, no north arrow, no grid, no borders.
```

## 파일 처리

1. 4장을 생성하고, 원본 PNG는 Codex의 생성 이미지 폴더에 그대로 둠 (저장소에 넣지 않음)
2. 1600×1200으로 맞춘 뒤 **WebP 품질 84**로 변환
   - 파일당 **350KB 이하** 권장
   - 넘으면 품질을 78까지 낮춤
3. 저장 위치: `public/images/technology/geophysics/<id>.webp`
4. 같은 폴더에 `README.md`를 만들고 기록
   - 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지"라는 설명
   - 각 이미지의 프롬프트 전문

## 코드 연결

`src/components/technology/RoleOfReservoirGeophysicsTopic.tsx`의 `WORKFLOW`에서 각 `img`에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
img: {
  id: "gp-acquisition",
  placeholder: "Marine seismic vessel towing streamers at sea, aerial view",
  src: "/images/technology/geophysics/gp-acquisition.webp",
  alt: "스트리머를 예인하는 해상 탄성파 탐사선을 표현한 AI 생성 이미지",
},
```

나머지 3장의 alt:

- `gp-seismic-section`: "지층 반사면이 배사 구조로 휘어진 탄성파 단면을 표현한 AI 생성 이미지"
- `gp-interpretation`: "3D 탄성파 자료와 해석된 반사면을 보며 작업하는 해석 작업 화면을 표현한 AI 생성 이미지"
- `gp-attribute-map`: "저류층 위의 탄성파 속성 분포를 색으로 나타낸 평면도를 표현한 AI 생성 이미지"

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/geophysics/gp-fdp-role`의 03 구간 확인
   - 4장 모두 표시되는지
   - 왼쪽 위 번호 배지가 피사체를 가리지 않는지
   - 4장의 톤이 서로 어울리는지
3. 글자처럼 보이는 요소나 로고가 생성됐다면 그 이미지는 다시 생성

## 커밋

- 브랜치: `claude/tech-geophysics-role` (Geophysics 페이지 작업 브랜치). `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 1.1: add AI-generated workflow images for Role of Reservoir Geophysics`
- 푸시와 PR은 사용자가 요청할 때만

# Codex 작업 지시서 — Technology 1.3 Deepwater Resistivity Methods 이미지 생성

## 목표

Technology › 01 Geophysics › 1.3 **Deepwater Resistivity Methods** 페이지
(`/technology/geophysics/gp-resistivity`)에는 사진 자리 4곳이 있고, 지금은 점선 placeholder로 비어 있습니다.
Codex의 내장 이미지 생성 기능으로 이미지 4장을 만들어 페이지에 연결해 주세요.

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙. 특히 **기술 내용(수치·설명)을 임의로 추가하지 말 것**
- `src/components/technology/gpres/ResistivityTopic.tsx`: `IMAGES` 객체가 이번 작업 대상
- `src/components/ds/ImageSlot.tsx`: `src`가 없으면 placeholder, 있으면 `next/image`로 표시
- 참고: 1.1 이미지 작업 `docs/codex/TASK-geophysics-images.md`와 결과 `public/images/technology/geophysics/README.md` (톤을 맞출 것)

## 작업 범위

- **해도 되는 것:** 이미지 4장 생성, `public/images/technology/geophysics/`에 파일 추가, 같은 폴더 `README.md`에 기록 추가, `IMAGES`의 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 페이지 문구, 레이아웃, CSS, 다른 토픽 수정
  - 기존 1.1 이미지 4장 수정·삭제
  - `main` 브랜치에 직접 커밋하거나 푸시하기 (`main`에 푸시하면 Vercel이 바로 배포함)

## 공통 스타일 (4장 모두)

- 비율 **4:3 가로**. 생성 후 **1600×1200**으로 맞춤 (페이지의 사진 틀이 `aspect-ratio: 4 / 3`)
- 사이트 톤: 밝고 차분한 editorial 다큐멘터리 스타일, 차가운 중립 블루 계열. 1.1의 이미지 4장과 어울리게
  - 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- **넣지 말 것:** 글자, 숫자, 라벨, 축, 눈금, 범례, 로고, 회사명·국기·선박명, 워터마크, 테두리, 콜라주
- 실제 특정 회사·장비 모델·현장·조사를 재현한 것처럼 보이지 않게 할 것 (가상의 일러스트)

## 이미지별 사양

| # | id (파일명) | 위치 | 내용 |
|---|---|---|---|
| 01 | `gp-csem-survey` | 01 Opening (첫 화면) | 전자기 송신원 케이블을 예인하는 탐사선 항공 사진풍 |
| 02 | `gp-csem-receiver` | 03 Marine CSEM | 심해 해저에 놓인 전자기 수신기 |
| 03 | `gp-lwd-resistivity` | 05 Resistivity Logging | 지층 속 시추 구조의 LWD 비저항 도구 단면 일러스트 |
| 04 | `gp-csem-seismic` | 07 Bringing the Scales Together | 탄성파 단면 위에 겹친 비저항 모델 시각화 |

### 01 · `gp-csem-survey`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization, high aerial view of a mid-size offshore survey vessel
on calm deep blue open ocean, a single heavy umbilical cable leading from its stern down into the water at a
steep angle, faint white wake, no streamer spread, bright soft daylight, neutral cool blue palette, crisp
atmospheric depth. Vessel in the right half, generous open water on the left. No text, no logos, no flags,
no ship name, no hull markings, no borders, no collage.
```

### 02 · `gp-csem-receiver`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape underwater photograph-style visualization of a compact scientific electromagnetic receiver
resting on a flat, fine-grained deep seafloor: a small frame with a buoyant float on top, four long thin
horizontal sensor arms extending outward close to the sediment, a simple concrete anchor base, soft cone of
artificial light from above fading into dark blue water, a few suspended particles, calm and quiet.
Generic equipment design, no text, no logos, no serial numbers, no markings, no fish, no borders.
```

### 03 · `gp-lwd-resistivity`

```
Use case: technical illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape clean cutaway illustration of a vertical borehole through horizontally layered sedimentary
rock (beige sandstone, grey shale, one amber-tinted oil-bearing sand layer). Inside the borehole a drill
string ends in a bottomhole assembly with a drill bit; just above the bit a cylindrical logging tool with
a few slim coil bands emits faint concentric blue electromagnetic rings into the surrounding rock. Soft
editorial shading, light background, restrained palette of navy, blue, cyan and amber. No text, no labels,
no numbers, no arrows, no logos, no borders.
```

### 04 · `gp-csem-seismic`

```
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape flat visualization of a 2D seismic reflection section in muted greyscale with thin continuous
gently folded horizontal reflections forming a broad anticline, overlaid with a semi-transparent smooth
resistivity model in a cool-to-warm color ramp: mostly deep blue and cyan background, with one elongated
lens-shaped warm amber-to-orange resistive body sitting just beneath the crest of the anticline.
Full-bleed like a screen capture of interpretation data, no axes, no tick marks, no colorbar, no labels,
no text, no grid, no borders, no 3D perspective.
```

## 파일 처리

1. 4장을 생성하고, 원본 PNG는 Codex의 생성 이미지 폴더에 그대로 둠 (저장소에 넣지 않음)
2. 1600×1200으로 맞춘 뒤 **WebP 품질 84**로 변환
   - 파일당 **350KB 이하** 권장
   - 넘으면 품질을 78까지 낮춤
3. 저장 위치: `public/images/technology/geophysics/<id>.webp`
4. 같은 폴더의 `README.md`에 "Topic 1.3" 항목을 추가해 기록
   - 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지"라는 설명
   - 각 이미지의 프롬프트 전문

## 코드 연결

`src/components/technology/gpres/ResistivityTopic.tsx`의 `IMAGES`에서 각 항목에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
survey: {
  id: "gp-csem-survey",
  placeholder: "Survey vessel at sea towing an electromagnetic source cable, aerial view",
  src: "/images/technology/geophysics/gp-csem-survey.webp",
  alt: "전자기 송신원 케이블을 예인하는 해양 탐사선을 표현한 AI 생성 이미지",
},
```

나머지 3장의 alt:

- `gp-csem-receiver`: "심해 해저에 놓인 전자기 수신기를 표현한 AI 생성 이미지"
- `gp-lwd-resistivity`: "지층을 뚫는 시추 구조 끝의 시추 중 비저항 검층 도구를 단면으로 표현한 AI 생성 이미지"
- `gp-csem-seismic`: "탄성파 단면 위에 비저항이 높은 영역을 색으로 겹쳐 나타낸 해석 화면을 표현한 AI 생성 이미지"

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/geophysics/gp-resistivity` 확인
   - 4장 모두 표시되는지 (01은 첫 화면 오른쪽, 02·03은 03·05 구간 왼쪽, 04는 07 구간 왼쪽)
   - 4장의 톤이 서로, 그리고 1.1 이미지와 어울리는지
   - 모바일 폭(390px)에서도 잘리지 않고 보이는지
3. 글자처럼 보이는 요소나 로고가 생성됐다면 그 이미지는 다시 생성

## 커밋

- 브랜치: `claude/gp-resistivity` (1.3 페이지 작업 브랜치). `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 1.3: add AI-generated images for Deepwater Resistivity Methods`
- 푸시와 PR은 사용자가 요청할 때만

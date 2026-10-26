# Codex 작업 지시서 — Technology 3.1 Reservoir Engineering · PVT / SCAL 이미지 생성

## 목표

Technology › 03 Reservoir Engineering › 3.1 **Role of Reservoir Engineering** 페이지
(`/technology/engineering/re-role`)에 새로 추가한 두 구간에 실험실 사진 자리 3곳이 점선 placeholder로 비어 있습니다.
Codex의 내장 이미지 생성 기능으로 이미지 3장을 만들어 연결해 주세요.

- **04 Fluid Model — PVT Analysis**
- **05 Rock–Fluid Properties — SCAL & Relative Permeability**

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `re-pvt-lab` | 04 PVT, 시험 6단계 왼쪽 | 4:3 · 1600×1200 | PVT 실험실의 고압 가시 셀(visual cell) 장비 |
| `re-core-plugs` | 05 SCAL, 측정 항목 5개 왼쪽 | 4:3 · 1600×1200 | 실험 준비된 원통형 사암 코어 플러그 |
| `re-coreflood` | 05 SCAL, 상대투과도 측정 방법 위 | 16:9 · 1600×900 | 코어 홀더·펌프·배관으로 이루어진 코어 유동 실험 장치 |

상평형도와 상대투과도 곡선은 형태가 정확해야 해서 SVG로 직접 그렸습니다. **이번 작업 대상이 아닙니다.**

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/ReservoirFluidsSections.tsx`: `IMAGES` 상수가 이번 작업 대상
- `docs/codex/TASK-geophysics-images.md`: 같은 방식으로 처리한 이전 작업 (파일 처리, README 형식 참고)

## 작업 범위

- **해도 되는 것:**
  - 이미지 3장 생성
  - `public/images/technology/engineering/` 폴더와 README 추가
  - `IMAGES`의 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 그래프, 레이아웃, CSS, 다른 토픽 수정
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 공통 스타일

- 밝고 차분한 editorial 다큐멘터리 사진 스타일, 깨끗한 현대식 실험실, 차가운 중립 블루 계열
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- **넣지 말 것:**
  - 글자, 숫자, 계기판 눈금 값, 라벨 스티커 문구
  - 로고, 장비 제조사·회사명, 워터마크, 테두리
- 사람이 등장하면 손이나 뒷모습만 (얼굴로 특정 인물처럼 보이지 않게). 안전장갑·보안경 등 실험실 안전 수칙에 맞는 모습
- 실제 특정 회사·실험실을 재현한 것처럼 보이지 않게 할 것

## 01 · `re-pvt-lab` (4:3)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization of a clean modern PVT laboratory: a stainless-steel
high-pressure visual cell with a small glass sight window showing an amber crude oil sample with a thin gas
cap, mounted in a temperature-controlled cabinet, connected by fine stainless tubing to a positive-
displacement pump; a gloved hand adjusts a valve at the edge of the frame. Soft cool daylight, shallow depth
of field, neutral cool palette with the amber oil as the only warm accent. No readable text, no numbers on
gauges or screens, no logos, no brand names, no labels, no borders.
```

## 02 · `re-core-plugs` (4:3)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape close-up editorial photograph of several cylindrical sandstone core plugs standing upright and
lying on a clean white laboratory bench, fine sand grains and faint bedding laminations visible on their
sides, one plug partly wrapped in a thin heat-shrink sleeve as prepared for flow testing, a slab of split
whole core blurred in the background. Soft diffuse daylight, neutral cool palette with warm sand tones,
shallow depth of field. No text, no numbers, no sample labels, no logos, no borders.
```

## 03 · `re-coreflood` (16:9)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:9 landscape editorial photograph-style visualization of a laboratory core-flooding apparatus: a long
horizontal stainless-steel core holder mounted on a frame, connected by neat stainless tubing to precision
syringe pumps, back-pressure regulator and small fluid collection vials containing separated oil (amber) and
water layers, inside a clean modern laboratory with soft cool daylight. Calm, orderly composition with the
core holder across the middle of the frame. No readable text, no numbers on gauges or screens, no logos, no
brand names, no labels, no people's faces, no borders.
```

## 파일 처리

1. 크기 맞춤: `re-pvt-lab`과 `re-core-plugs`는 1600×1200, `re-coreflood`는 1600×900. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (파일당 350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/engineering/<id>.webp`
4. 같은 폴더에 `README.md` 작성
   - 생성 날짜, 생성 도구, "가상의 실험실 장면을 표현한 AI 생성 이미지"
   - 각 이미지의 프롬프트 전문

## 코드 연결

`src/components/technology/ReservoirFluidsSections.tsx`의 `IMAGES`에서 각 항목에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
pvtLab: {
  id: "re-pvt-lab",
  placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-pvt-lab.webp",
  alt: "고압 가시 셀로 저류층 유체 시료를 분석하는 PVT 실험실을 표현한 AI 생성 이미지",
},
corePlugs: {
  id: "re-core-plugs",
  placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-core-plugs.webp",
  alt: "특수 코어 분석을 위해 준비된 원통형 사암 코어 플러그를 표현한 AI 생성 이미지",
},
coreflood: {
  id: "re-coreflood",
  placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-coreflood.webp",
  alt: "코어 홀더와 펌프, 배관으로 이루어진 코어 유동 실험 장치를 표현한 AI 생성 이미지",
},
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/engineering/re-role`의 04·05 구간에서 세 이미지가 보이는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·로고처럼 보이는 요소가 있음
   - 장비 구조가 비현실적임 (배관이 공중에 끊겨 있는 등)
   - 사람 얼굴이 뚜렷함
4. 세 장의 색감과 조명이 서로, 그리고 Geophysics 이미지와 어울리는지 확인

## 커밋

- 지금 작업 중인 브랜치에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 3.1: add AI-generated PVT and SCAL laboratory images`
- 푸시와 PR은 사용자가 요청할 때만

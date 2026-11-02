# Codex 작업 지시서 — Technology 3.2 Reservoir Engineering Fundamentals · 05 Multiphase 실사 이미지

## 목표

Technology › 03 Reservoir Engineering › 3.2 **Reservoir Engineering Fundamentals** 페이지
(`/technology/engineering/re-fundamentals`)의 **05 When Oil, Water, and Gas Flow Together.** 섹션에
실사 이미지 자리 3곳이 placeholder로 비어 있습니다. Codex의 내장 이미지 생성 기능으로 3장을 만들어 연결해 주세요.

기존 SVG 도식(Inside a pore, Capillary tubes, Saturation–Height 그래프)은 **그대로 남깁니다.**
실사 이미지는 도식 옆에서 같은 개념을 사진처럼 보여 주는 보조 그림입니다. 라벨 정보는 도식이 맡습니다.

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `re-pore-scale` | Fluid Saturation 카드, 설명 아래 | 4:3 · 1600×1200 | 물에 젖은(water-wet) 사암 공극 확대: 입자 표면의 얇은 물막, 공극 가운데 석유, 작은 가스 기포 |
| `re-capillary-tubes` | Capillary Pressure 카드, 설명 아래 | 4:3 · 1600×1200 | 물이 담긴 수조에 굵은 유리관과 가는 유리관. 가는 관에서 물이 더 높이 올라감 |
| `re-saturation-height` | Saturation–Height 오른쪽, 식 아래 | 4:3 · 1600×1200 | 사암 저류층 단면 컷어웨이: 위에서부터 가스·석유·물, 석유 착색이 전이대에서 점점 옅어짐 |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/fundamentals/LabAdditions.tsx`: `IMAGES`의 `pore`, `capillary`, `satHeight`가 이번 작업 대상
- `src/components/technology/fundamentals/Multiphase.tsx`: `PoreDiagram`, `CapillaryTubes` (이미지가 맞춰야 할 도식)
- `docs/codex/TASK-re-fluids-scal-images.md`, `public/images/technology/engineering/README.md`: 같은 폴더의 이전 작업 (파일 처리, README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 3장 생성
  - `public/images/technology/engineering/`에 저장하고 README에 항목 추가
  - `IMAGES`의 `pore`·`capillary`·`satHeight`에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 토픽 수정
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 공통 스타일

- 같은 페이지의 `re-core-plugs`·`re-coreflood`와 어울리는 밝고 차분한 editorial 사진 스타일
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`. 석유는 amber~짙은 갈색, 물은 투명~옅은 청색
- **넣지 말 것:**
  - 글자, 숫자, 눈금, 화살표, 라벨, 범례
  - 로고, 워터마크, 테두리, 사람
- 도식과 개념이 어긋나지 않게 할 것 (아래 각 항목의 "반드시")

## 01 · `re-pore-scale` (4:3)

반드시: 입자 표면을 물이 얇게 감싸고(water-wet), 석유는 입자에 직접 닿지 않고 공극 가운데에 있음. 가스는 작은 기포 하나 정도.

```
Use case: photorealistic-natural. Asset type: illustrative website image for oil and gas education.
4:3 landscape macro photograph-style visualization of the pore space between rounded quartz sandstone grains,
as if seen through a microscope cross-section. Water-wet rock: every grain surface is coated by a thin, clear,
slightly bluish water film; an amber-brown oil droplet fills the centre of the pore without touching the grain
surfaces; one small clear gas bubble sits inside the oil. Soft even lighting, neutral cool background tones,
warm sand-coloured grains, crisp detail, shallow depth of field at the edges. No text, no numbers, no arrows,
no labels, no scale bar, no logos, no watermark, no borders.
```

## 02 · `re-capillary-tubes` (4:3)

반드시: 수조 수면보다 두 관 모두 물이 올라가 있고, **가는 관이 더 높이** 올라감. 물-공기 경계(메니스커스)는 아래로 오목함(water-wet).

```
Use case: photorealistic-natural. Asset type: illustrative website photography for physics/oil and gas education.
4:3 landscape clean laboratory photograph of a shallow clear glass dish of water with two vertical clear glass
capillary tubes standing in it, held by a simple unmarked clamp: one wider tube and one much narrower tube.
Water in both tubes rises above the dish's water level, and clearly higher in the narrow tube than in the wide
tube; each water column ends in a concave (downward-curving) meniscus. Water very lightly tinted pale blue so
the columns are visible. Plain light background, soft daylight, calm minimal composition. No text, no numbers,
no rulers or scale marks, no labels, no logos, no people, no watermark, no borders.
```

## 03 · `re-saturation-height` (4:3)

반드시: 위에서부터 가스 → 석유 → 물 순서. 석유 구간 아래쪽에서 물 구간으로 **갑자기가 아니라 점점** 바뀌는 전이대. 경계선을 선이나 글자로 표시하지 않음.

```
Use case: photorealistic-natural. Asset type: illustrative website image for oil and gas education.
4:3 landscape photorealistic cutaway render of a block of layered sandstone reservoir rock beneath an arched
dark shale cap rock. Inside the porous sandstone, fluids are stacked by density: a pale, slightly grey gas-filled
zone at the top, a rich amber-brown oil-stained zone in the middle, and clean grey-blue water-saturated sandstone
at the bottom. Between the oil zone and the water zone the oil staining fades gradually over a band of the rock
rather than stopping at a sharp line. Soft studio lighting on the cut face, neutral background, crisp rock
texture. No text, no numbers, no arrows, no lines marking contacts, no labels, no logos, no watermark, no borders.
```

## 파일 처리

1. 크기 맞춤: 3장 모두 1600×1200. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (파일당 350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/engineering/<id>.webp`
4. 같은 폴더의 `README.md`에 새 항목 추가 (기존 내용은 유지)
   - 생성 날짜, 생성 도구, "개념을 표현한 AI 생성 이미지"
   - 각 이미지의 프롬프트 전문 (수정 생성을 했다면 그 프롬프트도)

## 코드 연결

`src/components/technology/fundamentals/LabAdditions.tsx`의 `IMAGES`에서 세 항목에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
pore: {
  id: "re-pore-scale",
  placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-pore-scale.webp",
  alt: "물에 젖은 사암 입자 사이 공극에 석유와 가스 기포가 있는 모습을 표현한 AI 생성 이미지",
},
capillary: {
  id: "re-capillary-tubes",
  placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-capillary-tubes.webp",
  alt: "굵은 유리관보다 가는 유리관에서 물이 더 높이 올라가는 모세관 상승을 표현한 AI 생성 이미지",
},
satHeight: {
  id: "re-saturation-height",
  placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-saturation-height.webp",
  alt: "덮개암 아래 사암 저류층에 가스·석유·물이 높이에 따라 나뉘고 전이대에서 석유 착색이 옅어지는 단면을 표현한 AI 생성 이미지",
},
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/engineering/re-fundamentals#multiphase`에서 세 이미지가 보이는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·눈금·화살표·로고처럼 보이는 요소가 있음
   - 공극: 석유가 입자 표면에 직접 붙어 있음 (oil-wet처럼 보임)
   - 모세관: 굵은 관이 더 높거나 같음, 메니스커스가 볼록함
   - 단면: 순서가 가스-석유-물이 아님, 석유-물 경계가 칼로 자른 듯 날카로움
4. 세 장의 색감이 서로, 그리고 `re-core-plugs`·`re-coreflood`와 어울리는지 확인

## 커밋

- 지금 브랜치 `claude/re-multiphase-photos`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 3.2: add AI-generated multiphase images (pore, capillary, cutaway)`
- 푸시와 PR은 사용자가 요청할 때만

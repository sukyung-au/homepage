# Codex 작업 지시서 — Technology 2.1 Role of Geology · 첫 화면 실사 이미지

## 목표

Technology › 02 Geology › 2.1 **Role of Geology** 페이지(`/technology/geology/ge-fdp-role`)
첫 화면 오른쪽에 실사 이미지 자리 1곳이 placeholder로 비어 있습니다. Codex의 내장 이미지 생성 기능으로 1장을 만들어 연결해 주세요.

기존 SVG 단면도("Conceptual illustration — not to scale")는 이미지 아래 펼침 메뉴 "Schematic cross-section"으로 옮겨 그대로 남겼습니다.
실사 이미지는 **이 도식과 같은 장면**을 사진처럼 보여 줘야 합니다. 도식의 표시는 Seal(덮개암), Reservoir(저류암의 구조와 두께), Well Data(코어·검층) 세 가지입니다.

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `ge-role-cutaway` | 첫 화면 오른쪽 (최대 약 760px) | 16:10 · 1600×1000 | 배사 구조의 덮개암과 저류암, 그 구조를 관통하는 두 시추정을 보여 주는 해상 3D 컷어웨이 |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/RoleOfGeologyTopic.tsx`: `OPENING_PHOTO`가 이번 작업 대상, `OpeningFigure`의 SVG가 맞춰야 할 도식
- `src/components/home/FieldSection.tsx`: 지층(`H`), 석유 구간(`OIL`, `OWC`), 리그(`Rig`) 모양
- `public/images/technology/geophysics/gp-role-cutaway.webp`: 바로 앞 토픽 1.1의 첫 화면 컷어웨이. **이 이미지와 같은 시리즈처럼 보이도록** 구도·조명·지층 질감·색을 맞출 것 (스타일 참고 이미지로 써도 됨). 단, 탐사선·스트리머·탄성파 경로선은 넣지 않음
- `public/images/technology/geology/README.md`: 같은 폴더의 이전 작업 (README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 1장 생성
  - `public/images/technology/geology/`에 저장하고 README에 항목 추가 (기존 내용 유지)
  - `OPENING_PHOTO`에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 토픽 수정
  - 작업과 무관한 미추적 파일(`.playwright-mcp/`, `CONTENT-MAP.md`, `Wettability.jpeg`, `output/`) 커밋
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 반드시 지킬 구조 (도식과 같게)

1. 위쪽은 해수면과 하늘, 아래쪽은 물기둥·해저·지층을 잘라 낸 컷어웨이 (1.1 이미지와 같은 방식)
2. 해저 아래 지층이 가운데에서 위로 볼록한 **배사(anticline)** 구조. 모든 층이 같은 볼록한 모양을 따름
3. 위에서부터: 상부 지층 여러 층 → 얇고 치밀한 짙은 회색 **덮개암(seal)** → 다공질 사암 **저류암**(눈에 띄게 두껍게) → 그 아래 지층
4. 저류암 안에서 배사 꼭대기 쪽만 amber 색 석유로 차 있고, 그 아래와 양쪽 날개는 청회색 물. 석유–물 경계는 **수평**
5. 바다 위에 **해상 시추 리그 2기**, 각각에서 **수직 시추정 1개**가 해저를 지나 저류암까지 내려감
   - 하나는 배사 꼭대기 바로 왼쪽, 석유 구간에서 끝남
   - 다른 하나는 오른쪽 날개, 저류암 아래쪽(물 구간)까지 내려감
6. 글자, 라벨, 화살표, 선으로 무엇인지 표시하지 않음 (형태와 색으로만 구분)

## 공통 스타일

- `gp-role-cutaway`와 같은 사실적인 3D 컷어웨이 렌더, 밝은 낮 빛, 차분한 색
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- 가상의 장면이며 실제 회사·시설을 재현하지 않음
- **넣지 말 것:**
  - 글자, 숫자, 글자처럼 보이는 표식, 축척, 범례
  - 로고, 워터마크, 테두리, 사람, 배, 탄성파 경로선

## 프롬프트 · `ge-role-cutaway` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website image for oil and gas education.
16:10 landscape photorealistic 3D cutaway render of an offshore block, seen slightly from above and the front,
matching the style of the reference cutaway image. The upper part shows calm open sea under a pale daylight sky;
the front face of the block is cut away to reveal the water column, the seabed and the sedimentary rock layers
beneath it. Beneath the seabed, all rock layers are stacked and folded upward into a broad, gentle anticline in
the centre. From top to bottom: several overburden layers; a thin, dense, dark grey seal layer following the fold;
a clearly thicker porous sandstone reservoir layer beneath it; and deeper grey rock below. Inside the reservoir
sandstone only, the crest is saturated with amber-brown oil and the rest of the reservoir, below and on both
flanks, is blue-grey water-saturated sandstone, separated by a perfectly horizontal flat boundary. Two offshore
drilling rigs stand on the sea: one just left of the crest, whose thin vertical steel well descends through the
water, the seabed and the seal and ends in the oil zone; and one on the right flank, whose thin vertical well
descends into the lower, water-bearing part of the reservoir. Soft natural lighting, crisp rock textures, calm
educational look, cool blue palette with warm sandstone and amber oil as accents.
Fictional scene, not a real company or facility. No readable text, no numbers, no text-like markings, no scale
bar, no arrows, no lines marking boundaries, no labels, no legend, no ships, no people, no logos, no watermark,
no borders.
```

## 파일 처리

1. 크기 맞춤: 1600×1000. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/geology/ge-role-cutaway.webp`
4. 같은 폴더의 `README.md`에 새 항목 추가 (기존 내용 유지)
   - 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지"
   - 프롬프트 전문 (수정 생성을 했다면 그 프롬프트도), 참고 이미지 사용 여부, 크기·품질·용량

## 코드 연결

`src/components/technology/RoleOfGeologyTopic.tsx`의 `OPENING_PHOTO`에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
const OPENING_PHOTO = {
  id: "ge-role-cutaway",
  placeholder: "…(그대로)…",
  src: "/images/technology/geology/ge-role-cutaway.webp",
  alt: "배사 구조의 덮개암 아래 저류암 꼭대기에 석유가 모여 있고, 두 해상 리그의 시추정이 저류암까지 내려간 단면을 표현한 AI 생성 이미지",
};
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/geology/ge-fdp-role`에서 이미지가 보이는지, "Schematic cross-section"을 펼치면 기존 도식이 나오는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·로고처럼 보이는 요소가 있음, 사람이나 배가 있음
   - 지층이 위로 볼록한 배사 구조가 아님, 가운데가 처진 층이 있음
   - 덮개암이 저류암 바로 위에 얇은 짙은 층으로 구분되지 않음
   - 석유가 저류암 밖(덮개암 위나 아래 지층)에 있음, 석유–물 경계가 수평이 아님
   - 리그·시추정이 2개가 아님, 시추정이 리그에서 이어지지 않음, 저류암까지 닿지 않음
   - 물·해저·지층의 위아래 순서가 물리적으로 맞지 않음
4. 확대해서 리그와 장비에 글자처럼 보이는 표식이 없는지 확인
5. `gp-role-cutaway`와 나란히 놓고 같은 시리즈처럼 보이는지 확인

## 커밋

- 지금 브랜치 `claude/ge-role-opening-photo`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 2.1: add AI-generated opening cutaway image`
- 푸시와 PR은 하지 말 것

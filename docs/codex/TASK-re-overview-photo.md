# Codex 작업 지시서 — Technology 3.2 Reservoir Engineering Fundamentals · 01 저류층 단면 실사 이미지

## 목표

Technology › 03 Reservoir Engineering › 3.2 **Reservoir Engineering Fundamentals** 페이지
(`/technology/engineering/re-fundamentals`)의 **01 Understanding the Reservoir Before Developing the Field.** 섹션 맨 위에
넓은 실사 이미지 자리 1곳이 placeholder로 비어 있습니다. Codex의 내장 이미지 생성 기능으로 1장을 만들어 연결해 주세요.

기존 SVG 단면도(`ReservoirSection`, "Conceptual cross-section · not to scale")는 이미지 아래 펼침 메뉴
"Schematic cross-section"으로 옮겨 그대로 남겼습니다. 실사 이미지는 **이 도식과 같은 구조**를 사진처럼 보여 줘야 합니다.

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `re-reservoir-cutaway` | 01 섹션 맨 위, 전체 너비 (최대 1040px) | 16:9 · 1920×1080 | 배사 구조 저류층의 3D 단면 컷어웨이: 덮개암 아래 가스·석유·물, 꼭대기를 지나는 수직 생산정 |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/fundamentals/ReservoirSection.tsx`: 이미지가 맞춰야 할 도식 (`kind="overview"`)
- `src/components/technology/fundamentals/FundamentalsTopic.tsx`: `OVERVIEW_PHOTO`가 이번 작업 대상
- `docs/codex/TASK-re-multiphase-photos.md`, `public/images/technology/engineering/README.md`: 같은 폴더의 이전 작업 (파일 처리, README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 1장 생성
  - `public/images/technology/engineering/`에 저장하고 README에 항목 추가
  - `OVERVIEW_PHOTO`에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 토픽 수정
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 반드시 지킬 구조 (도식과 같게)

1. 지층이 위로 볼록하게 휜 **배사(anticline)** 구조
2. 위에서부터 차례대로:
   - 상부 지층(overburden)
   - 얇고 치밀한 **덮개암(cap rock)**
   - 다공질 사암 **저류층**
   - 그 아래 지층
3. 저류층 안 유체는 위에서부터 **가스 → 석유 → 물** 순서로 채워짐
   - 가스는 연한 크림색, 석유는 amber~짙은 주황/갈색, 물은 청회색
4. 가스–석유, 석유–물 경계는 지층을 따라 휘지 않고 **수평**
   - 배사 꼭대기 쪽에만 가스와 석유가 있고, 양쪽 날개(flank) 아래쪽은 물
5. 배사 꼭대기를 지나는 **수직 생산정 1개**가 지표에서 석유 구간까지 내려감
   - 지표에는 작고 단순한 유정 헤드만 (시추 리그 없음)
6. 화살표, 선, 라벨로 경계나 유동을 표시하지 않음 (색과 질감으로만 구분)

## 공통 스타일

- 같은 페이지의 `re-saturation-height`(단면 컷어웨이)와 어울리는 사실적인 3D 지질 렌더
  - 부드러운 스튜디오 조명, 깨끗한 중립 배경
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- **넣지 말 것:**
  - 글자, 숫자, 축척, 화살표, 라벨, 범례
  - 로고, 워터마크, 테두리, 사람

## 프롬프트 · `re-reservoir-cutaway` (16:9)

```
Use case: photorealistic-natural. Asset type: illustrative website image for oil and gas education.
16:9 landscape photorealistic 3D cutaway render of a block of the Earth's subsurface, seen slightly from above
and the front, with a thin natural ground surface on top. The cut face shows sedimentary layers folded upward
into a broad, gentle anticline. From top to bottom: several layers of overburden rock; a thin dense dark grey
cap rock layer following the fold; a porous sandstone reservoir layer beneath it; and deeper grey rock below.
Inside the reservoir sandstone only, the pore fluids are stacked by density with perfectly horizontal
boundaries: a pale cream gas-filled zone at the crest, a rich amber-orange oil-saturated zone below it, and
blue-grey water-saturated sandstone filling the lower flanks on both sides. One thin vertical steel well
descends from a small simple wellhead on the ground surface, straight through the crest of the fold, ending in
the oil zone. Soft studio lighting, clean neutral background, crisp rock textures, calm educational look.
No text, no numbers, no scale bar, no arrows, no lines marking contacts, no labels, no legend, no drilling rig,
no people, no logos, no watermark, no borders.
```

## 파일 처리

1. 크기 맞춤: 1920×1080. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (400KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/engineering/re-reservoir-cutaway.webp`
4. 같은 폴더의 `README.md`에 새 항목 추가 (기존 내용은 유지)
   - 생성 날짜, 생성 도구, "개념을 표현한 AI 생성 이미지"
   - 프롬프트 전문 (수정 생성을 했다면 그 프롬프트도)

## 코드 연결

`src/components/technology/fundamentals/FundamentalsTopic.tsx`의 `OVERVIEW_PHOTO`에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
const OVERVIEW_PHOTO = {
  id: "re-reservoir-cutaway",
  placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-reservoir-cutaway.webp",
  alt: "배사 구조 덮개암 아래 저류층에 가스·석유·물이 차례로 있고 수직 생산정이 꼭대기를 지나는 단면을 표현한 AI 생성 이미지",
};
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/engineering/re-fundamentals#evaluation`에서 이미지가 보이는지, 아래 "Schematic cross-section"을 펼치면 기존 도식이 나오는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·화살표·선·로고처럼 보이는 요소가 있음
   - 유체 순서가 가스–석유–물이 아님
   - 유체 경계가 지층을 따라 휘어 있음 (수평이어야 함)
   - 저류층 밖(덮개암 위나 아래 지층)에 석유·가스가 있음
   - 유정이 없거나 여러 개, 또는 시추 리그가 있음
4. 색감이 `re-saturation-height`와 어울리는지 확인

## 커밋

- 지금 브랜치 `claude/re-overview-photo`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 3.2: add AI-generated reservoir cutaway image`
- 푸시와 PR은 사용자가 요청할 때만

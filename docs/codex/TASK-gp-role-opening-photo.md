# Codex 작업 지시서 — Technology 1.1 Role of Reservoir Geophysics · 첫 화면 실사 이미지

## 목표

Technology › 01 Geophysics › 1.1 **Role of Reservoir Geophysics** 페이지(`/technology/geophysics/gp-fdp-role`)
첫 화면 오른쪽에 실사 이미지 자리 1곳이 placeholder로 비어 있습니다. Codex의 내장 이미지 생성 기능으로 1장을 만들어 연결해 주세요.

기존 SVG 단면도("Conceptual illustration — not to scale")는 이미지 아래 펼침 메뉴 "Schematic cross-section"으로 옮겨 그대로 남겼습니다.
실사 이미지는 **이 도식과 같은 장면**을 사진처럼 보여 줘야 합니다.

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `gp-role-cutaway` | 첫 화면 오른쪽 (최대 약 760px) | 16:10 · 1600×1000 | 바다 위 탄성파 탐사선과 그 아래 휜 지층, 구조를 관통하는 시추정을 함께 보여 주는 3D 컷어웨이 |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/RoleOfReservoirGeophysicsTopic.tsx`: `OPENING_PHOTO`가 이번 작업 대상, `OpeningFigure`의 SVG가 맞춰야 할 도식
- `src/components/home/FieldSection.tsx`: 도식에 쓰인 탐사선(`SeismicSurvey`)·리그(`Rig`)·지층(`H`) 모양
- `public/images/technology/engineering/re-reservoir-cutaway.webp`: 같은 사이트의 컷어웨이 렌더. 톤을 맞출 기준
- `public/images/technology/geophysics/README.md`: 같은 폴더의 이전 작업 (README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 1장 생성
  - `public/images/technology/geophysics/`에 저장하고 README에 항목 추가 (기존 내용 유지)
  - `OPENING_PHOTO`에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 토픽 수정
  - 작업과 무관한 미추적 파일(`.playwright-mcp/`, `CONTENT-MAP.md`, `Wettability.jpeg`, `output/`) 커밋
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 반드시 지킬 구조 (도식과 같게)

1. 화면 위쪽은 해수면과 하늘, 아래쪽은 바다 밑 지층의 단면 (블록을 잘라 낸 컷어웨이)
2. 해수면 위 왼쪽에 **탄성파 탐사선 1척**, 선미에서 스트리머 케이블이 뒤로 뻗음
3. 해저면 아래 지층은 여러 층으로 쌓여 있고, 가운데가 위로 볼록한 **배사(anticline)** 구조
4. 탐사선 아래 지층 경계에서 반사되어 올라오는 음파는 **가늘고 은은한 반투명 경로선**으로만 표현 (선택 사항, 지저분해지면 빼도 됨)
5. 배사 꼭대기 근처 바다 위에 **해상 시추 리그 1기**, 그 아래로 **수직 시추정 1개**가 해저를 지나 배사 구조 안까지 내려감
6. 글자, 라벨, 화살표로 무엇인지 표시하지 않음 (형태와 색으로만 구분)

## 공통 스타일

- `re-reservoir-cutaway`와 어울리는 사실적인 3D 컷어웨이 렌더, 밝은 낮 빛, 차분한 색
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- 가상의 장면이며 실제 회사·선박·시설을 재현하지 않음
- **넣지 말 것:**
  - 글자, 숫자, 글자처럼 보이는 표식, 선명·선체 표기, 축척, 범례
  - 로고, 워터마크, 테두리, 사람

## 프롬프트 · `gp-role-cutaway` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website image for oil and gas education.
16:10 landscape photorealistic 3D cutaway render of an offshore block, seen slightly from above and the front.
The upper part shows calm open sea under a pale daylight sky; the front face of the block is cut away to reveal
the water column, the seabed and the sedimentary rock layers beneath it. On the sea surface at the left, one
marine seismic survey vessel tows several long thin streamer cables behind its stern. Beneath the seabed,
several rock layers are stacked and folded upward into a broad, gentle anticline in the centre. Optional: a few
very faint, thin, translucent sound-wave ray paths travel down from the vessel area and reflect upward off the
layer boundaries back to the streamers. Near the crest of the fold, one offshore drilling rig stands on the sea,
and one thin vertical well descends from it through the water and the seabed straight down into the top of the
fold. Soft natural lighting, crisp rock textures, calm educational look, cool blue palette with warm sandstone
layers as accent.
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings,
no hull names, no scale bar, no arrows, no labels, no legend, no people, no logos, no watermark, no borders.
```

## 파일 처리

1. 크기 맞춤: 1600×1000. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/geophysics/gp-role-cutaway.webp`
4. 같은 폴더의 `README.md`에 새 항목 추가 (기존 내용 유지)
   - 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지"
   - 프롬프트 전문 (수정 생성을 했다면 그 프롬프트도), 크기·품질·용량

## 코드 연결

`src/components/technology/RoleOfReservoirGeophysicsTopic.tsx`의 `OPENING_PHOTO`에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
const OPENING_PHOTO = {
  id: "gp-role-cutaway",
  placeholder: "…(그대로)…",
  src: "/images/technology/geophysics/gp-role-cutaway.webp",
  alt: "바다 위 탄성파 탐사선과 해저 아래 배사 구조로 휜 지층, 그 구조를 관통하는 시추정을 함께 보여 주는 단면을 표현한 AI 생성 이미지",
};
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/geophysics/gp-fdp-role`에서 이미지가 보이는지, "Schematic cross-section"을 펼치면 기존 도식이 나오는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·로고처럼 보이는 요소가 있음, 사람이 있음
   - 탐사선이 없거나 여러 척, 스트리머가 선미에서 이어지지 않음
   - 지층이 위로 볼록한 배사 구조가 아님
   - 리그나 시추정이 없거나 여러 개, 시추정이 리그에서 이어지지 않음
   - 음파 경로선이 굵거나 화살표처럼 보임, 화면을 어지럽힘
   - 물·해저·지층의 위아래 순서가 물리적으로 맞지 않음
4. 확대해서 선체·리그·크레인에 글자처럼 보이는 표식이 없는지 확인
5. 색감이 `re-reservoir-cutaway`와 어울리는지 확인

## 커밋

- 지금 브랜치 `claude/gp-role-opening-photo`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 1.1: add AI-generated opening cutaway image`
- 푸시와 PR은 하지 말 것

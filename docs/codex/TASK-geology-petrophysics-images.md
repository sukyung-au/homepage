# Codex 작업 지시서 — Technology 2.1 Geology · Petrophysics 이미지 생성

## 목표

Technology › 02 Geology › 2.1 **Role of Geology** 페이지(`/technology/geology/ge-fdp-role`)의
**04 Petrophysics — Reading the Rock Through Logs** 구간에 이미지 자리 2곳이 점선 placeholder로 비어 있습니다.
Codex의 내장 이미지 생성 기능으로 이미지 2장을 만들어 연결해 주세요.

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `ge-log-toolstring` | 검층 취득 방법 (Wireline / LWD 카드 왼쪽) | 4:3 · 1600×1200 | 시추공에 내려진 와이어라인 검층 툴 스트링 단면 일러스트 |
| `ge-log-interpretation` | From Logs to Reservoir Properties (해석 4단계 왼쪽) | 16:10 · 1600×1000 | 검층 해석 화면(트랙별 곡선 + 해석 결과 기둥) |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/RoleOfGeologyTopic.tsx`: `PETRO_IMAGES` 상수가 이번 작업 대상
- `docs/codex/TASK-geophysics-images.md`: 같은 방식으로 처리한 Geophysics 이미지 작업 (파일 처리, README 형식 참고)

## 작업 범위

- **해도 되는 것:**
  - 이미지 2장 생성
  - `public/images/technology/geology/` 폴더와 README 추가
  - `PETRO_IMAGES`의 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 페이지 문구, 표, 레이아웃, CSS, 다른 토픽 수정
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 공통 스타일

- 사이트 톤: 밝고 깔끔한 editorial 과학 일러스트, 흰색 또는 아주 옅은 배경
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- **넣지 말 것:** 글자, 숫자, 눈금 값, 트랙 머리글, 범례 문구, 로고, 회사·장비 상표, 워터마크, 테두리
- 실제 유정이나 특정 회사 장비를 재현한 것처럼 보이지 않게 할 것 (가상의 설명용 그림)

## 01 · `ge-log-toolstring` (4:3)

```
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape clean editorial cutaway illustration of a vertical borehole drilled through layered
sedimentary rock: alternating tan sandstone, gray shale and blue-gray layers in a cross-section on the
left two thirds. Inside the borehole hangs a long slim cylindrical wireline logging tool string made of
several connected sections, suspended from a thin cable that rises to the top edge; one section presses a
small arm against the borehole wall. Subtle concentric signal arcs in cyan radiate from the tool into the
surrounding rock. Soft light background, refined flat shading with gentle depth, palette navy #0B1A2C,
blue #0A5CDB, cyan #12A4D9, warm sand tones. No text, no labels, no numbers, no logos, no brand markings,
no borders.
```

## 02 · `ge-log-interpretation` (16:10)

이 그림은 **트랙끼리 내용이 맞아야** 합니다. 아래 지층 순서를 모든 트랙에 똑같이 적용하도록 프롬프트에 명시했어요. 위에서 아래로:
셰일 → 가스 사암 → 셰일 → 오일 사암 → 물 사암 → 셰일

```
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
16:10 landscape clean scientific visualization of a well log interpretation composite display on a white
background, depth increasing downward, five narrow vertical tracks side by side separated by thin light
gray grid lines. The same layer sequence applies to every track, top to bottom: shale, gas sandstone,
shale, oil sandstone, water sandstone, shale.
Track 1: a gamma ray curve (green) that swings low in the sandstones and high in the shales, with yellow
fill on the sandstone side and gray fill on the shale side.
Track 2: two resistivity curves, deep (solid red) and shallow (dashed black): high in the gas and oil
sandstones, low in the water sandstone and the shales.
Track 3: a bulk density curve (solid red) and a neutron curve (dashed blue): they separate with a
yellow-orange shaded crossover in the gas sandstone, run close together in the oil and water sandstones.
Track 4: a smooth porosity curve (blue) higher in the sandstones.
Track 5: an interpreted color column: shale gray, gas red, oil green, water blue, matching the layers.
Flat, precise, technical look like professional log software output. No text, no track headers, no
numbers, no scale values, no legend words, no logos, no borders.
```

## 파일 처리

1. 생성 후 크기 맞춤: `ge-log-toolstring`은 1600×1200, `ge-log-interpretation`은 1600×1000. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (파일당 350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/geology/<id>.webp`
4. 같은 폴더에 `README.md` 작성
   - 생성 날짜, 생성 도구, "가상의 설명용 AI 생성 이미지이며 실제 유정 자료가 아님"
   - 각 이미지의 프롬프트 전문

## 코드 연결

`src/components/technology/RoleOfGeologyTopic.tsx`의 `PETRO_IMAGES`에서 각 항목에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
toolstring: {
  id: "ge-log-toolstring",
  placeholder: "…(그대로)…",
  src: "/images/technology/geology/ge-log-toolstring.webp",
  alt: "지층을 관통한 시추공에 내려진 와이어라인 검층 장비를 표현한 AI 생성 이미지",
} as …,
interpretation: {
  id: "ge-log-interpretation",
  placeholder: "…(그대로)…",
  src: "/images/technology/geology/ge-log-interpretation.webp",
  alt: "감마선·비저항·밀도-중성자 곡선과 해석된 암상·유체 구간을 나란히 보여 주는 검층 해석 화면을 표현한 AI 생성 이미지",
} as …,
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/geology/ge-fdp-role`의 04 구간에서 두 이미지가 보이는지 확인
3. **해석 이미지는 아래를 반드시 확인**하고, 하나라도 어긋나면 다시 생성
   - 감마선이 낮은 구간(사암)과 비저항·밀도-중성자·해석 기둥의 사암 구간이 같은 깊이에 있는가
   - 비저항이 가스·오일 사암에서 높고 물 사암에서 낮은가
   - 밀도-중성자 교차(음영)가 가스 사암에만 있는가
   - 글자나 숫자처럼 보이는 요소가 없는가
4. 3번 기준을 여러 번 시도해도 맞추지 못하면 억지로 넣지 말고, placeholder 상태로 두고 결과를 보고할 것

## 커밋

- 지금 작업 중인 브랜치에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 2.1: add AI-generated petrophysics images for Role of Geology`
- 푸시와 PR은 사용자가 요청할 때만

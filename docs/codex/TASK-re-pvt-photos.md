# Codex 작업 지시서 — Technology 3.2 Reservoir Engineering Fundamentals · 03 PVT 실험별 실사 이미지

## 목표

Technology › 03 Reservoir Engineering › 3.2 **Reservoir Engineering Fundamentals** 페이지
(`/technology/engineering/re-fundamentals`)의 **03 Measuring the Properties of Reservoir Fluids.** 섹션은
PVT 실험 5가지를 탭으로 하나씩 보여 줍니다. 탭마다 왼쪽 열 맨 위에 실사 이미지 자리가 placeholder로 비어 있습니다.
Codex의 내장 이미지 생성 기능으로 5장을 만들어 연결해 주세요.

기존 SVG 도식(셀·피크 그림)은 **그대로 남깁니다.** 실사 이미지는 도식 위에서 실험 장면을 보여 주는 보조 그림입니다.

| id (파일명) | 탭 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `re-pvt-composition` | Compositional Measurement | 4:3 · 1600×1200 | 가스 크로마토그래프와 오토샘플러의 작은 시료 바이알들 |
| `re-pvt-flash` | Flash Vaporization | 4:3 · 1600×1200 | 창이 달린 고압 PVT 셀: 원유에서 기포가 생기고, 가스는 셀 **안에** 남아 있음 |
| `re-pvt-differential` | Differential Vaporization | 4:3 · 1600×1200 | PVT 셀에서 분리된 가스를 가는 관으로 빼내 유리 가스 수집 실린더에 모음 |
| `re-pvt-separator` | Separator Test | 4:3 · 1600×1200 | 벤치 규모 분리기 여러 단계가 직렬로 연결되고, 마지막에 저장탱크 원유가 담긴 플라스크 |
| `re-pvt-viscosity` | Oil Viscosity Measurement | 4:3 · 1600×1200 | 항온조 안에 비스듬히 놓인 고압 rolling-ball 점도계 튜브 |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/fundamentals/PvtLab.tsx`
  - `PHOTOS`: 이번 작업 대상
  - `TESTS`: 각 실험의 절차. 이미지가 이 설명과 어긋나지 않아야 함
- `docs/codex/TASK-re-multiphase-photos.md`, `public/images/technology/engineering/README.md`: 같은 폴더의 이전 작업 (파일 처리, README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 5장 생성
  - `public/images/technology/engineering/`에 저장하고 README에 항목 추가
  - `PHOTOS` 다섯 항목에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 토픽 수정
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 공통 스타일

- 같은 페이지의 `re-pvt-lab`·`re-core-plugs`·`re-coreflood`와 어울리는 밝고 차분한 editorial 다큐멘터리 사진 스타일
  - 깨끗한 현대식 실험실, 차가운 중립 블루 계열 조명
  - 원유(amber~짙은 갈색)가 유일한 따뜻한 색
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- **넣지 말 것:**
  - 글자, 숫자, 계기판·화면의 눈금이나 값
  - 라벨 스티커, 로고, 장비 제조사·회사명, 워터마크, 테두리
- 화면(모니터)이 보이면 비어 있거나 흐릿한 추상적 곡선만 (숫자·글자 없이)
- 사람이 등장하면 장갑 낀 손만 (얼굴 없음)
- 배관은 끊기지 않고 실제로 연결된 것처럼 보일 것
- 실제 특정 회사·실험실·장비 모델을 재현한 것처럼 보이지 않게 할 것

## 01 · `re-pvt-composition` (4:3)

반드시: 크로마토그래프 장비와 작은 시료 바이알(투명 가스용·amber 액체용)이 함께 보임. 화면에 숫자 없음.

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization of a clean modern analytical laboratory bench: a
gas chromatograph with its autosampler tray holding rows of small sealed glass vials, some with clear
contents and some with amber crude oil liquid; a gloved hand places one vial into the tray. Soft cool
daylight, shallow depth of field, neutral cool palette with the amber oil as the only warm accent. Fictional
equipment, not a real manufacturer. No readable text, no numbers, no screens with values, no logos, no brand
names, no labels on vials, no borders.
```

## 02 · `re-pvt-flash` (4:3)

반드시: 셀 창 안에서 원유 속 기포와 위쪽 가스층이 **모두 셀 안에** 있음. 가스를 밖으로 빼내는 관·수집 용기는 없음.

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape close-up editorial photograph-style visualization of a stainless-steel high-pressure PVT cell
with a vertical glass sight window, mounted inside a temperature-controlled cabinet. Through the window: amber
crude oil with small gas bubbles rising out of solution and a thin gas layer collecting at the top, all kept
inside the closed cell. A piston pump is connected by fine stainless tubing at the bottom of the cell only;
no gas outlet line. Soft cool lighting, neutral cool palette, amber oil as the only warm accent. No readable
text, no numbers, no gauge scales, no logos, no labels, no borders.
```

## 03 · `re-pvt-differential` (4:3)

반드시: 셀 위쪽에서 가는 관이 나와 **셀 밖의** 유리 가스 수집 실린더로 이어짐. 셀 안 원유 위 가스층은 얇게.

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization of a PVT laboratory setup: a stainless-steel
high-pressure cell with a glass sight window showing amber crude oil with only a very thin gas layer at the
top; from the top of the cell a fine stainless tube with a small valve leads out of the cell to a separate
upright glass gas-collection cylinder standing beside it, partly filled with clear gas above a liquid seal.
Tubing continuous and plausibly connected. Clean modern lab, soft cool daylight, amber oil as the only warm
accent. No readable text, no numbers, no graduation marks, no gauge scales, no logos, no labels, no borders.
```

## 04 · `re-pvt-separator` (4:3)

반드시: 작은 분리 용기 2~3개가 순서대로 연결되고, 마지막에 안정화된 원유(amber)가 담긴 플라스크. 각 용기 위쪽에 가스 배출관.

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization of a bench-scale laboratory separator test rig: two or
three small stainless-steel separator vessels with glass sight windows mounted in a row and connected in series
by fine stainless tubing, each vessel with a small gas outlet line at its top, the last stage draining into a
clear glass flask holding amber stabilised crude oil. Orderly composition left to right, clean modern lab,
soft cool daylight, amber oil as the only warm accent. No readable text, no numbers, no gauge scales, no logos,
no labels, no borders.
```

## 05 · `re-pvt-viscosity` (4:3)

반드시: 비스듬히 기울어진 튜브(rolling-ball 방식)와 항온 장치가 보임. 튜브 안에 amber 원유.

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization of a laboratory rolling-ball viscometer: a thick-walled
high-pressure measuring tube mounted at an inclined angle inside a temperature-controlled jacket, filled with
amber crude oil, connected by fine stainless tubing to a sample pump; the tube's metal end fittings and the
inclined mount are clearly visible. Clean modern lab, soft cool daylight, shallow depth of field, amber oil as
the only warm accent. No readable text, no numbers, no scales, no screens with values, no logos, no labels,
no borders.
```

## 파일 처리

1. 크기 맞춤: 5장 모두 1600×1200. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (파일당 350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/engineering/<id>.webp`
4. 같은 폴더의 `README.md`에 새 항목 추가 (기존 내용은 유지)
   - 생성 날짜, 생성 도구, "가상의 실험실 장면을 표현한 AI 생성 이미지"
   - 각 이미지의 프롬프트 전문 (수정 생성을 했다면 그 프롬프트도)

## 코드 연결

`src/components/technology/fundamentals/PvtLab.tsx`의 `PHOTOS`에서 다섯 항목에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
composition: { id: "re-pvt-composition", placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-pvt-composition.webp",
  alt: "가스 크로마토그래프와 시료 바이알로 저류층 유체 조성을 분석하는 실험실을 표현한 AI 생성 이미지" },
flash: { id: "re-pvt-flash", placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-pvt-flash.webp",
  alt: "고압 PVT 셀 안에서 원유로부터 가스가 분리되어 셀 안에 머무는 모습을 표현한 AI 생성 이미지" },
differential: { id: "re-pvt-differential", placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-pvt-differential.webp",
  alt: "PVT 셀에서 분리된 가스를 관을 통해 가스 수집 실린더로 빼내는 모습을 표현한 AI 생성 이미지" },
separator: { id: "re-pvt-separator", placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-pvt-separator.webp",
  alt: "직렬로 연결된 실험실 분리기와 저장탱크 원유 플라스크를 표현한 AI 생성 이미지" },
viscosity: { id: "re-pvt-viscosity", placeholder: "…(그대로)…",
  src: "/images/technology/engineering/re-pvt-viscosity.webp",
  alt: "항온 장치 안에 기울여 설치한 rolling-ball 점도계로 원유 점도를 측정하는 모습을 표현한 AI 생성 이미지" },
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/engineering/re-fundamentals#pvt`에서 탭 5개를 차례로 눌러 이미지가 바뀌는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·눈금·로고처럼 보이는 요소가 있음
   - Flash에 가스를 밖으로 빼내는 관이나 수집 용기가 있음 (Differential과 구분되지 않음)
   - Differential에 가스 수집 용기가 없음
   - 배관이 공중에 끊겨 있는 등 장비 구조가 비현실적임
   - 사람 얼굴이 보임
4. 다섯 장의 색감이 서로, 그리고 `re-pvt-lab`·`re-coreflood`와 어울리는지 확인

## 커밋

- 지금 브랜치 `claude/re-pvt-photos`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 3.2: add AI-generated PVT test images`
- 푸시와 PR은 사용자가 요청할 때만

# Codex 작업 지시서 — Technology 2.1 Role of Geology · 03 워크플로 카드 실사 이미지 4장

## 목표

Technology › 02 Geology › 2.1 **Role of Geology** 페이지(`/technology/geology/ge-fdp-role`)의
**03 From Rock Evidence to a Static Model** 섹션 카드 4장에 실사 이미지 자리가 placeholder로 비어 있습니다.
Codex의 내장 이미지 생성 기능으로 4장을 만들어 연결해 주세요.

기존 SVG 개념도 4개는 섹션 아래 펼침 메뉴 "Schematic diagrams"로 옮겨 그대로 남겼습니다.
카드 이미지는 각 단계의 **실제 대상**(코어, 노두, 하천 퇴적환경, 모델 화면)을 보여 주는 실체감이 목적입니다.

| id (파일명) | 카드 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `ge-wf-core` | 01 Rock & Well Data | 4:3 · 1600×1200 | 코어 저장고/실험실에서 반으로 자른 사암 코어를 돋보기로 관찰 |
| `ge-wf-strata` | 02 Stratigraphic Framework | 4:3 · 1600×1200 | 해안 절벽에 드러난 층층의 퇴적암 지층 (옆으로 이어지며 두께가 변함) |
| `ge-wf-facies` | 03 Depositional Facies | 4:3 · 1600×1200 | 사행하천과 모래톱(point bar), 범람원을 하늘에서 본 모습 |
| `ge-wf-model` | 04 Property Distribution | 4:3 · 1600×1200 | 작업용 모니터에 띄운 3D 격자 저류층 모델 (셀마다 색이 다름) |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/RoleOfGeologyTopic.tsx`: `WORKFLOW`의 각 `img`가 이번 작업 대상, `WorkflowFigure`가 기존 개념도
- `public/images/technology/geology/README.md`: 같은 폴더의 이전 작업 (README 형식)
- `public/images/technology/geology/ge-log-toolstring.webp`, `public/images/journey/journey-appraisal.webp`: 사이트 톤 참고. `ge-wf-core`는 Journey의 해상 코어 사진과 **다른 장면**(실내 코어 저장고/실험실, 돋보기 관찰)이어야 함

## 작업 범위

- **해도 되는 것:**
  - 이미지 4장 생성
  - `public/images/technology/geology/`에 저장하고 README에 항목 추가 (기존 내용 유지)
  - `WORKFLOW` 각 항목의 `img`에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 개념도, 레이아웃, CSS, 다른 토픽 수정
  - 작업과 무관한 미추적 파일(`.playwright-mcp/`, `CONTENT-MAP.md`, `Wettability.jpeg`, `output/`) 커밋
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 공통 스타일

- 사진처럼 보이는 자연스러운 다큐멘터리 톤, 밝고 차분한 빛
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F` (억지로 입히지 말 것)
- 카드 왼쪽 위에 번호 배지가 겹치므로 **왼쪽 위 모서리에는 중요한 대상을 두지 않음**
- 4장이 한 워크플로처럼 이어져 보이도록 색감을 맞춤
- 가상의 장면이며 실제 회사·장소·자료를 재현하지 않음
- **넣지 말 것:**
  - 글자, 숫자, 글자처럼 보이는 표식(코어 트레이의 깊이 표기, 화면 메뉴·축·범례 포함)
  - 로고, 워터마크, 테두리, 사람 얼굴 (사람은 손이나 뒷모습만)

## 프롬프트

모든 프롬프트 끝에 공통으로 붙입니다.

```
Fictional scene, not a real company, place or dataset. No readable text, no numbers, no text-like markings,
no labels, no logos, no watermark, no borders, no visible faces. Keep the upper-left corner free of important
subjects. 4:3 landscape.
```

### `ge-wf-core`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape documentary photograph in a clean indoor core laboratory. Slabbed sandstone core lies flat-face-up
in long shallow plain trays on a light work bench, showing fine sedimentary layering and cross-bedding on the cut
faces. A gloved hand holds a small hand lens over one section of the core. Soft cool daylight from a window,
shallow depth of field, neutral cool palette with the warm sandstone as the accent. Trays and bench are plain and
unmarked, with no depth markers, tags or writing.
```

### `ge-wf-strata`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for geology education.
4:3 landscape documentary photograph of a tall coastal sea cliff exposing gently dipping layered sedimentary
rock: alternating pale sandstone beds and darker grey mudstone beds that run continuously across the whole cliff
face, some beds gradually thinning or thickening from one side to the other. A calm sea and a strip of beach at
the foot of the cliff, soft daylight, clear natural colours. No people, no buildings, no signs.
```

### `ge-wf-facies`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for geology education.
4:3 landscape high aerial photograph looking down on a wide meandering river crossing a green floodplain. Pale
sand bars (point bars) lie on the inner side of each bend, the channel winds in smooth loops, and one abandoned
crescent-shaped former channel (oxbow) lies nearby on the floodplain. Natural muted colours, soft daylight, clear
air. No roads, no buildings, no boats, no people.
```

### `ge-wf-model`

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape documentary photograph of a geomodelling workstation in a calm, dim modern office. A large monitor
fills most of the frame at a slight angle and shows only a full-screen 3D view of a layered reservoir grid model:
a gently folded block made of many small rectangular cells, each cell coloured on a smooth gradient from pale
blue through cyan to deep blue and a few warm amber cells, with thin cell edges visible. The screen shows no
menus, no toolbars, no windows, no axes, no colour bar and no text of any kind. The edge of a keyboard and a
hand on a mouse are softly out of focus in the foreground. Cool screen glow, neutral palette.
```

## 파일 처리

1. 크기 맞춤: 1600×1200. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/geology/<id>.webp`
4. 같은 폴더의 `README.md`에 새 항목 추가 (기존 내용 유지)
   - 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지"
   - 프롬프트 전문 (수정 생성을 했다면 그 프롬프트도), 크기·품질·용량 표

## 코드 연결

`src/components/technology/RoleOfGeologyTopic.tsx`의 `WORKFLOW` 각 항목 `img`에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.
`alt`는 한국어로 쓰고 "AI 생성 이미지"임을 밝힙니다.

```ts
img: {
  id: "ge-wf-core",
  placeholder: "…(그대로)…",
  src: "/images/technology/geology/ge-wf-core.webp",
  alt: "반으로 자른 사암 코어의 퇴적 구조를 돋보기로 관찰하는 장면을 표현한 AI 생성 이미지",
},
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/geology/ge-fdp-role`의 03 섹션 카드 4장에 이미지가 보이는지, "Schematic diagrams"를 펼치면 기존 개념도 4개가 나오는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·로고처럼 보이는 요소가 있음 (특히 코어 트레이, 모니터 화면), 사람 얼굴이 보임
   - 코어가 반으로 자른 원기둥 형태가 아님, Journey의 해상 코어 사진과 장면이 거의 같음
   - 절벽 지층이 층으로 이어지지 않고 뒤죽박죽임
   - 하천에 모래톱이 없거나 사행이 부자연스러움, 도로·건물이 있음
   - 모니터에 메뉴·창·축·색 막대가 보임, 격자 셀이 보이지 않음
4. 카드 왼쪽 위 번호 배지가 중요한 대상을 가리지 않는지 확인
5. 4장의 색감이 서로 어울리는지 확인

## 커밋

- 지금 브랜치 `claude/ge-workflow-photos`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 2.1: add AI-generated workflow card images`
- 푸시와 PR은 하지 말 것

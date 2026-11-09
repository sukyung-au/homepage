# Codex 작업 지시서 — Technology 3.1 Role of Reservoir Engineering · 첫 화면 실사 이미지

## 목표

Technology › 03 Reservoir Engineering › 3.1 **Role of Reservoir Engineering** 페이지(`/technology/engineering/re-role`)
첫 화면 오른쪽에 실사 이미지 자리 1곳이 placeholder로 비어 있습니다. Codex의 내장 이미지 생성 기능으로 1장을 만들어 연결해 주세요.

저류공학을 대표하는 이미지로, **엔지니어들이 저류층 모델을 함께 보며 분석하고 결정하는 모습**을 보여 주는 것이 목적입니다.
페이지 첫 문장: "저류공학은 저류층의 물성과 유체 거동을 분석하고, 생산량을 예측하며, 개발 전략 수립과 생산 최적화에 필요한 기술적 근거를 제공하는 분야입니다."
기존 SVG 단면도(생산정·주입정·유체 흐름)는 이미지 아래 펼침 메뉴 "Schematic cross-section"으로 옮겨 그대로 남겼습니다.

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `re-role-model-review` | 첫 화면 오른쪽 (최대 약 760px) | 16:10 · 1600×1000 | 협업실 대형 벽면 화면의 3D 저류층 모델과 유선, 이를 보며 논의하는 엔지니어 2~3명 (뒷모습) |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/RoleOfReservoirEngineeringTopic.tsx`: `OPENING_PHOTO`가 이번 작업 대상, `OpeningFigure`의 SVG가 화면 속 모델이 담을 요소(생산정 2개, 주입정 1개, 생산정 쪽 유체 흐름)
- `public/images/technology/geology/ge-wf-model.webp`: 2.1 카드의 단독 모니터 장면. **이번 이미지는 이것과 확실히 다른 장면**(넓은 협업실, 대형 벽면 화면, 사람들의 논의, 유선)이어야 함
- `public/images/technology/engineering/README.md`: 같은 폴더의 이전 작업 (README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 1장 생성
  - `public/images/technology/engineering/`에 저장하고 README에 항목 추가 (기존 내용 유지)
  - `OPENING_PHOTO`에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 토픽 수정
  - 작업과 무관한 미추적 파일(`.playwright-mcp/`, `CONTENT-MAP.md`, `Wettability.jpeg`, `output/`) 커밋
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 반드시 지킬 내용

1. 조명이 낮은 현대적인 협업실. 화면 빛이 주된 조명
2. 벽면 대형 화면(또는 이어 붙인 화면 벽)에 **3D 저류층 모델만** 전체 화면으로 표시
   - 완만하게 휜 층상 격자 블록, 위쪽 꼭대기는 amber(석유), 아래와 가장자리는 blue(물) 계열로 색이 변함
   - 블록을 관통하는 가는 시추정 궤적 3개: 생산정 2개, 날개 쪽 주입정 1개
   - 주입정에서 생산정 쪽으로 휘어 이어지는 가늘고 은은한 cyan **유선(streamline)** 여러 줄
3. 엔지니어 2~3명이 화면 앞에서 뒷모습 또는 얼굴이 보이지 않는 옆뒤 모습으로 논의, 한 명은 화면 속 모델을 가리킴
4. 화면에는 메뉴·창·축·색 막대·범례·글자가 전혀 없음

## 공통 스타일

- 사진처럼 보이는 자연스러운 다큐멘터리 톤, 얕은 피사계 심도
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F`
- 가상의 장면이며 실제 회사·사무실·소프트웨어를 재현하지 않음
- **넣지 말 것:**
  - 글자, 숫자, 글자처럼 보이는 표식 (화면 UI, 사원증, 벽 표지, 노트북 화면 포함)
  - 로고, 워터마크, 테두리, 사람 얼굴

## 프롬프트 · `re-role-model-review` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph in a dim, modern collaboration room. A large wall-mounted display fills
the upper and central part of the frame and shows only a full-screen 3D view of a reservoir grid model: a gently
folded layered block of small cells, coloured warm amber near the crest and grading to blue toward the flanks and
base. Three thin well trajectories pass down into the block: two production wells near the crest and one
injection well on a flank. Several thin, softly glowing cyan streamlines curve through the block from the
injection well toward the production wells. In the foreground, two or three engineers are seen from behind or
from a rear three-quarter angle with faces not visible, discussing the model; one points at the streamlines.
The display is the main light source, casting a cool blue glow on the people; a warm accent light in the room.
The screen shows no menus, no windows, no axes, no colour bar, no legend and no text of any kind.
Fictional scene, not a real company, office or software. No readable text, no numbers, no text-like markings,
no badges, no signs, no logos, no watermark, no borders, no visible faces.
```

## 파일 처리

1. 크기 맞춤: 1600×1000. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/engineering/re-role-model-review.webp`
4. README에 새 항목 추가: 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지", 프롬프트 전문(수정 생성 포함), 크기·품질·용량

## 코드 연결

`src/components/technology/RoleOfReservoirEngineeringTopic.tsx`의 `OPENING_PHOTO`에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
src: "/images/technology/engineering/re-role-model-review.webp",
alt: "엔지니어들이 대형 화면의 3D 저류층 모델과 주입정에서 생산정으로 이어지는 유선을 보며 논의하는 장면을 표현한 AI 생성 이미지",
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/engineering/re-role` 첫 화면에서 이미지가 보이는지, "Schematic cross-section"을 펼치면 기존 도식이 나오는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 화면이나 방 어디에든 글자·숫자·로고·UI처럼 보이는 요소가 있음, 사람 얼굴이 보임
   - 화면 속 모델에 격자 셀이 보이지 않음, 시추정이나 유선이 없음
   - 유선이 주입정과 생산정 사이를 잇지 않고 아무렇게나 흩어짐
   - `ge-wf-model`과 장면이 비슷함 (단독 모니터·키보드 클로즈업)
   - 손·몸이 어색하게 생성됨
4. 확대해서 화면 가장자리, 사람의 옷과 손, 테이블 위 물건에 글자처럼 보이는 표식이 없는지 확인

## 커밋

- 지금 브랜치 `claude/re-role-opening-photo`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 3.1: add AI-generated opening model review image`
- 푸시와 PR은 하지 말 것

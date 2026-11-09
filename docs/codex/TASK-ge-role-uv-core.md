# Codex 작업 지시서 — Technology 2.1 Role of Geology · 첫 화면 이미지 교체 (자외선 코어)

## 목표

Technology › 02 Geology › 2.1 **Role of Geology** 페이지(`/technology/geology/ge-fdp-role`) 첫 화면 이미지를
해상 컷어웨이(`ge-role-cutaway`, 삭제함)에서 **자외선 아래에서 빛나는 석유 함유 코어** 사진으로 바꿉니다.
이미지 자리는 placeholder로 비어 있습니다. Codex의 내장 이미지 생성 기능으로 1장을 만들어 연결해 주세요.

석유지질을 대표하는 이미지로, "석유가 실제로 암석 안에 있다"는 것을 보여 주는 것이 목적입니다.
기존 SVG 단면도는 이미지 아래 펼침 메뉴 "Schematic cross-section"에 그대로 있습니다.

| id (파일명) | 위치 | 비율 · 크기 | 내용 |
|---|---|---|---|
| `ge-role-uv-core` | 첫 화면 오른쪽 (최대 약 760px) | 16:10 · 1600×1000 | 어두운 실험실, 자외선 램프 아래 반으로 자른 코어. 석유가 스민 사암 구간만 빛나고 위아래 셰일은 어두움 |

## 먼저 읽을 것

- `AGENTS.md`, `CLAUDE.md`: 프로젝트 규칙 (기술 내용·수치를 임의로 추가하지 말 것)
- `src/components/technology/RoleOfGeologyTopic.tsx`: `OPENING_PHOTO`가 이번 작업 대상
- `public/images/technology/geology/ge-wf-core.webp`: 같은 페이지 03 카드의 밝은 실내 코어 사진. **이번 이미지는 이것과 확실히 다른 장면**(어두운 환경, 자외선 빛)이어야 함
- `public/images/technology/geology/README.md`: 같은 폴더의 이전 작업 (README 형식)

## 작업 범위

- **해도 되는 것:**
  - 이미지 1장 생성
  - `public/images/technology/geology/`에 저장하고 README에 항목 추가
  - README의 기존 `ge-role-cutaway` 항목 맨 위에 "2026-11-09 사이트에서 제거, `ge-role-uv-core`로 교체" 한 줄 추가 (나머지 기록은 유지)
  - `OPENING_PHOTO`에 `src`·`alt` 값 채우기
- **하지 말 것:**
  - 문구, 캡션, SVG 도식, 레이아웃, CSS, 다른 토픽 수정
  - 작업과 무관한 미추적 파일(`.playwright-mcp/`, `CONTENT-MAP.md`, `Wettability.jpeg`, `output/`) 커밋
  - `main` 브랜치에 직접 커밋하거나 푸시하기

## 반드시 지킬 내용

1. 어두운 실험실. 주변은 거의 어둡고 자외선 램프의 은은한 보라색 빛만 있음
2. 트레이에 놓인 **반으로 자른 원기둥 코어**, 자른 면이 위를 향함
3. 코어 가운데 구간은 **사암**이고 따뜻한 황금빛~황록색으로 **은은하게 형광**을 띰. 빛은 사암 입자와 층리를 따라 고르게 나타남
4. 그 위아래는 **짙은 회색 셰일**이고 빛나지 않음. 사암과 셰일의 경계가 또렷함
5. 장갑 낀 손이 들고 있는 작은 휴대용 자외선 램프, 또는 위쪽 프레임 밖의 램프가 코어를 비춤
6. 네온사인처럼 과장된 빛, 빛 번짐, 빛이 셰일·트레이·배경으로 새는 표현은 피함 (실제 사진처럼 차분하게)

## 공통 스타일

- 사진처럼 보이는 자연스러운 다큐멘터리 톤, 얕은 피사계 심도
- 사이트 색: navy `#0B1A2C`, blue `#0A5CDB`, cyan `#12A4D9`, amber `#F29A1F` (억지로 입히지 말 것)
- 가상의 장면이며 실제 회사·실험실·자료를 재현하지 않음
- **넣지 말 것:**
  - 글자, 숫자, 글자처럼 보이는 표식 (트레이의 깊이 표기, 라벨, 장비 문구 포함)
  - 로고, 워터마크, 테두리, 사람 얼굴

## 프롬프트 · `ge-role-uv-core` (16:10)

```
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph in a darkened core laboratory. A slabbed half-cylinder rock core lies
flat-face-up in a plain shallow tray. Under ultraviolet light, the middle section of the core is porous
sandstone that glows with a soft, even, warm golden-yellow to yellow-green fluorescence following the sand grains
and fine bedding, while the dark grey shale sections directly above and below it stay dark and do not glow, with
crisp boundaries between them. A gloved hand at the edge of the frame holds a small handheld UV lamp, casting a
faint violet light over the scene. The rest of the room is dark. Realistic, calm and restrained, shallow depth of
field, the glowing sandstone as the clear focal point. No neon effect, no bloom, no glow leaking onto the shale,
tray or background.
Fictional scene, not a real company, laboratory or dataset. No readable text, no numbers, no text-like markings,
no depth markers, no labels, no logos, no watermark, no borders, no visible faces.
```

## 파일 처리

1. 크기 맞춤: 1600×1000. 필요하면 가장자리만 잘라 비율을 맞춤
2. **WebP 품질 84**로 변환 (350KB 이하 권장, 넘으면 78까지)
3. 저장 위치: `public/images/technology/geology/ge-role-uv-core.webp`
4. README에 새 항목 추가: 생성 날짜, 생성 도구, "가상의 장면을 표현한 AI 생성 이미지", 프롬프트 전문(수정 생성 포함), 크기·품질·용량

## 코드 연결

`src/components/technology/RoleOfGeologyTopic.tsx`의 `OPENING_PHOTO`에 `src`와 `alt`만 추가합니다. `id`와 `placeholder`는 그대로 둡니다.

```ts
src: "/images/technology/geology/ge-role-uv-core.webp",
alt: "자외선 아래에서 석유가 스민 사암 구간만 빛나고 위아래 셰일은 어둡게 남은 코어를 표현한 AI 생성 이미지",
```

## 확인

1. `npm run lint`, `npm run build` 통과
2. `npm run dev`로 띄우고 `/technology/geology/ge-fdp-role` 첫 화면에서 이미지가 보이는지, "Schematic cross-section"을 펼치면 기존 도식이 나오는지 확인
3. 다음 중 하나라도 해당하면 다시 생성
   - 글자·숫자·로고처럼 보이는 요소가 있음, 사람 얼굴이 보임
   - 코어가 반으로 자른 원기둥 형태가 아님
   - 셰일이 빛남, 빛나는 구간과 어두운 구간의 경계가 흐릿함
   - 네온처럼 과장되거나 빛이 번져 사진처럼 보이지 않음
   - 03 카드의 `ge-wf-core`와 장면이 비슷함
4. 확대해서 트레이와 램프에 글자처럼 보이는 표식이 없는지 확인

## 커밋

- 지금 브랜치 `claude/ge-role-uv-core`에 커밋하고, `main`에는 직접 커밋하지 말 것
- 커밋 메시지 예:
  `Technology 2.1: add AI-generated UV core opening image`
- 푸시와 PR은 하지 말 것

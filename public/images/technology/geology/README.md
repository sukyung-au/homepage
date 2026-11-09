# Geology · Petrophysics images

- 생성 날짜: 2026-10-26
- 생성 도구: Codex 내장 image_gen (내장 도구 모드)
- 설명: 가상의 설명용 AI 생성 이미지이며 실제 유정 자료가 아님.
- 원본 PNG는 Codex 생성 이미지 폴더에 보관하고 저장소에는 포함하지 않습니다.
- 출력: ge-log-toolstring.webp — 1600×1200; ge-log-interpretation.webp — 1600×1000. WebP 품질 84, 350KB 초과 시 78까지 조정.

## 프롬프트 전문

### ge-log-toolstring · 최초 생성

```text
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape clean editorial cutaway illustration of a vertical borehole drilled through layered sedimentary rock: alternating tan sandstone, gray shale and blue-gray layers in a cross-section on the left two thirds. Inside the borehole hangs a long slim cylindrical wireline logging tool string made of several connected sections, suspended from a thin cable that rises to the top edge; one section presses a small arm against the borehole wall. Subtle concentric signal arcs in cyan radiate from the tool into the surrounding rock. Soft light background, refined flat shading with gentle depth, palette navy #0B1A2C, blue #0A5CDB, cyan #12A4D9, warm sand tones. No text, no labels, no numbers, no logos, no brand markings, no borders.
Fictional educational illustration, not actual well data or a branded tool. No watermark.
```

### ge-log-toolstring · 표식 제거 및 배경 수정

```text
Edit this fictional wireline logging cutaway for an educational website. Preserve the vertical cable-suspended multi-section logging tool, borehole through alternating sandstone/shale/blue-gray sedimentary layers in the left two thirds, the small arm contacting the borehole wall, cyan signal arcs, and 4:3 composition. Make it a bright clean editorial SCIENTIFIC ILLUSTRATION with refined flat shading and gentle depth, smoother simplified rock textures rather than photorealism. Replace the distant landscape on the right with a plain very pale cool white background. Remove ALL tiny markings, scratches resembling text, glyphs or numbers on EVERY tool section, particularly the lower silver barrel and near its slots. All equipment surfaces must be completely unmarked and smooth. No text, letters, numbers, scales, logos, brand marks, watermark or borders. Palette navy #0B1A2C, blue #0A5CDB, cyan #12A4D9, warm sand tones. Do not add objects.
```

### ge-log-interpretation · 최초 생성

```text
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
16:10 landscape clean scientific visualization of a well log interpretation composite display on a white background, depth increasing downward, five narrow vertical tracks side by side separated by thin light gray grid lines. The same layer sequence applies to every track, top to bottom: shale, gas sandstone, shale, oil sandstone, water sandstone, shale.
Track 1: a gamma ray curve (green) that swings low in the sandstones and high in the shales, with yellow fill on the sandstone side and gray fill on the shale side.
Track 2: two resistivity curves, deep (solid red) and shallow (dashed black): high in the gas and oil sandstones, low in the water sandstone and the shales.
Track 3: a bulk density curve (solid red) and a neutron curve (dashed blue): they separate with a yellow-orange shaded crossover in the gas sandstone, run close together in the oil and water sandstones.
Track 4: a smooth porosity curve (blue) higher in the sandstones.
Track 5: an interpreted color column: shale gray, gas red, oil green, water blue, matching the layers.
Flat, precise, technical look like professional log software output. No text, no track headers, no numbers, no scale values, no legend words, no logos, no borders.
Fictional educational data, no watermark. Align all six layer boundaries perfectly across all five tracks. Use six equal-height intervals. Left means low and right means high for gamma ray, resistivity and porosity. Only the second interval (gas sandstone) has visible density-neutron separation and orange crossover shading; no orange shading elsewhere. The interpreted column is six solid blocks gray/red/gray/green/blue/gray from top to bottom. Leave only narrow white margins so all six intervals remain visible.
```

### ge-log-interpretation · 물 사암 공극률 수정

```text
undefined
```


## 최종 출력 및 검증

| 파일 | 크기 | WebP 품질 | 용량 (bytes) |
| --- | --- | --- | --- |
| ge-log-toolstring.webp | 1600×1200 | 84 | 270092 |
| ge-log-interpretation.webp | 1600×1000 | 84 | 68886 |

검층 해석 그림의 바깥 테두리를 제거하기 위해 가장자리만 잘랐습니다. 여섯 지층 구간은 모두 유지했습니다.

육안 확인: 전 트랙에서 셰일 → 가스 사암 → 셰일 → 오일 사암 → 물 사암 → 셰일의 순서와 경계가 일치합니다. 사암 구간의 감마선은 낮고, 비저항은 가스·오일 사암에서 높고 물 사암에서 낮습니다. 밀도–중성자 교차 음영은 가스 사암에만 있습니다. 공극률은 세 사암 구간에서 높습니다. 글자·숫자·로고는 없습니다. 첫 생성본의 물 사암 공극률이 낮게 나타나 수정 생성한 결과를 사용했습니다.


## Role of Geology · ge-role-cutaway

2026-11-09 사이트에서 제거, `ge-role-uv-core`로 교체

- 생성 날짜: 2026-11-09
- 생성 도구: Codex 내장 image_gen (내장 도구 모드)
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·시설이나 유정 자료를 재현하지 않습니다.
- 스타일 참고 이미지: `../geophysics/gp-role-cutaway.webp` 사용. 조명·구도·지층 질감과 색만 참고했으며 탐사선·스트리머·탄성파 경로선은 포함하지 않았습니다.
- 생성 횟수: 최초 생성 1회, 재생성·수정 생성 0회.
- 원본 PNG: Codex 생성 이미지 폴더에 보관하며 저장소에는 포함하지 않습니다.
- 처리: 1586×992 원본 가장자리만 1584×990으로 자른 뒤 1600×1000으로 크기 조정. WebP 품질 84.
- 최종 파일: `ge-role-cutaway.webp` — 1600×1000, WebP 품질 84, 315936 bytes (350KB 이하).
- 육안 확인: 전체 이미지와 양쪽 리그·시추정 및 저류암 확대 크롭을 확인했습니다. 배사 구조, 저류암 바로 위의 얇은 짙은 덮개암, 저류암 내부의 수평 석유–물 경계, 석유 구간에서 끝나는 왼쪽 시추정과 물 구간에서 끝나는 오른쪽 시추정이 구분됩니다. 글자·숫자·로고·사람·배·경로선은 보이지 않으며 앞 토픽 이미지와 같은 시리즈의 질감·조명입니다.

### 프롬프트 전문 · 최초 생성

```text
Use case: scientific-educational. Asset type: photorealistic illustrative website opening image for oil and gas education.
Generate one 16:10 landscape image, ideally 1600x1000. The supplied reference image is ONLY a style reference for bright daylight, calm blue sea, realistic rock textures and frontal 3D cutaway framing. Do NOT copy its ship, streamers or ray paths.
A fictional offshore block seen slightly from above and the front. Pale daylight sky at top, calm open sea, a visible blue water column, seabed and a front cut face through sedimentary rocks. Two separate unbranded offshore drilling rigs on the sea, one at 43% image width just left of the anticline crest, and one at 77% on its right flank. Each has ONE thin straight vertical steel well visibly connected to the center of its derrick and platform, continuing uninterrupted through seawater and seabed into the rock cut face. Platform structural legs end on the seabed; only each central well enters rock.
Beneath the seabed ALL geological layers form a single broad gentle upward-convex anticline centered around 50% width, with no synclines. Several tan/grey overburden layers; immediately below them a THIN dense dark charcoal-grey seal following the arch; immediately below seal a MUCH THICKER visibly porous sandstone reservoir; then deeper folded grey strata. Make reservoir thickness very obvious.
Within this ONE reservoir layer only, amber-brown oil saturates the upper crest. Below the oil is blue-grey water-saturated sandstone; the entire left and right reservoir flanks are also blue-grey. The oil-water contact across the central front face is PERFECTLY FLAT AND HORIZONTAL, not a curved stripe: an amber cap with arched top and straight level bottom, entirely inside the thick sandstone reservoir. No orange in other layers. Left well terminates within amber oil near crest, above flat contact. Right well terminates deeper within blue-grey water-bearing reservoir on right flank, above reservoir base. Both well tips clearly visible, no third well.
Soft natural sunlight, crisp photographic rock textures, realistic restrained equipment, calm educational 3D render matching reference, cool blue sea with warm sandstone and amber oil accents.
No text, no numbers, no tiny text-like equipment markings, no logos, no watermark, no labels, no legend, no scale, no arrows, no boundary annotation lines, no people, no ships, no seismic paths, no borders. All equipment surfaces blank and unmarked.
```

## Role of Geology · 03 Workflow card photos

- 생성 날짜: 2026-11-09
- 생성 도구: Codex 내장 image_gen (내장 도구 모드)
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·장소·자료를 재현하지 않습니다.
- 생성 횟수: 각 이미지 최초 생성 1회, 재생성·수정 생성 0회.
- 원본 PNG: Codex 생성 이미지 폴더에 보관하며 저장소에는 포함하지 않습니다.
- 처리: 각 1448×1086 원본을 가장자리 자르기 없이 1600×1200으로 크기 조정. WebP 품질 84를 기준으로 변환했고, facies는 350KB 이하를 위해 품질 82로 조정했습니다.

### 프롬프트 전문

#### ge-wf-core · 최초 생성

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape documentary photograph in a clean indoor core laboratory. Slabbed sandstone core lies flat-face-up in long shallow plain trays on a light work bench, showing fine sedimentary layering and cross-bedding on the cut faces. A gloved hand holds a small hand lens over one section of the core. Soft cool daylight from a window, shallow depth of field, neutral cool palette with the warm sandstone as the accent. Trays and bench are plain and unmarked, with no depth markers, tags or writing.
Each core is a longitudinally halved cylinder with a planar upward cut face and curved underside; show the semicircular ends. Indoor laboratory window and shelves in soft focus, no sea or offshore equipment. Single hand lens and gloved hand enter from the right. Plain smooth trays with absolutely no marks.
Fictional scene, not a real company, place or dataset. No readable text, no numbers, no text-like markings, no labels, no logos, no watermark, no borders, no visible faces. Keep the upper-left corner free of important subjects. 4:3 landscape.
```

#### ge-wf-strata · 최초 생성

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for geology education.
4:3 landscape documentary photograph of a tall coastal sea cliff exposing gently dipping layered sedimentary rock: alternating pale sandstone beds and darker grey mudstone beds that run continuously across the whole cliff face, some beds gradually thinning or thickening from one side to the other. A calm sea and a strip of beach at the foot of the cliff, soft daylight, clear natural colours. No people, no buildings, no signs.
Fictional scene, not a real company, place or dataset. No readable text, no numbers, no text-like markings, no labels, no logos, no watermark, no borders, no visible faces. Keep the upper-left corner free of important subjects. 4:3 landscape.
```

#### ge-wf-facies · 최초 생성

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for geology education.
4:3 landscape high aerial photograph looking down on a wide meandering river crossing a green floodplain. Pale sand bars (point bars) lie on the inner side of each bend, the channel winds in smooth loops, and one abandoned crescent-shaped former channel (oxbow) lies nearby on the floodplain. Natural muted colours, soft daylight, clear air. No roads, no buildings, no boats, no people.
Fictional scene, not a real company, place or dataset. No readable text, no numbers, no text-like markings, no labels, no logos, no watermark, no borders, no visible faces. Keep the upper-left corner free of important subjects. 4:3 landscape.
```

#### ge-wf-model · 최초 생성

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape documentary photograph of a geomodelling workstation in a calm, dim modern office. A large monitor fills most of the frame at a slight angle and shows only a full-screen 3D view of a layered reservoir grid model: a gently folded block made of many small rectangular cells, each cell coloured on a smooth gradient from pale blue through cyan to deep blue and a few warm amber cells, with thin cell edges visible. The screen shows no menus, no toolbars, no windows, no axes, no colour bar and no text of any kind. The edge of a keyboard and a hand on a mouse are softly out of focus in the foreground. Cool screen glow, neutral palette.
The monitor bezel and keyboard are entirely unbranded and unmarked; keyboard keys are blank. Screen is just one reservoir block floating against a plain dark background, without any other graphics or marks.
Fictional scene, not a real company, place or dataset. No readable text, no numbers, no text-like markings, no labels, no logos, no watermark, no borders, no visible faces. Keep the upper-left corner free of important subjects. 4:3 landscape.
```

### 최종 출력 및 육안 검증

| 파일 | 크기 | WebP 품질 | 용량 (bytes) | 재생성·수정 횟수 |
| --- | --- | --- | --- | --- |
| ge-wf-core.webp | 1600×1200 | 84 | 136148 | 0 |
| ge-wf-strata.webp | 1600×1200 | 84 | 328724 | 0 |
| ge-wf-facies.webp | 1600×1200 | 82 | 331666 | 0 |
| ge-wf-model.webp | 1600×1200 | 84 | 113268 | 0 |

전체 이미지와 코어 트레이·돋보기 및 모니터 화면의 확대 크롭을 직접 확인했습니다. 코어는 평평한 절단면과 둥근 아래쪽을 가진 반원통 형태이며, 창과 선반이 있는 실내 실험실에서 돋보기로 관찰하는 장면으로 Journey의 해상 코어 장면과 구분됩니다. 트레이와 장비에 글자·숫자·글자처럼 보이는 표식이 없고 사람 얼굴도 없습니다. 절벽의 밝은 사암층과 짙은 이암층은 옆으로 이어지고 두께가 달라집니다. 하천의 안쪽 굽이에 모래톱이 있고 범람원에 떨어진 초승달 모양의 옛 하도가 보이며 도로·건물·배·사람은 없습니다. 모니터에는 격자 셀이 보이는 완만한 습곡 블록만 표시되고 메뉴·창·축·색 막대·문자는 없습니다. 네 이미지의 차분한 자연색과 푸른색·사암색이 어울리며 왼쪽 위에는 번호 배지가 가릴 중요한 대상을 두지 않았습니다.

브라우저 확인: 개발 서버의 `/technology/geology/ge-fdp-role`에서 네 카드 이미지가 정상 로드되고 번호 배지가 주요 대상을 가리지 않음을 확인했습니다. “Schematic diagrams”를 펼쳐 기존 SVG 개념도 네 개가 표시되는 것을 확인했으며 브라우저 콘솔 오류는 없었습니다. `npm run lint`와 `npm run build`는 모두 종료 코드 0으로 통과했습니다.

## Role of Geology · ge-role-uv-core

### 이전 생성 이력 · 교체됨

- 생성 날짜: 2026-11-09
- 생성 도구: Codex 내장 image_gen (내장 도구 모드)
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·실험실·자료를 재현하지 않습니다.
- 생성 횟수: 최초 생성 1회, 수정 생성 1회 (반원기둥의 평평한 절단면이 위를 향하도록 수정).
- 원본 PNG: Codex 생성 이미지 폴더에 보관하며 저장소에는 포함하지 않습니다.
- 처리: 1586×992 원본 가장자리에서 각 1px씩 잘라 1584×990으로 맞춘 뒤 1600×1000으로 크기 조정. WebP 품질 84.
- 이전 파일 (아래 재생성본으로 교체): `ge-role-uv-core.webp` — 1600×1000, WebP 품질 84, 112866 bytes (350KB 이하).
- 육안 확인: 전체 이미지와 트레이·램프·사암/셰일 양쪽 경계·코어 앞쪽 단면을 확대 확인했습니다. 평평한 절단면은 위를 향하고 반원형 밑면은 트레이에 놓여 있습니다. 황금빛~황록색 형광은 가운데 사암의 입자와 층리에만 나타나며, 위아래 셰일과 경계는 어둡고 또렷합니다. 트레이와 램프는 글자·숫자·로고처럼 보이는 표식 없이 비어 있으며, 얼굴·워터마크·과장된 네온·형광 번짐은 보이지 않습니다. 밝은 실내의 `ge-wf-core`와 다른 어두운 자외선 장면입니다.

### 프롬프트 전문 · 최초 생성

```text
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
Geometry clarification: show one continuous longitudinal half-cylinder, with a planar upward-facing cut surface and curved underside and a visible semicircular near end. Its long axis runs from lower foreground toward upper background, and along that axis the sequence is dark shale, fluorescent sandstone, dark shale. The two lithological contacts run across the full width of the core and are sharp. Lamp housing and tray are completely plain and unmarked. Restrained matte fluorescence, retained granular texture, no luminous halo.
```

### 프롬프트 전문 · 반원기둥 방향 수정

```text
Edit this fictional UV core laboratory photograph. Correct only the rock geometry: it must be a longitudinally slabbed HALF cylinder lying with its perfectly PLANAR CUT FACE UPWARD and its convex curved underside resting in the tray. The visible near-end cross-section must have a STRAIGHT top edge (diameter of semicircle) and a semicircular lower outline curving down toward the tray; it must NOT have an arched top edge or a flat bottom edge. Show a little space around the near end so this correct D-shaped cross section is visible. The entire upward-facing rectangular cut surface is planar, not convex across its width, with crisp straight side edges in perspective. Keep the same dark-shale / warm yellow-green fluorescent sandstone / dark-shale sequence along the length, the two sharp contacts, realistic fine grains and bedding, restrained matte fluorescence confined entirely to sandstone, dark room, shallow plain tray, and gloved hand holding the small unmarked black UV flashlight on the right. Maintain faint violet illumination, calm photographic textures, 16:10 landscape composition. No glowing shale, no fluorescence leaking onto tray or background, no neon, no bloom. No text, numbers, labels, text-like markings, logos, watermark, borders or faces.
```

브라우저 확인: 개발 서버의 `/technology/geology/ge-fdp-role` 첫 화면에서 이미지와 지정한 대체 텍스트가 정상 로드되고, “Schematic cross-section”을 펼치면 기존 SVG 단면도가 표시됨을 확인했습니다. 브라우저 콘솔 오류는 없었으며 `npm run lint`와 `npm run build`는 모두 종료 코드 0으로 통과했습니다.

### 대표 이미지 재생성 · 2026-11-09

- 생성 도구: Codex 내장 image_gen (내장 도구 모드).
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·실험실·자료가 아닙니다.
- 이번 수정 시도: 새 이미지 생성 1회, 추가 수정 생성 0회. 이전 작업을 포함하면 총 생성 호출 3회 (최초 1회, 방향 수정 1회, 이번 재생성 1회).
- 교체 이유: 이전 이미지의 흐린 올리브색 띠, 직선 경계, 코어를 향하지 않는 램프와 큰 검은 앞쪽 단면을 개선했습니다.
- 처리: 1586×992 원본 가장자리에서 각 1px씩 잘라 1584×990으로 맞춘 뒤 1600×1000으로 크기 조정. WebP 품질 84.
- 현재 최종 파일: `ge-role-uv-core.webp` — 1600×1000, WebP 품질 84, 156710 bytes (350KB 이하).
- 원본 PNG: Codex 생성 이미지 폴더의 `exec-4f3444cf-99c9-4171-86ea-7d49afdc0085.png`에 보관하며 저장소에 포함하지 않습니다.
- 육안 검증: 전체 이미지와 램프, 트레이, 양쪽 사암/셰일 접촉부의 확대 크롭을 직접 확인했습니다. 트레이를 비스듬히 내려다보며 세 코어 조각의 넓은 절단면이 화면을 채우고, 검은 끝면은 작게 남습니다. 램프의 렌즈는 왼쪽 아래 코어를 향하며 보라색 조명이 절단면에 닿습니다. 가운데 사암은 입자와 미세 층리를 따라 밝은 황금빛 형광 점들이 나타나고, 양쪽 셰일은 미세한 회색 엽리와 어두운 질감으로 구분됩니다. 접촉부는 약간 굴곡진 불규칙 경계이며 선으로 그은 띠처럼 보이지 않습니다. 트레이·램프에 글자·숫자·라벨·로고 같은 표식이 없고 얼굴·워터마크·네온·빛 번짐도 보이지 않습니다.

#### 프롬프트 전문 · 대표 이미지 새 생성

```text
Use case: photorealistic-natural. Asset type: representative opening photograph for an oil-and-gas geology education website.
Generate a fresh 16:10 landscape documentary photograph, 1600x1000 composition. A dark fictional core laboratory. Camera looks down at a three-quarter angle ALONG a long plain shallow tray, from sufficiently high above to see mostly the broad flat sawn cut surfaces, NOT an end-on view. Two or three separate slender longitudinally slabbed half-cylinder rock core pieces lie end to end in the tray, their perfectly planar sawn faces upward and curved undersides resting down. The core pieces and their cut faces fill most of the frame diagonally from lower left toward upper right. The small semicircular end faces are secondary, low in the frame, never a large black foreground wall. Leave the upper-left corner free of critical subjects.
Show actual contrasting lithologies along the sequence: fine-grained, dark charcoal grey laminated shale, then a substantial oil-bearing porous sandstone interval, then dark laminated shale again. The sandstone has distinct visible coarse sand grains and fine irregular bedding; both lithological contacts are natural, gently wavy and slightly jagged erosional contacts, distinct but NOT straight ruled lines and NOT colored paint edges. The sandstone cut surface emits clearly luminous WARM GOLDEN-YELLOW fluorescence, brighter than everything else in the frame, with many tiny bright golden fluorescent grains and pores sparkling at the grain scale, intensity gently varying with fine bedding. Photographically exposed fluorescent sandstone retains detailed granular texture, looks lit from within the grain structure, never flat dull olive green, never moss or a painted stripe. No green coating.
At the upper/right frame edge, a realistically gloved hand holds one small plain unbranded black handheld UV flashlight. The flashlight's lens faces down and left, its optical axis aimed directly into the middle sandstone interval. Show the visible violet light source and its faint violet wash falling ON THE CUT FACES around the golden sandstone, demonstrating clearly that this lamp illuminates this rock. A narrow subtle violet illumination footprint, not theatrical laser rays or a fog beam. Shale stays grey-black and nonfluorescent despite this violet illumination; it is visibly laminated and much darker than the sandstone. The tray is plain unmarked charcoal grey.
Natural documentary photography, believable rock proportions, dark lab background, shallow depth of field but both sandstone/shale contacts readable. Strong yet restrained luminous golden grain-scale fluorescence is the focal point, fine photographic detail, no neon color, no bloom, no halo, no gold glow spilling onto shale or tray. Fictional scene, not real company, laboratory or dataset. No text, letters, numbers, text-like marks, depth marks, labels, logos, watermark, borders or faces anywhere, especially tray and lamp.
```

이번 재생성본 검증: `npm run lint`와 `npm run build` 모두 종료 코드 0으로 통과했습니다. 컴포넌트의 src/alt와 문구·캡션·SVG·레이아웃·CSS는 수정하지 않았습니다.

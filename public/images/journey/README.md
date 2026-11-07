# Journey scene photographs

- 생성 날짜: 2026-11-07
- 생성 도구: Codex 내장 image_gen (내장 도구 모드)
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·선박·시설의 기록이 아닙니다.
- 원본 PNG는 Codex 생성 이미지 폴더에 보관하고 저장소에 포함하지 않습니다.
- 출력: WebP 품질 84. 원본 비율을 유지하여 지정 크기로 조정했으며, 비율 차이는 가장자리만 잘랐습니다.

## 최종 출력

| 파일 | 크기 | WebP 품질 | 용량 (bytes) | 재생성 횟수 |
| --- | --- | --- | --- | --- |
| journey-exploration.webp | 1600×1000 | 84 | 240122 | 0 |
| journey-appraisal.webp | 1600×1000 | 84 | 178694 | 0 |
| journey-development.webp | 1920×960 | 84 | 158878 | 5 |
| journey-production.webp | 1600×1000 | 84 | 290722 | 0 |
| journey-decommissioning.webp | 1600×1000 | 84 | 215508 | 0 |

## 생성 프롬프트 전문

### journey-exploration

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph of a marine seismic survey vessel at sea, seen from a high rear three-quarter angle. A wide flat stern with several long thin streamer cables running from the stern into the water behind the ship, spreading out in parallel, marked by small tail buoys. Open calm sea, soft daylight, pale overcast sky, plain unmarked hull.
Natural documentary tone, restrained blue sea and cool neutral steel with small muted yellow equipment accents, consistent with bright offshore platform photography. Clearly continuous streamer cables attached at the stern. Generate a single photograph only.
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

### journey-appraisal

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph of sandstone rock core samples laid out in long shallow trays on a work bench, seen at a low angle with shallow depth of field. Cylindrical core sections, some split lengthwise to show fine sedimentary layering. Gloved hands at the edge of the frame examine one piece. Soft cool daylight, neutral palette with the warm sandstone as the accent. Trays are plain and unmarked.
Natural documentary tone, cool neutral workbench and steel, restrained warm sandstone, consistent with bright offshore photography. Show only gloved hands, no other part of the person. Generate a single photograph only.
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

### journey-development

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
2:1 wide landscape documentary photograph of offshore platform installation. A large heavy-lift crane vessel lowers a complete platform topsides module onto a steel jacket standing in the open sea. Lifting slings run from the crane hook to the module. The jacket legs rise from the water with clear lattice bracing. Bright daylight, calm sea, distant horizon, wide composition with the lift at the centre.
Natural documentary tone, restrained blue sea, neutral gray steel and white superstructure with small muted yellow railings. Show a clear small gap between topsides support points and the matching jacket legs, complete connected taut lifting slings all the way from hook to module lifting points; all jacket legs enter the sea. Keep entire crane and lifted module in frame. Generate a single photograph only.
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

### journey-production

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph on the process deck of a producing fixed offshore platform. Horizontal pressure vessels, continuous pipework, valves and steel grating, with open sea visible beyond the handrail. One operator in coveralls and a hard hat walks away from the camera. Bright daylight, plain unmarked equipment, pipework physically continuous and plausibly connected.
Natural documentary tone, restrained blue sea and cool neutral gray steel with muted yellow handrails, small amber-orange coverall accent, consistent with bright offshore platform photography. Operator seen entirely from behind with back of helmet hiding head. All visible instruments blank and unmarked without scale ticks; all pipes terminate in connected fittings, vessels, or continue out of frame. Generate a single photograph only.
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

### journey-decommissioning

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
16:10 landscape documentary photograph of offshore platform removal. A large heavy-lift crane vessel lifts a cut section of an old steel jacket, weathered with rust and marine growth, onto a flat transport barge. Open sea, soft overcast daylight, muted colours, calm and orderly mood.
Natural documentary tone, restrained blue sea and cool neutral steel with muted yellow crane equipment, consistent with bright offshore platform photography. Connected taut lifting slings visibly run continuously from crane hook to lifting points on the cut lattice jacket section hanging just above the barge deck. Vessel and barge hulls absolutely plain, no painted draft marks or vertical scales or crosses. No people. Generate a single photograph only.
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

## 수정 생성 프롬프트

### journey-development · 선체 표식 제거 (1회)

```text
Edit this fictional offshore installation photograph. Preserve the 2:1 framing, connected taut orange lifting slings, crane hook, complete topsides aligned over a steel jacket with legs entering the sea, lighting, sea and composition. Remove every painted white draft mark, vertical scale, cross-shaped marking, numeral-like marking and any glyph from the vessel hull, including near the bow, below the superstructure, and near the stern. Make the dark hull and red waterline completely plain and unmarked. Keep all equipment physically continuous and plausible. Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

### journey-development · A-frame 윈치 드럼 표식 제거

```text
Edit only the small winch drum at the top of the crane's white A-frame, around x=640–690, y=515–535 in this 1920×960 photograph. Remove the red digit-like and logo-like painted marks on that drum and replace them with plain unmarked off-white paint matching the surrounding housing. Keep the drum shape, cables, railing, shading and mechanical details. Keep everything else unchanged: exact 2:1 composition and framing, vessel hull and superstructure, entire crane structure, connected lifting cables and orange slings, topsides, jacket legs and bracing, sky, sea, lighting and colors. Do not add any marks anywhere. Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

### journey-development · 크레인 페데스털 표식 제거 시도 (폐기)

```text
Make one tiny localized correction only to this fictional offshore installation photograph: on the pale gray cylindrical crane pedestal immediately above the deck railings, around x=720–740, y=785–800 in the 1920×960 source, remove the small dark bird-shaped/logo-like mark and replace it with continuous plain pale gray paint and natural shading. Keep the pedestal geometry and all railings unchanged. The winch drum at the top of the white A-frame must remain plain unmarked off-white paint. Preserve everything else: composition, vessel and its genuine round hawse openings, crane, cables, orange slings, topsides, jacket, sky, sea, lighting and color. Do not add letters, digits, logos, painted symbols or glyph-like markings anywhere. No readable text, no numbers, no text-like markings, no hull names, no logos, no watermark, no borders, no visible faces.
```

### journey-development · 크레인 페데스털 표식 제거 재시도

```text
Remove the small dark bird silhouette painted on the lowest pale gray cylindrical base of the crane, immediately ABOVE the yellow deck rail and just to the RIGHT of the white rectangular machinery housing. This is the lower crane pedestal on the ship, NOT the white A-frame winch high above it. Its lower curved gray surface must be entirely plain, smooth, unmarked gray paint with natural shading. Also keep the A-frame top winch drum entirely plain white without red markings. Change only this tiny painted silhouette. Keep the whole offshore installation photograph and all mechanical structures, vessels, crane, taut connected slings, topsides, jacket, sea and sky unchanged. No text, symbols, digits, logos, watermarks or glyph-like marks.
```

### journey-development · 윈치 드럼 붉은 표식 최종 제거

```text
Remove all red painted strokes from the small white winch drum/housing at the very top of the crane's white A-frame, just below the diagonal black suspension cables and above the white triangular supports. Make that small housing entirely plain off-white paint: absolutely no red dots, red strokes, lettering or logo-like paint there. Keep the lowest cylindrical gray crane pedestal plain and unmarked as it is now. Preserve everything else in the provided photograph, including composition, vessel, full crane, slings, module, jacket, sky and sea. No text, digits, logos, glyphs, watermark or borders.
```

## 육안 검수

2026-11-07 추가 검수: A-frame 상부 윈치 드럼의 붉은 숫자·로고형 표식을 내장 image_gen 수정 생성으로 제거했습니다. 확대 검사에서 발견한 하부 크레인 페데스털의 새 모양 표식도 제거했습니다. 첫 페데스털 수정본은 표식이 남아 폐기했고, 재시도 후 다시 생긴 드럼의 붉은 점을 최종 수정했습니다. 최종 WebP의 드럼 영역을 6배 확대하고 선체·상부 구조·페데스털·붐·후크를 확대해 확인했으며, 추가 글리프형 도장 표식은 발견하지 못했습니다. 선체의 둥근 계선용 개구부와 기계 부품·음영은 유지했습니다. 구도, 선박과 크레인, 연결된 슬링, 상부 설비와 재킷, 하늘과 바다는 유지했습니다.

5장 모두 직접 확인했습니다. Exploration의 스트리머는 선미에서 이어지고, Appraisal의 코어는 원기둥·반원기둥 형태입니다. Development와 Decommissioning의 슬링은 후크에서 인양물까지 이어지며, Development의 재킷 다리는 물속으로 이어집니다. Production의 배관은 연결되어 있고 작업자는 뒷모습으로만 보입니다. 최초 Development 이미지의 선체 흘수 표식은 수정 생성으로 제거했습니다. 최종 이미지에서 글자·숫자·로고·얼굴이나 명백한 물리적 단절은 발견하지 못했습니다. 차분한 푸른 바다, 중성 강재와 노란 난간이 hero-surface.webp의 밝은 해양 현장 톤과 어울리는지 확인했습니다.

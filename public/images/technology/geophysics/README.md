# Geophysics workflow images

- 생성 날짜: 2026-10-26
- 생성 도구: Codex 내장 image_gen (기본 내장 도구 모드)
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·현장·조사 자료를 재현한 것이 아닙니다.
- 출력: 1600×1200, WebP 품질 84 (350KB 초과 시 78까지 낮춤). 원본 PNG는 Codex 생성 이미지 폴더에 보관하며 저장소에 포함하지 않습니다.

| 파일 | 품질 | 크기 (bytes) |
| --- | --- | --- |
| gp-acquisition.webp | 84 | 266226 |
| gp-seismic-section.webp | 82 | 335110 |
| gp-interpretation.webp | 84 | 159456 |
| gp-attribute-map.webp | 84 | 245092 |

## 생성 프롬프트 전문

### gp-acquisition

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization, high aerial view of a modern marine seismic survey vessel at sea towing several long parallel streamer cables with small floats behind it, the streamers spreading diagonally toward the lower right, faint white wake lines, calm deep blue open ocean, bright soft daylight, neutral cool blue palette, crisp atmospheric depth. Vessel in the right half, upper-left corner kept as open water. No text, no logos, no flags, no ship name, no markings, no borders, no collage. Fictional scene, not a real survey. Output 4:3 landscape image.
```

### gp-seismic-section

```text
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape clean scientific visualization of a processed 2D seismic reflection section: many thin, continuous, closely spaced horizontal reflection bands in a blue–white–red polarity color map (deep blue #1C3F9E, off-white #F4F1EA, deep red #B8322A), gently folded into a broad anticline in the center, with two small normal faults offsetting the reflections on the right, deeper reflections slightly weaker and noisier. Flat full-bleed image like a screen capture of seismic data, no axes, no tick marks, no labels, no text, no grid, no borders, no 3D perspective. Fictional illustrative data. Keep upper-left corner free of important subjects. No watermark or collage.
```

### gp-interpretation

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization, over-the-shoulder view from behind of a geoscientist at a desk with two large monitors showing a 3D seismic data cube with colored interpreted horizon surfaces (blue, cyan, amber) cutting through it, a quiet modern office with soft cool daylight, shallow depth of field. The person is seen from behind and not identifiable. Screens show imagery only: no readable text, no menus, no numbers, no logos, no brand names on the hardware. Neutral cool blue palette. Fictional scene, no watermark, no borders, no collage. Keep upper-left corner free of important subjects.
```

### gp-attribute-map

```text
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape top-down map visualization of a seismic amplitude attribute over an elongated anticlinal reservoir: a smooth continuous color ramp from deep navy and blue at the edges through cyan and green to yellow and orange at the crest (#0B1F6B, #1F4FD1, #16A3D8, #3CC48C, #E9D43A, #F29A1F), subtle sinuous channel-like patterns, thin dark structural contour lines following the closure. Flat full-bleed map, no text, no labels, no numbers, no legend, no scale bar, no north arrow, no grid, no borders. Fictional illustrative data, no watermark, no collage. Keep upper-left corner free of important subjects.
```

## Topic 1.3 — Deepwater Resistivity Methods

- 생성 날짜: 2026-10-29
- 생성 도구: Codex 내장 image_gen (기본 내장 도구 모드)
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·장비 모델·현장·조사 자료를 재현한 것이 아닙니다.
- 출력: 1600×1200, WebP 품질 84 (350KB 초과 시 78까지 낮춤). 원본 PNG는 Codex 생성 이미지 폴더에 보관하며 저장소에 포함하지 않습니다.

| 파일 | 품질 | 크기 (bytes) |
| --- | --- | --- |
| gp-csem-survey.webp | 84 | 260946 |
| gp-csem-receiver.webp | 84 | 204586 |
| gp-lwd-resistivity.webp | 78 | 395892 |
| gp-csem-seismic.webp | 80 | 341268 |

### 생성 프롬프트 전문

#### gp-csem-survey

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape editorial photograph-style visualization, high aerial view of a mid-size offshore survey vessel
on calm deep blue open ocean, a single heavy umbilical cable leading from its stern down into the water at a
steep angle, faint white wake, no streamer spread, bright soft daylight, neutral cool blue palette, crisp
atmospheric depth. Vessel in the right half, generous open water on the left. No text, no logos, no flags,
no ship name, no hull markings, no borders, no collage.
Fictional illustrative scene, not a real company, equipment model, site or survey. No watermark, no collage. Output 4:3 landscape.
```

#### gp-csem-receiver

```text
Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.
4:3 landscape underwater photograph-style visualization of a compact scientific electromagnetic receiver
resting on a flat, fine-grained deep seafloor: a small frame with a buoyant float on top, four long thin
horizontal sensor arms extending outward close to the sediment, a simple concrete anchor base, soft cone of
artificial light from above fading into dark blue water, a few suspended particles, calm and quiet.
Generic equipment design, no text, no logos, no serial numbers, no markings, no fish, no borders.
Fictional illustrative scene, not a real company, equipment model, site or survey. No watermark, no collage. Output 4:3 landscape.
```

#### gp-lwd-resistivity

```text
Use case: technical illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape clean cutaway illustration of a vertical borehole through horizontally layered sedimentary
rock (beige sandstone, grey shale, one amber-tinted oil-bearing sand layer). Inside the borehole a drill
string ends in a bottomhole assembly with a drill bit; just above the bit a cylindrical logging tool with
a few slim coil bands emits faint concentric blue electromagnetic rings into the surrounding rock. Soft
editorial shading, light background, restrained palette of navy, blue, cyan and amber. No text, no labels,
no numbers, no arrows, no logos, no borders.
Fictional illustrative scene, not a real company, equipment model, site or survey. No watermark, no collage. Output 4:3 landscape.
```

#### gp-csem-seismic

```text
Use case: scientific illustration. Asset type: illustrative website figure for oil and gas education.
4:3 landscape flat visualization of a 2D seismic reflection section in muted greyscale with thin continuous
gently folded horizontal reflections forming a broad anticline, overlaid with a semi-transparent smooth
resistivity model in a cool-to-warm color ramp: mostly deep blue and cyan background, with one elongated
lens-shaped warm amber-to-orange resistive body sitting just beneath the crest of the anticline.
Full-bleed like a screen capture of interpretation data, no axes, no tick marks, no colorbar, no labels,
no text, no grid, no borders, no 3D perspective.
Fictional illustrative scene, not a real company, equipment model, site or survey. No watermark, no collage. Output 4:3 landscape.
```


## Topic 1.1 — Role of Reservoir Geophysics opening cutaway

- 생성 날짜: 2026-11-09
- 생성 도구: Codex 내장 image_gen 장면 + 승인된 프로그램 음파 오버레이 (자세한 수정 이력은 아래 참고)
- 설명: 가상의 장면을 표현한 AI 생성 이미지. 실제 회사·선박·시설·조사 자료를 재현한 것이 아닙니다.
- 출력: 1600×1000, WebP 품질 84. 원본 PNG는 Codex 생성 이미지 폴더에 보관하며 저장소에 포함하지 않습니다.
- 검수: 전체 장면과 확대된 선체·선실·리그·크레인·장비를 확인했습니다. 탐사선 1척과 선미에 연결된 스트리머, 배사 지층, 리그 1기와 그 아래로 이어지는 수직 시추정 1개를 확인했습니다.

### 생성 프롬프트 전문 — gp-role-cutaway

```text
Use case: photorealistic-natural. Asset type: illustrative website image for oil and gas education.
16:10 landscape photorealistic 3D cutaway render of an offshore block, seen slightly from above and the front.
The upper part shows calm open sea under a pale daylight sky; the front face of the block is cut away to reveal
the water column, the seabed and the sedimentary rock layers beneath it. On the sea surface at the left, one
marine seismic survey vessel tows several long thin streamer cables behind its stern. Beneath the seabed,
several rock layers are stacked and folded upward into a broad, gentle anticline in the centre.
Near the crest of the fold, one offshore drilling rig stands on the sea,
and one thin vertical well descends from it through the water and the seabed straight down into the top of the
fold. Soft natural lighting, crisp rock textures, calm educational look, cool blue palette with warm sandstone
layers as accent.
Fictional scene, not a real company, vessel or facility. No readable text, no numbers, no text-like markings,
no hull names, no scale bar, no arrows, no labels, no legend, no people, no logos, no watermark, no borders.
Composition clarification: the vessel is facing left, and its stern at the right visibly connects to multiple thin streamer cables trailing rightward on the sea. The single rig is near the centre-right directly above the anticline crest. The front cut face shows a single continuous straight vertical well aligned with the rig's derrick from its deck through the water and seabed into the folded rock. Rig support legs are distinct structural supports and terminate at the seabed. All vessel hull panels, rig equipment and crane surfaces are plain unmarked metal, without even small painted symbols or helipad letters. Omit sound-wave ray paths. Restrained realistic textures and a clean, readable educational composition, with beige sandstone, grey shale, navy sea and subdued amber accents. Output landscape 1600x1000.
```

### 수정 프롬프트 전문 — 선체와 리그의 글자처럼 보이는 표식 제거

```text
Use case: precise-object-edit. Edit this offshore geological cutaway only to remove text-like markings. Keep the exact scene, layout, anticline rock layers, water, one vessel with stern-connected streamers, one rig and single vertical well unchanged. On the survey vessel, remove the small grey text-like row on the white forward superstructure above the round portholes, remove the small dark text-like row high on the forward navy hull, and remove all faint pale marks at mid-hull. Make those panel areas completely clean unmarked paint while preserving legitimate round portholes and rectangular bridge windows. On the rig, remove the little dark symbol-like mark on the yellow front horizontal deck beam directly below the derrick. Keep structural metalwork, equipment, crane, railings and windows. No writing, no numbers, no logos, no people, no new elements. Preserve realistic rendering and 16:10 landscape composition.
```

### 추가 수정 프롬프트 전문 — 크레인 표면 정리

```text
Use case: precise-object-edit. Preserve this exact offshore cutaway image and all geometry, composition, colors, vessel, streamer cables, rig, well and geology. Make only two tiny surface cleanup changes: the crane's yellow rectangular machinery housing at the base of its diagonal boom has a blue-grey curved inset symbol on its right face that can resemble a numeral; remove that entire inset/symbol and make that housing face smooth uninterrupted yellow painted metal. Also remove the faint pale horizontal scratch at the middle of the vessel's navy hull so the hull paint is clean. Do not add any markings, symbols, text, logos, people or equipment; preserve legitimate windows, round portholes, railings and structural framing. No other changes.
```

| 파일 | 출력 크기 | 품질 | 크기 (bytes) |
| --- | --- | --- | --- |
| gp-role-cutaway.webp | 1600×1000 | 84 | 200390 |

- 크기 맞춤: 원본 1586×992에서 가장자리만 비율을 맞춘 뒤 1600×1000으로 변환했습니다.


### 후속 수정 — 스트리머·배사 구조·탄성파 반사 경로 (2026-11-09)

- 최종 장면은 Codex 내장 image_gen으로 생성·수정했습니다. 탐사선은 오른쪽을 향하고, 스트리머는 왼쪽 열린 바다의 꼬리 부표에서 끝나며 리그와 연결되지 않습니다. 배사 구조를 강화하고 수직 시추정이 상부 배사 지층 안에서 끝나도록 수정했습니다.
- 채택 원본: `exec-7f56e620-60f1-43c6-851f-386f6d5a2e24.png` (1586×992). 이 장면은 그대로 유지하고, 코디네이터의 명시적 승인에 따라 **음파 경로 3개와 음원·수신기 점만 프로그램으로 합성**했습니다. 배경 장면 전체를 절차적으로 그린 이미지가 아닙니다.
- 내장 도구로 음파 경로 생성을 7회 시도했으나, 끊긴 선·잘못된 반사점·꼬리 선분 등의 문제로 모두 폐기했습니다. 아래에 해당 프롬프트를 기록하며, 최종 이미지에는 이 실패 출력들을 사용하지 않았습니다.

#### 프로그램 오버레이 방법

- 좌표는 원본 1586×992의 왼쪽 위를 (0, 0)으로 한 픽셀 좌표입니다. 공통 음원 S = (280, 274)는 선미 바로 뒤의 물에 있습니다. 수신점은 왼쪽으로 예인되는 가장 아래 스트리머의 밝은 케이블 중심 픽셀에서 찾았습니다.
- 각 반사점 P는 눈에 보이는 지층 경계의 어두운 이음선을 측정해 정했습니다. 경계 주변 40px 구간의 9개 점을 최소제곱 직선으로 근사해 국소 접선 기울기 m을 구했습니다. 접선과 직교하는 단위 법선 n = normalize((-m, 1)), 입사 단위 벡터 d = normalize(P − S), 반사 벡터 r = d − 2(d·n)n을 사용했습니다. P + t·r과 스트리머 케이블이 만나는 점을 수신점 R로 삼았습니다.
- 각 경로는 S → P → R의 두 직선 선분이며, 반사점 아래로 이어지는 선·화살표·추가 가지가 없습니다. 아래 각도는 측정한 국소 경계 법선에 대한 영상 평면상의 각도입니다.

| 반사 경계 | 반사점 P | 국소 기울기 m | 스트리머 수신점 R | 입사각 = 반사각 |
| --- | --- | --- | --- | --- |
| 얕은 갈색층 / 회색 셰일 | (250, 616) | −0.0666667 | (176.21097, 287) | 8.82719° |
| 회색 셰일 / 밝은 사암 | (300, 677) | −0.2366667 | (128.96144, 289) | 10.47388° |
| 밝은 사암 / 황갈색 사암 | (300, 744) | −0.2333333 | (99.46490, 290) | 10.69737° |

- 더 깊은 반사일수록 수신점은 스트리머를 따라 선미에서 더 멀리 있습니다. 계산한 입사각·반사각 차이는 10⁻⁸도 미만입니다. 지층 경계 자체는 교육용 AI 장면에서 측정한 값이며 실제 지질 자료가 아닙니다.
- Pillow RGBA 오버레이를 4배 해상도에서 안티앨리어싱했습니다. 선은 cyan `#12A4D9`, 원본 기준 약 2.2px, 알파 190/255, 둥근 이음이며 0.65px 흐림의 매우 약한 광채(기본 알파의 16%)만 추가했습니다. 음원 반지름은 3.2px, 수신점 반지름은 2.6px입니다.
- 원본 장면의 위·아래 가장자리 0.375px씩만 잘라 정확한 16:10으로 맞춘 뒤 동일 배율로 1600×1000으로 리샘플링해 반사각을 보존했습니다. WebP 품질 84, 200390 bytes입니다. 생성 장면과 오버레이 외의 콘텐츠·도식·코드는 수정하지 않았습니다.
- 최종 이미지 전체와 확대된 음원·스트리머 수신점·반사점·선체·리그·크레인·장비를 확인했습니다. 세 경로가 각각 음원에서 출발해 경계에서 반사된 뒤 스트리머 수신점에 닿고, 리그·시추정을 통과하지 않으며 글자처럼 보이는 표식이 없음을 확인했습니다.

#### 채택한 장면 수정 프롬프트 — 스트리머 분리와 배사 강화

```text
Use case: precise-object-edit. Correct exactly two scientific/composition problems in this offshore cutaway, preserving its realistic 3D cutaway rendering style, pale daylight sky, calm blue sea, transparent water column, flat seabed, single navy and white survey vessel, single yellow and grey drilling rig, muted sandstone and grey shale colors, lighting, and 16:10 landscape framing.
FIRST: replace the vessel's direction and streamer geometry. Keep the one vessel in the LEFT HALF, around one third of the image width, but turn it so its pointed BOW faces RIGHT and its wide STERN faces LEFT. Several thin streamer cables must connect ONLY to the LEFT-facing stern and trail LEFTWARD across open sea, ending in small unmarked tail buoys BEFORE the left image edge. Show the full cables and tail buoys. Completely erase ALL existing cables between vessel and rig. The large area of sea between the vessel's right-facing bow and the rig MUST be clear uninterrupted open water. The rig stands alone with NO connection of any kind to the vessel, streamer cables, or buoys.
SECOND: strengthen the sedimentary anticline on the front cut face. ALL major sedimentary layer boundaries must form a clear broad smooth convex-UP arch, like nested upside-down bowls, with their common crest directly beneath the rig at about 61 percent of image width. Both left and right flanks descend clearly away from the crest. Make the structural relief unmistakable: each major boundary rises roughly 120 to 160 pixels from flank to crest in a 1000-pixel-high image. No syncline, no central sag in any layer, no flat major boundaries, no wavy alternation. Keep the seabed itself approximately flat and leave the water-column depth unchanged; the shallowest rock unit can taper toward the dome crest. The SINGLE straight vertical well must remain connected to the rig's derrick and extend through water and seabed, ending inside the upper folded sandstone layer just below the crest, not down below the whole fold.
Do not change anything else. No sound-wave paths. Entirely fictional educational scene. No text, no letter-like or number-like marks, no logos, no ship names, no equipment markings, no people, no arrows, no labels, no legend, no watermark, no border. All vessel and rig painted surfaces clean and unmarked. Output 1600x1000 landscape.
```

#### 폐기한 음파 생성 시도 1

```text
Use case: precise-object-edit. Add a small clear fan of seismic reflection ray paths to this exact offshore cutaway image, while preserving the corrected RIGHT-facing vessel at the left with its streamers trailing freely LEFT into small tail buoys, the completely clear sea gap separating vessel from the standalone rig, the broad clearly convex-up folded rock layers under the rig, the short single vertical well ending in the upper folded sandstone, and all existing styling, colors, textures, lighting, water column and seabed.
Add THREE thin clean semi-transparent softly glowing cyan #12A4D9 seismic ray paths ONLY on the LEFT side beneath the vessel and its streamers, well clear of the rig and well. Show one tiny unlabelled cyan source point in the water immediately behind the vessel's LEFT stern, connected to a short source tow line from that stern. Add several tiny unlabelled receiver points ALONG the existing left-trailing streamer cables (not detached endpoints in the water).
Every complete ray must start at that SAME source point just behind the stern, travel as ONE STRAIGHT thin segment down through the water and seabed to an actual visible sedimentary layer boundary, reflect at a sharp V-shaped tip touching that boundary, and travel as ONE STRAIGHT thin segment back up through the water to one of those receiver points ON a streamer cable. Three complete V-shaped ray paths, not six separate disconnected strokes. Use two or three different layer boundaries; the ray reaching the deeper boundary ends at a receiver farther left along a streamer. Angle of incidence equals angle of reflection measured about the local layer normal. No refraction bends or curved ray paths. Do not reflect from inside a rock layer or inside open water; each V tip must sit exactly on a visible rock-layer interface. Keep lines thin, restrained and readable, about 1 to 2 pixels wide in a 1600-pixel image, with faint glow. Do not obscure rock textures; do not pass any ray through the rig or well. Do not draw lines between vessel and rig. No arrowheads, arrows, broad beams, text, labels, numbers, logos, equipment markings, people or watermark. No extra wavefront arcs. Keep the whole scene and 16:10 framing otherwise unchanged.
```

#### 폐기한 음파 생성 시도 2

```text
Use case: precise-object-edit. Add exactly THREE complete simple seismic reflection V paths to the attached CLEAN offshore cutaway (which currently has no rays). Keep all other pixels and geometry as close as possible: right-facing vessel at left, left-trailing free streamer cables and orange tail buoys, clear open-water gap between vessel and independent rig, convex-up anticline under rig, single vertical well ending in the upper fold.
Think of each ray as ONE unbroken two-segment polyline with exactly THREE vertices: SOURCE -> REFLECTION TIP -> RECEIVER. All three share the same SOURCE vertex, the tiny cyan source just behind the LEFT stern at approximately pixel (285,280) in this 1586x992 image. A short small tow line connects that source to the stern. RECEIVERS must be tiny cyan dots sitting directly ON existing streamer cables to the left, approximately (220,275), (130,280), and (65,285). Show only those three receiver dots and the source dot.
Draw ray A from source (285,280) straight down to the first visible shale/sandstone interface around (310,680), then straight back up to receiver (220,275). Draw ray B from the SAME source (285,280) straight down to the next deeper sandstone/amber interface around (280,760), then straight back up to receiver (130,280). Draw ray C from the SAME source (285,280) straight down to the next deeper amber/sandstone interface around (260,845), then straight back up to receiver (65,285). Adjust each tip by a few pixels to touch the actual visible layer boundary exactly, and keep incident/reflected angles equal about the tilted local normal. The reflection tips are all to the right of the source-receiver midpoints because the strata slope gently upward to the right. Each path must have one downward leg and one upward leg; all THREE downward legs visibly connect to the same source at the stern, all THREE upward legs visibly connect to their streamer receivers. No extra segments below the reflection tips, no loose unattached ends, no branching, no rays ending inside a rock unit, no strokes ending in the water. Six thin segments total, paired into exactly three complete Vs.
Use thin 1-pixel semi-transparent glowing cyan #12A4D9 lines, restrained and readable over water and rock textures, with no arrowheads or arrows. Keep all rays entirely in the left quarter of the scene, far away from rig and well. No letters, numbers, logos, labels, text-like marks, people, thick beams, or additional diagrams. Preserve 16:10 landscape and the realistic 3D cutaway style.
```

#### 폐기한 음파 생성 시도 3

```text
Use case: precise-object-edit. Fix ONLY the deepest cyan seismic ray in this image; leave the other TWO shallower complete cyan V paths, source point, receiver dots, vessel, streamers, tail buoys, rig, well, geology and entire scene unchanged.
The deepest path currently has a wrong early crossing/kink inside the pale sandstone plus a dangling tail down to the orange layer. Replace that ONE deepest path with one simple clean unbranched V made of exactly two straight segments: start at the SAME cyan source dot immediately behind the vessel stern (approximately 285,280); draw straight to a single reflection vertex EXACTLY on the boundary between the pale sandstone and orange sandstone at approximately (235,760); then draw straight back up to the farthest-left cyan streamer receiver near (52,290). At (235,760), both segments must meet cleanly at one sharp point on that boundary, with no crossing, twist, loop, hook, tail, double stroke, or line extending below it. Erase all old deepest-path fragments fully, especially the crossover inside the pale sandstone near (220,730). Restore underlying rock texture where old fragments were removed. The result must contain exactly THREE complete V-shaped source-boundary-receiver paths and no loose line ends. Keep all three lines thin, translucent cyan without arrows or text. Do not alter any of the two shallower V paths or any other aspect of the scene. No writing, symbols, numbers, logos or people.
```

#### 폐기한 음파 생성 시도 4

```text
Make one tiny correction to the attached image. The deepest cyan V-shaped seismic ray, at the far left, has a little twisted kink just above its lowest point in the pale sandstone. Remove only that kink. Its two straight legs should meet cleanly at the existing lowest cyan point on the pale-sandstone/orange-sandstone boundary. Preserve exactly all the other cyan rays, their reflection tips, the common source dot, the receiver dots, and every other detail of this image. No new lines, no deleted rays, no loose ends, no writing.
```

#### 폐기한 음파 생성 시도 5

```text
Image 1 is the full edit target. Image 2 is ONLY a magnified reference crop of its lower-left ray tips, supplied so you can see the error clearly. Return the FULL landscape image 1, not the crop.
In image 2, the bottom cyan path crosses itself inside the pale sandstone then continues as a dangling tail to the orange interface. That is WRONG. Replace that entire deepest cyan path in image 1 with two straight segments meeting at ONE VERTEX exactly at the pale sandstone / orange sandstone boundary (the bottom end of the current tail). Move the incoming leg from the common source and outgoing leg to the far-left receiver so both join at that bottom point. There must be a clean narrow V, NOT a Y, crossing, loop, or tail. Remove the old early intersection and all old segments. Draw a straight cyan segment from the existing common source behind the vessel stern to the bottom reflection point, and another straight cyan segment from that point back up to the far-left existing cyan streamer receiver. Preserve the other two shallower cyan V paths exactly. Preserve all rock layers, vessel, free streamers, separate rig, well, colors, lighting, and 16:10 full image framing. No text, no markings, no arrows, no additional lines.
```

#### 폐기한 음파 생성 시도 6

```text
Use case: scientific-educational. Edit this realistic offshore cutaway to show three scientifically coherent seismic reflection rays with more room for the ray geometry.
Preserve the entire rig, vertical well, strongly arched anticline, rock textures, water column, seabed, sky, colors and lighting. Keep exactly one right-facing navy/white survey vessel on the left side, but shift it rightward slightly so its LEFT stern is near x=500 and its RIGHT bow near x=740 in the 1586-wide image. The rig stays where it is at x=960. Keep a clear gap of open sea between vessel and rig. The rig is entirely unconnected to the vessel.
Streamers trail freely LEFT from the stern across open water, ending at small orange tail buoys around x=60. Put a small cyan source dot immediately behind the stern, around (490,285), and three tiny cyan receivers on the streamers around (340,285), (220,285), (100,285).
Add exactly THREE complete V-shaped reflection paths, EACH with exactly two straight segments sharing ONE sharp lower vertex on a rock-layer boundary. All three start at the common source dot, turn at their boundary, and end at one streamer receiver. The shallow reflection reaches the tan/grey boundary and returns to the nearest receiver. The middle reflection reaches the grey/pale-sandstone boundary and returns to the middle receiver. The deepest reflection reaches the pale-sandstone/orange boundary and returns to the farthest receiver. The two segments of EACH V must meet exactly at the boundary: no crossing at that vertex, no tails beneath it, no Y junction, no dangling line, no loops, no kinks, no disconnected ends. Incident and reflected angles are equal about the local layer normal. Rays are straight, thin, semi-transparent cyan #12A4D9 with restrained glow; no arrowheads, arrows or thick beams. All rays are confined to the left half, far from the rig and well. Rays may cross each other en route but each individual V must have exactly two straight legs that end at its reflection vertex. Use wider V shapes so the three paired paths are readable, rather than nearly overlapping vertical strokes.
No text, labels, symbols, numbers, people, logos, hull names, equipment markings or watermark. Entire scene remains a realistic 3D offshore block cutaway in landscape 16:10.
```

#### 폐기한 음파 생성 시도 7

```text
Add ONE seismic reflection path to this otherwise unchanged image. Add one small cyan source dot immediately behind the left stern of the right-facing vessel, and one tiny cyan receiver dot on a streamer to its left. Draw ONE continuous thin translucent cyan V-shaped polyline: from the source down through water and seabed to the boundary between the shallow tan rock and the grey shale, then straight back up to that receiver. Exactly TWO straight strokes meet at one sharp lower point ON that tan-grey boundary. No other cyan lines. No arrows or text. Keep the vessel, all free left-trailing streamers and tail buoys, separate rig, well ending in the fold, arched geology, sky, colors and framing exactly unchanged.
```

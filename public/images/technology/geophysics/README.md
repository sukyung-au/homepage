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

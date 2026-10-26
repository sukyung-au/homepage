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

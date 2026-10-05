# Homepage imagery

These four illustrative images were generated with the built-in imagegen tool on 2026-10-05. They depict fictional offshore scenes, not a documented site or asset. The original generated PNGs remain in the local Codex generated-images directory; the website uses WebP copies encoded at quality 84, approximately 931 KiB total.

## Prompts

Each prompt starts with: `Use case: photorealistic-natural. Asset type: illustrative website photography for oil and gas education.`

- `hero-surface.webp`: wide 3:2 editorial photograph-style visualization of an offshore oil platform in a calm blue ocean under bright pale blue sky. Platform placed in right third; open water left; horizon upper third. Natural daylight, understated engineering documentary aesthetics, neutral cool blue palette. No text, logos, borders, collage.
- `scene-surface.webp`: wide 21:9 editorial photograph-style visualization, high aerial view of rugged coastal cliffs and deep blue offshore waters, gentle waves and a distant survey vessel, coherent natural geography, neutral cool blue palette, crisp atmospheric depth, natural daylight. No text, logos, borders, collage.
- `scene-production.webp`: wide 3:2 editorial photograph-style visualization of a realistic FPSO oil production ship at sea, three-quarter aerial view, white and ochre superstructure, pipes and processing equipment on deck, deep blue calm ocean, ship fully inside central 70 percent for responsive cropping, soft natural daylight, quiet neutral cool palette. No text, logos, borders, collage.
- `scene-field.webp`: wide 21:9 editorial photograph-style visualization of offshore field development at blue hour: several distant platforms and one support vessel in a vast calm ocean, muted blue sky and subtle warm horizon, operational lights on platforms. Main infrastructure in right half, calm water in left half for a white content panel. Natural understated documentary atmosphere. No text, logos, borders, collage.

## Display

Hero and journey scenes reference these local files explicitly. Hero loads with Next.js image preload; other images use default lazy loading. Responsive sizes and focal positions keep the assets fitted to their layouts. Korean alt text identifies each as AI-generated.

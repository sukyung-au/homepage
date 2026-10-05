# Journey V1 (9 stages) — production reference

Journey V2 replaced the 9-stage Journey on the homepage with 5 stages
(Exploration → Appraisal → Development & Drilling → Production → Decommissioning).
Version 1 is kept here for reference; nothing in this note is built into the app.

- **Design snapshot:** `design/versions/v1/` (locked Claude Design baseline) and `design/ui_kits/explorer/`
- **Production implementation:** `main` at commit `5b557da` (Merge pull request #1, `claude/design-v1`).
  Files: `src/lib/stages.ts`, `src/components/home/Scenes.tsx`, `src/components/home/ReservoirScene.tsx`,
  `src/components/home/Scenes.module.css`.
  Restore with `git show 5b557da:<path>`.

| # | Stage | Sub |
| --- | --- | --- |
| 01 | Surface | Remote sensing · Gravity · Magnetics |
| 02 | Petroleum System | Source · Migration · Trap |
| 03 | Subsurface | Geology · Structure · Characterization |
| 04 | Well & Logging | Drilling · Petrophysics |
| 05 | Seismic | Acquisition · Processing · Interpretation |
| 06 | Reservoir | Modeling · Properties |
| 07 | Reservoir Engineering | Simulation · Recovery |
| 08 | Production | Wells · Facilities · Operations |
| 09 | Field Development | Plan · Infrastructure · Production |

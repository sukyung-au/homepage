# Version 1 — baseline (locked)
Saved 2026-10-05. Exact snapshot of the "Scientific Exploration" direction: homepage (hero + stage index + 9 scenes + sticky StageNav), scroll storyboard, technical page (02 Petroleum System), design-system page, tokens and explorer components.
Do not edit files in this folder. To restore Version 1, copy these files back over their original paths (strip the versions/v1/ prefix).
@dsCard tags were removed from the snapshot HTML so it does not duplicate cards; restore them from the first lines below when copying back:
- ui_kits/explorer/index.html: <!-- @dsCard group="Exploration Website" viewport="1440x1100" name="Homepage" subtitle="Hero, stage index, nine journey scenes, sticky StageNav" -->
- ui_kits/explorer/Technical.html: <!-- @dsCard group="Exploration Website" viewport="1440x1000" name="Technical page — Petroleum System" subtitle="Representative chapter page" -->
- ui_kits/explorer/Storyboard.html: <!-- @dsCard group="Exploration Website" viewport="1440x1000" name="Scroll storyboard" subtitle="Scene-by-scene transition concepts for scroll-driven motion" -->
- ui_kits/explorer/DesignSystem.html: <!-- @dsCard group="Exploration Website" viewport="1440x1000" name="Design system overview" subtitle="Palette, type, controls, visualization, navigation, layout" -->

Note: .jsx files are stored as `.jsx.txt` so the compiler does not bundle duplicates — rename back to .jsx when restoring.

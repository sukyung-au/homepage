# Oil & Gas Development — Design System

## Context
A design system for an oil & gas development company's public web presence (corporate site, operations/asset pages, sustainability reporting, investor surfaces). The company name was given only as "Oil & Gas Development"; that string is used as a placeholder wordmark everywhere.

**Sources:** No codebase, Figma, logo, imagery or deck was provided. The visual language comes from a written brief (pasted into the project chat) that describes a photography-first, near-invisible-UI web style: full-bleed alternating light/dark tiles, one blue accent, pill CTAs, 17px body text, one product drop-shadow. The brief's tokens are applied here to oil & gas content.

## Primary direction — Scientific Exploration (v2)
The current main design reference is a user-supplied homepage concept image (`uploads/pasted-1791168545381-0.png`): bright, clean, editorial, blue-led, large imagery and technical visualization in asymmetric image + text compositions. Concept: **OIL & GAS DEVELOPMENT — From Subsurface to Field Development**. The site is a journey through 9 stages: Surface → Petroleum System → Subsurface → Well & Logging → Seismic → Reservoir → Reservoir Engineering → Production → Field Development.
- **Palette:** Primary #0A5CDB (actions, current stage), Secondary #12A4D9 (water, sea level, secondary series), Accent #F29A1F (hydrocarbons in data only), Neutral #0B1A2C, Background #F6F8FB, lines #DCE3EC. Tokens in `tokens/explorer.css` (`--ex-*`, `--viz-*`).
- **Type:** Inter (EN) + Pretendard (KR). Display Light 300 (hero uppercase, 0.92 leading, −0.025em). Scene titles 300 sentence case. Eyebrows 12px 600 +0.16em uppercase with a stage number and a 32px rule. Korean body 17/1.75.
- **Scenes, not cards:** every section is one scene (min-height 880px, 140px vertical padding) — one large visual bleeding to the viewport edge + a short text block, split ~1:2, alternating sides. Lists are rule-separated, never boxed.
- **Depth tones:** scene backgrounds darken with depth (F6F8FB → EEF2F7 → E6ECF3 → navy 0B1A2C at Seismic → 13263D Reservoir) and lighten again on the ascent (Engineering → Production → Field).
- **Technical visuals:** callouts are white 6px tags with a dot + 40px leader line. Colour ramps appear only as data legends.
- **Elevation:** flat everywhere; the sticky StageNav is the one floating element (`--shadow-float`).
- **Two navigations:** Journey (9 stages, StageNav, homepage) vs Technology IA (5 categories → open-ended topics, TechNav, topic pages). Categories: 01 Petroleum System · 02 Subsurface · 03 Reservoir · 04 Reservoir Engineering · 05 Field Development. Data in `ui_kits/explorer/stages.js` (`OGD_TECH`). `Technical.html` is the topic-page template.
- **Motion:** none implemented. Scenes carry `data-stage / data-scene / data-depth / data-transition-in / data-transition-out / data-persist`; see `ui_kits/explorer/Storyboard.html`.

The v1 tokens and components below (tiles, pills, utility cards) still work and pick up the v2 primary/ink colours.

## Content fundamentals
- **Voice:** calm, factual, confident. Short declarative headlines that end with a period: "Energy, developed." "Zero routine flaring." "Assets."
- **Structure per tile:** noun headline (asset, report, target) → one-line tagline under 8 words ("Long laterals. Lower intensity.") → one or two verbs as CTAs ("Learn more", "View data", "Read the release").
- **Person:** "we" for the company, rarely "you". No exclamation marks, no hype ("revolutionary", "world-class").
- **Casing:** sentence case for everything (headlines, buttons, nav). Proper nouns for basins and programs.
- **Numbers:** lead with them when they exist, with units: "142 kboe/d net", "Down 48% since 2019", "1.1 Bcf/d gross". Never decorative stats.
- **Legal:** forward-looking-statement disclaimers live in footer fine print (12px, muted), never in tiles.
- **Emoji:** never. Unicode: only the › chevron after text links (rendered via icon font).

## Visual foundations
- **Color:** one interactive color, Action Blue #0066cc (links, pills, focus root). Focus Blue #0071e3 for focus rings and selected chips. Sky Link Blue #2997ff for links on dark tiles only. Surfaces are white, parchment #f5f5f7, and near-black tiles #272729 / #2a2a2c / #252527; pure black only for the global nav and media voids. All text on light is ink #1d1d1f. No second brand color; no safety-orange or "energy" hues.
- **Type:** SF Pro Display/Text via system-ui, Inter as the off-Apple fallback. Weights 300/400/600/700 — 500 is never used. Headlines 600 with negative tracking (56px hero −0.28px). Body 17px/1.47/−0.374px. Weight 300 only on 24px airy leads and 18px store-hero buttons.
- **Spacing:** 8px base with tokens 4/8/12/17/24/32/48/80. Tiles have 80px vertical padding and stack with 0 gap. Text containers 980px, grids 1440px, 20px gutters.
- **Backgrounds:** full-bleed photography or flat surface colors. No gradients, patterns, textures or illustrations. Atmosphere comes from the photograph.
- **Imagery:** real operational photography — pads, platforms, landscapes, facilities — natural light, quiet composition, slightly cool/neutral grade, no heavy grain. Full-bleed and square-cornered in tiles; 8px radius inside cards.
- **Section rhythm:** light hero → dark tile → parchment tile → dark → parchment footer. The color change is the divider; no rules or borders between sections.
- **Cards:** white, 1px #e0e0e0 hairline, 18px radius, 24px padding, no shadow.
- **Shadow:** exactly one — `rgba(0,0,0,.22) 3px 5px 30px` — on product/equipment renders resting on a surface. Never on cards, buttons, text.
- **Borders:** 1px rgba(0,0,0,.08) hairlines on cards, frosted bars and search. Pearl button uses a 3px #f0f0f0 soft ring.
- **Transparency & blur:** only on sticky bars (sub-nav, bottom sticky bar): parchment at 80% with saturate(180%) blur(20px), and translucent circular chips over photography. No protection gradients behind text — choose photos with calm areas.
- **Radii:** 0 tiles · 5 rare chip links · 8 utility buttons/inline images · 11 pearl capsule · 18 cards · pill for every action-shaped element (CTA, search, option chips) · 50% for circular controls.
- **Hover:** not part of the system beyond underlined text links. Don't design hover states.
- **Press:** `transform: scale(0.95)` on every button. Focus: 2px solid #0071e3 outline.
- **Motion:** minimal. 200ms standard ease on the press transform; content fades only. No bounces, no parallax.
- **Fixed elements:** global nav (44px) at top; frosted sub-nav (52px) sticks; optional 64px frosted sticky bar at bottom for multi-select flows.
- **Density:** very low everywhere except the footer, which is intentionally dense.

## Iconography
- No brand icon set was supplied. **Substitute:** Lucide icon font from CDN (`lucide-static@0.460.0`, imported in `tokens/fonts.css`). Use as `<i class="icon-search"></i>`.
- Icons are sparse: search and locale in the global nav, chevrons after links and in carousels, a search glyph in the input, play/close on media. Thin line style, ink or muted color, sized to the adjacent text.
- No emoji, no PNG icons, no illustrations. No logo exists — the brand is set in type (Display 600). Do not draw one.

## Index
- `styles.css` — entry; imports `tokens/{fonts,colors,typography,spacing,shape,base}.css`
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand)
- `components/` — React primitives (see below), each with `.d.ts` + `.prompt.md` + a card
- `ui_kits/explorer/` — **v2 exploration website**: Homepage (index.html), Storyboard.html, Technical.html (02 Petroleum System), DesignSystem.html
- `ui_kits/website/` — v1 corporate website click-through (Home, Operations assets, Sustainability)
- `thumbnail.html`, `SKILL.md`

## Components
- explorer/: **StageNav** (sticky bottom journey nav — homepage), **TechNav** (Technology section bottom nav — 5 categories, expandable topic collections, prev/next), **TechViz** (procedural seismic / strata / structure / reservoir / log / decline), **SiteHeader**, **ArrowCTA**, **DepthRuler**
- buttons/: **Button** (primary, secondary, dark-utility, pearl, store-hero), **IconButton**, **TextLink**
- navigation/: **GlobalNav**, **SubNav**
- surfaces/: **ProductTile**, **QuoteCard**, **StickyBar**, **MediaFrame**
- cards/: **UtilityCard**, **OptionChip**
- forms/: **SearchInput**
- footer/: **Footer**

### Intentional additions
- **TechViz** — no real seismic/log/model exports were supplied; procedural stand-ins keep scenes legible until they are.
- **MediaFrame** — image slot with placeholder state, since no photography was supplied and every tile needs one.

## Known gaps
- Font files: SF Pro is proprietary and not shipped; Inter (Google Fonts) is the fallback off Apple platforms.
- No form validation/error states, no dark-mode cards, no data-visualization styles defined.

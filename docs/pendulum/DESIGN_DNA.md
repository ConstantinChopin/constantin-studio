# Pendulum — DESIGN_DNA

Multimodal asset search at enterprise scale (pgvector · CLIP · Voyage · Vision API · Modal). Built with R/GA, WPP, Kering. The product is an editorial, gallery-like retrieval surface: a warm-cool light field of mixed-modality asset tiles, natural-language query, and system-surfaced suggestions.

Source of record: Figma `Studio-documentation` (`Vro7W61Zrv2DjExmzsuxDR`), frame **2018:590**, pulled via the Figma Dev Mode MCP on 2026-07-17. Values below are **shipped/observed** unless marked. Frame is rendered at a ~1.0197× nest scale; type/radii here are de-scaled to clean px (raw Figma value ÷ 1.0197).

## Static

### Colour (cool, light, editorial — TOKEN/OBSERVED)
The neutral is deliberately biased toward the accent: the field is a light lavender-grey, not a warm off-white.

| Role | Value | Notes |
|---|---|---|
| Field / app background | `#F5F5F8` | the masonry ground — cool light lavender-grey (25× in frame) |
| Near-white / raised | `#F7F7F9` | |
| Card / tile surface | `#FFFFFF` | white tiles on the field |
| Primary ink | `#31313B` | cool blue-black — serif titles + body |
| Secondary text | `#4F4F58` | |
| Muted label | `#8D8D96` | metadata labels (Inter) |
| Tertiary / light rule | `#B9B9BC` | |
| Hairline | `rgba(0,0,0,0.12)` | THE border (14×) |
| **Accent — periwinkle** | `#DADAF5` | the one cool hue: query bubble, ask-bar tint, reading-panel wash. Used as pale tint, never saturated. |
| Avatar / presence brown | `#574131` | same brown as Lightnote presence — a studio through-line |
| Cream (rare) | `#F3F0EB` | Figma var "Light 3", incidental warm accent |

Accent discipline (OBSERVED): periwinkle `#DADAF5` marks *what the system is holding or saying* — the user's query, the answer panel, an attached artifact. Everything else is the cool greyscale.

### Type (TOKEN/OBSERVED)
- **Serif — `Cardo`** (Bold for titles/emphasis, Regular for body). Old-style humanist serif. The defining voice: titles *and* long-form reading are set in it.
- **Sans — `Inter`** for metadata labels ("Folder | 8 items", "Smart suggestion", timestamps).
- One **`Libre Franklin` Medium** usage (a control label) — the face Lightnote also uses.
- Tracking: 0 throughout.

Scale (de-scaled, px / line-height):
- 15 / 24 — base: Inter labels; Cardo body
- 21 / 33 — Cardo title S
- 27 / 36 — Cardo title M
- 33 / 45 — Cardo title L / display (up to 60 leading for the largest)

### Geometry (OBSERVED)
- **Radii are tiny — ~2–3px on cards/tiles** (near-sharp; raw 1.25 / 2.66 / 3.06px ÷ scale), with **full-round** (`radius: 1000`) for the ask bar, avatars, and attachment chips. Crisp/editorial — the inverse of Lightnote's radius-6.
- Border: `0.5px` hairline at `rgba(0,0,0,0.12)`.
- Shadows: essentially none — hierarchy is the field/tile tonal step + hairlines. (A soft card lift may exist on the reading panel; treat as OBSERVED-light.)
- Base gap ~6px; layout is otherwise absolutely composed (masonry), not a strict 4/8 spacing grid.

### Density
Editorial and airy. A masonry mosaic of mixed-modality tiles over generous field; long-form serif reading given a full measure. Labels small and quiet.

## Signature components (Pendulum-only)
1. **Multimodal "Ask anything" bar** — full-round pill input, paperclip (attach) + send, periwinkle border. THE surface. (Slot-4 live-component candidate.)
2. **Query message + attachment chips** — user bubble (`#DADAF5` + brown avatar) with attached-artifact chips: `PDF ↗` / `DOC ↗` badge + filename + ×.
3. **Retrieval answer** — assistant response grouping found assets by modality (Images / Videos / Documents / Folders) as numbered serif filenames.
4. **Smart-suggestion card** — Inter "Smart suggestion" label + Cardo prompt ("Surface all assets from 2 years ago").
5. **Folder stack** — overlapping asset thumbnails + "Folder | N items" + Cardo title.
6. **Reading / detail panel** — periwinkle-tinted, Cardo reading type, collaboration layer (brown avatar + `@mention` + timestamp + Share pill + open ↗ / more …).
7. **Masonry mosaic** — the mixed-modality result grid.
8. Supporting: modality badge (`PDF`/`DOC`), avatar, filter pill ("All ⌃"), header controls.

**Money cell (system graphic):** a **semantic-retrieval constellation** — a query resolving into ranked multimodal results by vector similarity, the pgvector/CLIP space drawn in pale periwinkle. The one graphic only a multimodal-search product would produce (Pendulum's equivalent of Lightnote's wire).

## Motion inventory
**UNKNOWN — the file carries no motion tokens.** Proposed **DECIDED** for the board, pending Constantin's correction: base easing `cubic-bezier(0.25, 0, 0, 1)`; ~160ms control state, ~200ms surface enter (y 8→0 + fade); the query bubble arrives, the answer stages in, results settle. All ambient loops `prefers-reduced-motion`-gated. Replace with shipped values if they exist.

## Provenance
- src: Studio-documentation · `Vro7W61Zrv2DjExmzsuxDR` · frame 2018:590
- Figma Dev Mode MCP · 2026-07-17
- Fonts to self-host: Cardo (OFL), Inter (OFL); Libre Franklin already in repo.

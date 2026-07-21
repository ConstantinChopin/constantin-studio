---
permalink: false
eleventyExcludeFromCollections: true
---

# Lightnote — DESIGN_DNA

Constitution for the Lightnote plate (slot 3) and every rebuilt Lightnote piece.
The project's design language — never the constantin.studio site voice, which
stages it. Site tokens never leak in; these never leak out.

**Source.** Figma *Studio-documentation* (`Vro7W61Zrv2DjExmzsuxDR`), both
Lightnote product frames — `2:122` "Canvas" (image sets, selection, action bar)
and `3:615` "Canvas large 2" (the workflow node graph) — pulled via Dev Mode MCP
2026-07-16. Variable definitions from both frames + `3:615` metadata, cross-read
against the frames' generated code. Both frames surface the **same** warm/grey
token family; neither exposes the dark surfaces as variables.

Every value is tagged, per the extraction rule (no inference, no rounding):

- **TOKEN** — a named Figma variable (the system as codified)
- **OBSERVED** — read from the frames' fills/geometry; shipped, but not a named token
- **DECIDED** — no value exists in the file (motion); chosen for the rebuild and shipped in code, labelled as such in provenance
- **UNKNOWN** — the file is silent and nothing has been decided

Approved claim the plate must serve:

> **Lightnote:** Taking over another designer's product in an emerging AI space,
> the design system and the screens were rebuilt in parallel — each hypothesis
> prototype hardened the system, and the system made the next prototype faster.
> Under hard time constraints, pre-AI tooling, modernization and validation
> happened as one motion.

---

## 1. Color

### Named variables — TOKEN (verbatim from Figma)

| Token | Value | Role as named |
|---|---|---|
| Surface-primary | `#E8DDC4` | warm surface |
| Surface-tertiary | `#F3F0EB` | cream surface (alias **Light 3** `#f3f0eb`) |
| Surface-quaternary | `#F6F5F1` | near-white surface |
| Accent-primary | `#49454F` | primary accent |
| Accent-secondary | `#565859` | secondary text/accent |
| Accent-tertiary | `#999999` | tertiary text / label (the workhorse grey) |

> **Mode caveat — needs confirmation.** These variables resolve to a *warm*
> family, yet frame `3:615` renders on a near-black field with dark cards. Either
> the variables carry a second (dark) mode not surfaced by `get_variable_defs`,
> or the dark surfaces below are hardcoded fills rather than tokens. Confirm in
> Figma's variables panel (light/dark modes) before treating the dark values as
> tokens. Until then they are OBSERVED, not TOKEN.

### Observed in the render — OBSERVED (not confirmed as tokens)

| Role | Value | Notes |
|---|---|---|
| App field | `#151515` | outermost background |
| Workspace panel | `rgba(35,34,31,0.24)` on field | + hairline, radius 8 |
| Dark surface (cards, buttons) | `#212120` | most common dark fill |
| Dark emphasis | `#23221F` | "Create set", active tab, ink-on-cream |
| Raised dark (input fills) | `#3A3A38` | fields on dark cards |
| Primary ink on dark | `#ECE6D9` | cream ink |
| Toolbar tray / muted ink | `#C7C4BD` | the floating bar's tray |
| Selection blue | `#3580C6` | marquee + handles — the only cold hue |
| Presence blue / brown | `#3D487E` / `#574131` | collaborator identity dots |
| Avatar letters | `#F2F2F2` | on presence dots |
| Hairline | `rgba(153,153,153,0.24)` | THE border of the system |
| Hairline strong | `rgba(153,153,153,0.6)` | corner identity mark only |

System logic: a near-black field, warm cream surfaces, **cream reserved for
action**, blue reserved for **what the hand is holding** (selection + presence).
No other hue exists.

## 2. Type — TOKEN

One family, one weight. Two named styles.

| Token | Spec |
|---|---|
| Text 2 – Medium | Libre Franklin Medium (500), size 13 / line-height 22, tracking 0 — controls, labels, body |
| Text 3 – Medium | Libre Franklin Medium (500), size 11 / line-height 19, tracking 0 — small meta |

Libre Franklin is OFL (Google Fonts) — self-host, subset to used glyphs, no CDN.
No second weight and no second family appear in either frame. A 14px centered
avatar letter is OBSERVED (not a named style).

## 3. Geometry — OBSERVED

Parsed from the frames' generated code (occurrence counts in parens).

- **Radii:** `6px` is the system radius (63×). `4px` inner (inputs, tiles, dark
  toolbar button). `8px` for the workspace panel and floating-bar tray. Full-round
  (`1000px`) for presence dots and icon circles.
- **Borders:** `0.5px` hairlines everywhere (11×). The selection marquee is the
  sole `2px` stroke. `1.111px` appears 5× (a scaled export artifact — treat as 1px).
- **Shadows:** none observed. Hierarchy is fill steps + hairlines, not shadow.
  (A drop shadow in a rebuild is a drift bug.)
- **Control height:** `28px`, universal (43×).
- **Optical centering:** 28px controls pad `top 3px / bottom 4px` — text sits
  ~0.5px high of geometric center. Deliberate; keep it.
- **Spacing scale:** `4 / 8 / 12`. Gaps: 4 (within control), 8 (between controls),
  12 (between groups). Card inner inset 12; field inner inset 8.
- **Icons:** 22px standard, 16px small, in 38px hit-area buttons.

## 4. Grid / layout — OBSERVED (from `3:615` metadata)

- **Node card** (`Component 26`): 291px wide, 12px inner padding → 267px content column.
- **Card header row** (`Component 16`): 28px tall — label left, 22px icon slot right.
- **Field group** (`Frame 165/167/168`): 51px tall = 19px label + 4px gap + 28px input.
- **Section stack gap:** 36px between header and body block; field groups stack at 8px.
- **Input field** (`Component 14`): full 267px width, 28px tall, 8px text inset, 28px trailing icon.
- **Set thumbnail grid** (`Frame 175`): 251px square, 2×2 of 125.5px tiles, 2px gutter.
- **Frame `3:615` outer:** 1728 × 1117; inner `Frame 1` 1704 × 1053 at 12px inset.
- **Bottom node palette** (`Component 20`): 656px wide, 28px-tall pills grouped Load/Process/Save.

## 5. Components & variant axes — OBSERVED (Figma names)

- `Component 26` — the node card (Load / Process shells).
- `Component 16` — card header (badge + kebab).
- `Component 14` — input field (label + value + trailing chevron/icon).
- `Component 13` — list row / value chip / toggle.
- `Component 12` — cream primary button (e.g. Run LoRA).
- `Component 15 / 16 / 17` — node-palette button variants (Load / Process / Save families).
- `Component 19 / 20` — the Preview card's Run bar and the bottom node palette.
- `Icons` — one instance component, 16 / 22 / 28px slots.
- Node "kind" badges observed as text: **Load**, **Process** (no Store/Run badge in this frame).
- Variant axes are not exposed by `get_metadata` — **UNKNOWN**; open the component
  set in Figma to record them (likely: kind = Load/Process, state = default/active).

## 6. Motion

No motion tokens exist in the Figma file — the record is static frames. The slots
below are labelled for hand-fill. Values marked **DECIDED** were chosen for the
rebuilt pieces this session and shipped in code (`prefers-reduced-motion` falls
back to the poster frame); they are labelled as decided-for-rebuild in provenance,
not recovered from Figma. Correct any before the plate cites them.

| Behavior | Value | Tag |
|---|---|---|
| Base easing | `cubic-bezier(0.25, 0, 0, 1)` — fast-out, no bounce | DECIDED |
| Micro (hover fill/text) | `120ms` | DECIDED |
| Control state / crossfade | `160ms` | DECIDED |
| Action-bar enter (on selection ≥1) | `200ms`, `translateY(8px)→0` + fade | DECIDED |
| Node wire connect | draw port→port, dot lands | UNKNOWN (never built) |
| Marquee / drag / pan | **none — 1:1 with pointer** (latency here is negative proof) | DECIDED |
| Field value changes | **none** — data snaps, chrome moves | DECIDED |
| Stagger logic | UNKNOWN | UNKNOWN |
| Spring configs | UNKNOWN (project uses eased curves, not springs) | UNKNOWN |

## 7. Plate note (slot 3)

The system board must render these values as an authored artifact, not a spec
sheet — dense and gridded (to sit opposite the sparse live component in slot 4).
Composition candidates from the six-slot brief: **Type Case** (compartment grid
proving the 4/8/12 rhythm) or **Exploded Component** (a Train LoRA card exploded,
each layer annotated with the token it consumes). Every position must derive from
a real value above; the "swap the values and it becomes a different artwork" test
is the guard against generic plausibility.

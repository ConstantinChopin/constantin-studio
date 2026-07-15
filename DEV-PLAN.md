# constantin.studio — Development Plan

Written 2026-07-14 against a source-level comparison with constantin.world
(`..\..\Frontend`). The two sites are the same Eleventy scaffold — this site is the light
inversion of .world — so both goals below are edits to `src/index.njk` + `src/styles.css` only.
The palette stays divergent by design (light `#fefaf8` paper vs .world's `#090d09`); *layout*
mirrors, theme does not.

## Goal 1 — Mirror the latest .world index layout

.world's index moved on after the fork (commits `0b466fa` "drop the date/skill gutter, flush
rows left, one-line glosses", `27cd74f`); this site still has the older row anatomy. To match:

1. **Rows flush left, no gutter.** `styles.css` (~line 387): replace the
   `display:grid; grid-template-columns: 2.75rem 1fr` row with .world's block form:
   `.row { position:relative; display:block; padding:.38rem 0; color:var(--ink); }`
   Keep the light-theme hover/active underline treatment as-is.
2. **Drop `.row-meta` from the markup** in `index.njk` (both the `<a>` branch and the
   `.is-static` Services branch). Keep the CSS rule defined-but-unused, as .world does.
3. **`.row-desc` runs full width** of the indented column (one-line gloss under the title) —
   copy .world's widened rule.
4. **Tighten shelf rhythm:** `.shelf { margin-top: clamp(1rem, 2.4vh, 1.5rem) }` (currently
   `clamp(1.6rem,4vh,2.4rem)`).
5. **Remove the `reveal` stagger classes** from the index header/shelves and **drop the
   colophon footer** from the index — .world's current index has neither. (Move the contact
   mailto into the Contact shelf entries if it isn't already represented there.)
6. Keep `.row.is-static` (Services) — a legitimate .studio-only addition; style it to sit
   flush like the linked rows.

*Verify:* side-by-side at 1440px and at <64rem: identical index anatomy (glyph, shelf label,
flush title + gloss), .studio stays light, no reveal flicker, Services rows aligned with Work
rows.

## Goal 2 — Right panel: plate grid instead of live preview

Replace the `.pane-detail` live-iframe viewport with a **plate grid**: a scrollable mosaic of
16:9 presentation cards and 1:1 square tiles, fed by images per project. No live prototypes.

### 2.1 Data

In `src/_data/studio.json`, give each Selected Work entry a `plates` array:

```json
"plates": [
  { "src": "/assets/work/lightnote/canvas.png",  "ratio": "wide",   "alt": "Canvas view" },
  { "src": "/assets/work/lightnote/tokens.png",  "ratio": "square", "alt": "Token board" }
]
```

- `ratio`: `"wide"` (16:9 presentation card) | `"square"` (1:1 tile).
- Images live under `src/assets/work/<slug>/` — the existing
  `addPassthroughCopy("src/assets")` ships them with no config change. Export at 2x display
  size (~1600px wide for 16:9, ~800px for square), compressed.

### 2.2 Markup + layout

In `index.njk`, inside `.pane-detail`, replace the `.viewport`/`#detailFrame` card with:

- `<div class="plates" id="plates">` — a CSS grid, e.g. 2 columns; a `wide` plate spans both
  columns (`grid-column: 1 / -1`, `aspect-ratio: 16/9`), a `square` plate takes one
  (`aspect-ratio: 1/1`). Grid auto-flow dense so squares pair up beside/below the wides.
- Each plate reuses the `.case-fig .frame` treatment already in `styles.css` (~770–784):
  rounded, hairline border, warm shadow — the site's existing media-plate language.
  `img { width:100%; height:100%; object-fit:cover; }`
- Render all projects' plate sets in the markup (one `<div class="plate-set" data-id="...">`
  per project, hidden by default) so switching needs no fetch.

### 2.3 Behavior — keep selection, simplify the controller

Keep the master–detail interaction: clicking a Work row still opens the right pane
(`body.detail-open`, the `.split` track animation) and shows **that project's plate set**. The
controller script in `index.njk` slims down accordingly:

- Keep: hash routing (`#lightnote`), `.is-active` row state, default-open of the first project,
  Esc/close, below-64rem fallback (rows navigate to `href` directly — case study page).
- Remove: iframe wiring, `postMessage` breadcrumb protocol, fullscreen button, sandbox attrs,
  glyph-clone-into-toolbar. (The `preview` field in `studio.json` becomes unused for the panel;
  keep `href` for the case-study link. Entries whose plates aren't shot yet fall back to
  opening `href`.)
- Row click: swap visible `.plate-set`, scroll the pane to top. Plates fade in staggered
  (~40ms steps) on set-switch — the pane's one moment of motion.
- Plate click (optional, later): open the project's case study at `href`.

*Verify:* `npx @11ty/eleventy --serve` (port 8091) — row click swaps plate sets with the track
animation intact; wide/square rhythm holds at 1280/1440/1920; below 64rem rows navigate to case
studies; no console errors from the removed iframe code; Services/Contact rows unaffected.

## Order

1. Goal 1 (small, pure CSS/markup) — do first, it re-baselines the index against .world.
2. Goal 2.1–2.2 with placeholder images for Lightnote, Asterlogos, Sanctuaire.
3. Goal 2.3 controller slim-down.
4. Replace placeholders with real shots as they're produced (drop-in, no code).

# Parable — Design DNA

The constitution for every rebuilt Parable piece on the studio page. Static half
is derived from the case-study copy's stated token values (high confidence).
Motion half is **PROPOSED** — the copy names no timings; these are restrained
defaults tied to the "Threshold" philosophy, flagged for Constantin's sign-off.
Every rebuilt tile references these values and nothing approximated silently.

Claim (page spine): **AI-composition lead.** The design system is the constraint
layer that makes AI-composed UI trustworthy — a small, named space of valid
output an agent composes from, not an open canvas. The density contract and the
token entropy cut are the evidence it's real.

---

## STATIC

### Palette — "The Threshold: light emerges from darkness"
A dark field; content emerges through luminosity. Values verbatim from copy.

| Token            | Value      | Role                                  |
|------------------|------------|---------------------------------------|
| `field-deep`     | `#120612`  | deepest ground (page)                 |
| `field-base`     | `#1c0f1b`  | base surface                          |
| `field-raised`   | `#261823`  | raised card / panel                   |
| `field-border`   | `#44333b`  | hairline / divider                    |
| `emergence-3`    | `#b8b198`  | tertiary text (muted warm)            |
| `emergence-1`    | `#f3f0e0`  | primary text (emergent light)         |
| `accent-500`     | `#8B5CF6`  | accent — selection / action only      |
| brand logo       | gradient   | violet→magenta (recommendation pill)  |

**Derived / flagged (not in copy — interpolated, marked in colophon):**
- `emergence-2` ≈ `#d5cfbc` (interpolated between 1 and 3)
- Status set, re-tuned warm & desaturated per the copy's "craft note" (names given,
  hexes derived): `success` sage `#8f9e79` · `warning` amber `#d8a85c`
  · `error` coral `#d98a72` · `info` = `accent-500` `#8B5CF6`.
  (Copy: shipped as cold web values `#3b82f6`/`#22c55e`, re-tuned into the Threshold.)
- Recommendation gradient ≈ `linear-gradient(90deg,#3a1730,#8e2f6b,#c23b86)` (from website.png).

### Type — **STAND-INS, flagged**
Parable ships three PP faces (PP = Pangram Pangram): a serif **display**, a
**grotesque**, and a mono. The licensed woff2 are not in the repo, so the board
uses self-hostable stand-ins and says so in the colophon:
- **Display serif** → `Fraunces` (high-opsz, high-contrast editorial) — stand-in for PP Editorial New.
- **Grotesque** → `InterVar` (already self-hosted at `/assets/work/pendulum/inter-var.woff2`) — stand-in for PP Neue Montreal.
- **Mono / captions** → `IBM Plex Mono` (the site `--mono`).

Roles: serif display for report titles & the big conclusive number; grotesque for
UI labels, values, chips; mono only for apparatus captions.

### Form
- **Radius:** one family — cards ~14px, chips/pills full (1000px), inputs ~10px.
- **Hairline:** `field-border` at ~0.5–1px; dividers low-contrast.
- **Elevation:** near-flat; raised = `field-raised` over `field-base`, no hard shadow — depth by luminosity, not drop-shadow.
- **Accent discipline:** violet is selection/action ONLY, never decoration (mirrors Lightnote's "blue = selection only").

### Density — the first-class, decoupled axis (the main challenge)
Three tiers, expressed as a contract, decoupled from *who* uses it:
- **Sparse** · **Comfortable** · **Compact**
- Card-padding tokens collapse 5 → 3: `--card-padding-sparse / -comfortable / -compact`.
- Components reference **semantic** spacing (`--space-element`, `--space-container`), never raw px.
- Cascade mechanism: **one** `data-density="…"` on a container resolves through a CSS
  attribute-selector cascade → padding, gap, type scale, elevation. No per-component prop.
- Whitespace **floors** (judgment calls, then enforced): Executive ≥55% · Operational ≥40% · Configuration ≥35%.
- Posture ↔ density mapping used in the live demo: Executive→Sparse · Operational→Comfortable · Configuration→Compact.

### Signature components (only Parable would produce these)
1. **Costed recommendation banner** — the violet→magenta gradient pill with the big conclusive number ("Potential Savings $1.2M"). The money cell.
2. **Work-report donut organism** — register-aware ring (Maintenance 30% · EST. TIME · TOTAL PAYROLL).
3. **Connector-status chips** — Slack · Salesforce · Workday · GitHub · Jira ("reads the whole company").
4. **Ponder ask surface** — "Ask anything…" + "Show thinking · N sources" + source chips (SALES-2847, sprint retro, csv).
5. **Density posture card** — the same metric at register-3, re-posed by one attribute.

### Icons
Lucide (stroke-based, ISC-licensed — never SF Symbols). Parable's actual verbs:
`search`, `git-branch`, `message-square`, `database`, `layers`, `sparkles`,
`bar-chart`, `sliders`, `chevron-down`. Stroke width 1.6 on a 24 grid.

---

## MOTION — **PROPOSED, flagged for sign-off**
Half of "design engineer" is motion; the copy specifies none, so these are
restrained proposals in the Threshold register, all `prefers-reduced-motion`-gated,
all `transform`/`opacity` only. Retune centrally — they live as CSS vars.

- **Primary easing:** `cubic-bezier(0.2, 0, 0, 1)` (matches the site `--ease`; a decisive settle, no bounce).
- **Posture re-pose (Slot 4, the featured beat):** 420ms — padding, gap, type-scale and opacity cross-fade as one attribute flips E→O→C. Numbers hold position (no layout jump); whitespace opens/closes around them.
- **Ambient posture loop:** dwell 2200ms per posture before auto-advancing; pauses on hover/focus and once the visitor takes over.
- **Disclosure descent (ambient, if used):** 320ms per layer, additive reveal over a persistent surface — never a view swap.
- **Hover states:** 160ms on chips/buttons (accent border emerge, ≤1.04 scale on primary).
- **Deliberately still:** the donut does not spin; the recommendation number never counts up; the field never parallaxes. Restraint is the brand.
- **Reduced-motion:** every tile renders a static poster frame (Operational posture; full selection), still keyboard-operable.

---

## PROVENANCE (colophon line)
`tokens.css · Threshold palette` · type = self-hostable stand-ins (Fraunces / InterVar / IBM Plex Mono) for PP Editorial New / PP Neue Montreal / PP mono · motion values proposed for this case study · 2026-07-17.

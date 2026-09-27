---
permalink: false
eleventyExcludeFromCollections: true
---

# Enable — DESIGN_DNA

Constitution for every rebuilt Enable piece. The project's design language — never
the constantin.studio site voice, which stages it. Site tokens never leak in;
these never leak out.

**Source.** Two product screenshots supplied by Constantin 2026-08-18: the
validation card ("What this document says", meal-benefits question) and the
review summary ("Review — 8 of 10 answered"). No Figma pull yet — every static
value below is **OBSERVED** (pixel-read, approximate) until Figma frames or the
prototype repo's stylesheet supply exact values. If either exists, replace the
OBSERVED table wholesale; real values beat pixel-guessing.

Tags, per the extraction rule (no inference, no rounding beyond stated ~):

- **TOKEN** — a named variable from the source of truth (none yet)
- **OBSERVED** — read from the screenshots; shipped, but approximate
- **DECIDED** — no value recoverable (motion); chosen with Constantin and shipped in code, labelled in provenance
- **UNKNOWN** — nothing known and nothing decided

Approved claim the piece must serve (**PENDING CONSTANTIN'S APPROVAL — see chat**):

> **Enable:** The agency asked to hand-review every machine-filled field; the
> review flow kept the rule and changed its shape — the system proposes with
> evidence, the human disposes with a keystroke. Rejection is not a dead end:
> corrections land at the corrector's layer, attributable, which makes review
> the way the knowledge model gets populated.

---

## 1. Color — OBSERVED

Warm paper register. One brown carries all primary action; state hues (green /
red / amber) appear only as pale tints with saturated ink on top. No cold hue
anywhere in the flow.

| Role | Value (~) | Where seen |
|---|---|---|
| Modal surface | `#FAF8F5` | both screenshots, main field |
| Claim-card fill | `#F3EFE7` | proposed-claim card |
| Backdrop | dimmed grey-brown scrim | behind modal |
| Ink primary | `#1F1D1A` | question text, claim text |
| Ink secondary | `#8A857D` | meta line, shortcuts, source line |
| Action brown (fill) | `#7C5A33` | "Save 8 answers" CTA, top accent bar |
| Action brown (ink on tint) | `#6E5230` | "Yes" button text |
| Yes tint fill / border | `#EFE8DC` / `#CDBFA6` | Yes button |
| No red ink | `#C24438` | "No" text and × |
| No tint fill / border | `#FBECEA` / `#EFC5C0` | No button |
| Confirmed green ink | `#2E8B57` | row checkmarks |
| Confirmed tint fill | `#EAF4EC` | answered rows |
| Pending amber ink | `#C07A1E` | "2 still unanswered" banner |
| Pending tint fill | `#FCF3E2` | banner fill |
| Hairline | `rgba(31,29,26,0.10)` | header/footer dividers, cards |

System logic: **paper ground, brown = act, tints = state.** Saturated color is
ink only, never fill. Nothing else may claim a hue.

## 2. Type — OBSERVED / UNKNOWN

One sans family throughout, reads as Inter or near kin — **UNKNOWN, confirm the
shipped family** (product was assembled from off-the-shelf React libraries; a
default stack is plausible). No serif, no mono anywhere in the flow.

| Style | Size (~) | Weight | Notes |
|---|---|---|---|
| Question display | 34px | 400–500 | lh ~1.25, near-black |
| Claim text | 26px | 400 | inside claim card |
| Row / body | 17px | 400 | answered rows, list items |
| Section label | 13px | 600 | UPPERCASE, letterspaced ("NOT MENTIONED…") |
| Meta / shortcuts | 14–15px | 400 | grey; source line italic |
| Button label | 16–17px | 500 | Yes / No / CTA |

## 3. Geometry & density — OBSERVED

| Property | Value (~) |
|---|---|
| Modal radius | 22px |
| Card / row radius | 14px |
| Button / input radius | 11px |
| Button height | 52px (Yes/No), 48px (CTA) |
| Claim-card padding | 30px |
| Row padding | 16px 20px |
| Section gap | 28–36px |
| Borders | 1px, tinted per state (never grey on state elements) |
| Shadow | one soft ambient on modal only; rows/cards flat |

Density: generous, one idea per screen; the flow centres a single question in
abundant whitespace. Rebuilds must not compress it.

## 4. Iconography — OBSERVED

Stroke icons, light weight (~1.5px at 16–20px): magnifier, document, ✓, ×, ⚠,
←, →, ▼ disclosure. Rebuild with **Lucide** (stroke-based, ISC) — never
SF Symbols.

## 5. Voice in the UI — OBSERVED (verbatim)

The interface narrates its epistemics in full sentences; this is part of the
design language, not filler:

- "Question 1 of 10 · 0 of 10 answered · 10 proposed"
- "2 still unanswered — they stay pending and can be picked up later"
- "NOT MENTIONED IN THIS DOCUMENT (6)"
- "Nothing is recorded for these — an absent answer is not a 'no'."
- "Y / N to answer · ← → to move · Esc to close"
- Source lines quote the document verbatim, italic, with page ref: "…" · p.1

Em dashes appear in shipped UI copy (see above) — the site's no-em-dash prose
rule does NOT apply inside the product's own voice. New copy for the correction
state must be written in this register and approved.

## 6. Motion inventory — UNKNOWN until DECIDED

Nothing recoverable from stills. To be decided explicitly with Constantin
before the build (proposals in chat; whatever is chosen gets recorded here as
DECIDED and labelled in the piece's provenance):

| Moment | To decide |
|---|---|
| Card advance (after Y/N) | transition type, duration, easing |
| Correction state reveal (after No) | expand vs swap, duration, easing |
| Attribution line ("saved to organization layer") | how it enters |
| Button press feedback | any, or none |
| What never animates | e.g. text reflow, modal itself |

## 7. Correction state — content spec (NEW SCREEN, no shipped reference)

The one screen being built. It extends the validation card after **No**:

1. The rejected claim stays visible, struck or dimmed — the machine's proposal
   is never erased, provenance preserved.
2. Inline field, pre-focused, for the corrected value.
3. On save, an attribution line in the product's narrating voice:
   "Saved to organization layer · you · today" — layer name is load-bearing.
4. The canonical/proposed value remains legible beneath the correction —
   "a higher layer never silently overwrites a lower one," shown.
5. Footer shortcuts update to match the state.

Exact copy for 3 is **UNKNOWN** (invented for the rebuild — flag in provenance
as reconstruction, not screenshot).

## 8. Provenance line for the piece

"Interaction rebuilt in code for this case study. The correction state is a
reconstruction of shipped behavior; values pixel-read from product screenshots,
motion decided for the rebuild."

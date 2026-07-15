// Shelf glyphs for the home index — the exact same set as constantin.world
// (armillary / codex / dividers), so the two sites share one glyph language.
// Each shelf in studio.json references one by key.
module.exports = {
  // an armillary sphere — the projects shelf (world's "artefacts" glyph)
  projects: `<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" aria-hidden="true">
              <g transform="rotate(-16 12 12)">
                <circle cx="12" cy="12" r="8" />
                <ellipse cx="12" cy="12" rx="8" ry="3" />
                <line x1="12" y1="1.5" x2="12" y2="22.5" />
              </g>
            </svg>`,

  // an open codex — the writing shelf
  writing: `<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
              <path d="M12 6 C9.5 4.5 6 4.3 3.5 5.4 L3.5 18.2 C6 17.1 9.5 17.3 12 18.8" />
              <path d="M12 6 C14.5 4.5 18 4.3 20.5 5.4 L20.5 18.2 C18 17.1 14.5 17.3 12 18.8" />
            </svg>`,

  // a pair of dividers — the resources shelf
  resources: `<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="4.4" r="1.5" />
              <path d="M11.1 5.7 L5 20" />
              <path d="M12.9 5.7 L19 20" />
              <path d="M7.4 13 A 5.4 5.4 0 0 0 16.6 13" />
            </svg>`,

  // a sealed letter — the footer contact glyph
  contact: `<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
              <path d="M4.5 7 L12 13 L19.5 7" />
            </svg>`,
};

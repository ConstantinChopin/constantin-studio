/* PixelWave — single-wave, three-tone greyscale animated background.
 * Settings locked. Self-contained, no dependencies, no runtime controls.
 *
 * Usage:
 *   1. Add <canvas id="pixel-wave" aria-hidden="true"></canvas> as the first element in <body>.
 *   2. CSS:  #pixel-wave{ position:fixed; inset:0; z-index:0; pointer-events:none; }
 *            (make sure your content sits above it, e.g. .site-content{ position:relative; z-index:2; })
 *   3. Include this file:  <script src="pixelwave.js" defer></script>
 *
 * To tune, edit CONFIG below (the LOCKED SETTINGS block).
 * React note: run the IIFE body inside useEffect and, on cleanup, cancelAnimationFrame
 * and remove the resize listener so hot-reload doesn't stack animation loops.
 */
(function () {
  const canvas = document.getElementById('pixel-wave');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // ————— LOCKED SETTINGS —————
  const CONFIG = {
    tones: ['198, 198, 196', '138, 138, 136', '52, 52, 50'], // light · mid · dark grey
    bands: [0.46, 0.62, 0.80], // wave thresholds; below bands[0] = paper
    pixelSize: 8,    // css px per cell
    intensity: 0.11, // 0..1 opacity of the tones
    speed:     0.2,  // wave speed multiplier (0 = frozen)
    gap:       1,    // css px gap between cells
    fadeLeft:  460,  // px: dissolve the wave over the leftmost N px (protect the reading column)
    refCell:   22,   // wave sampled against this fixed grid
    maxCells:  28000,// hard cap; auto-coarsens past this on very large screens
    fps:       30
  };
  // ———————————————————————————

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let DPR = Math.min(window.devicePixelRatio || 1, 1.5) || 1;
  let W = 0, H = 0;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 1.5) || 1;
    W = canvas.width  = Math.max(1, Math.round((window.innerWidth  || 1) * DPR));
    H = canvas.height = Math.max(1, Math.round((window.innerHeight || 1) * DPR));
    canvas.style.width  = (window.innerWidth  || 1) + 'px';
    canvas.style.height = (window.innerHeight || 1) + 'px';
  }
  window.addEventListener('resize', resize);
  resize();

  let phase = 0, last = performance.now(), lastDraw = 0;

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) { last = now; return; }
    if (now - lastDraw < 1000 / CONFIG.fps) return;
    lastDraw = now;
    if (!reduceMotion) phase += (now - last) * 0.001 * CONFIG.speed;
    last = now;
    draw(phase);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    let cell = Math.max(2, CONFIG.pixelSize * DPR);
    while ((W / cell) * (H / cell) > CONFIG.maxCells) cell *= 1.25;

    const REF   = CONFIG.refCell * DPR;
    const cols  = Math.ceil(W / cell);
    const rows  = Math.ceil(H / cell);
    const pad   = CONFIG.gap * DPR;
    const k     = CONFIG.intensity;
    const TONES = CONFIG.tones;
    const BANDS = CONFIG.bands;
    const fade  = CONFIG.fadeLeft * DPR;

    for (let gy = 0; gy < rows; gy++) {
      for (let gx = 0; gx < cols; gx++) {
        const x = gx * cell, y = gy * cell;
        const u = (x + cell / 2) / REF, w = (y + cell / 2) / REF;
        // organic / turbulent field: warp the sample point with a couple of slow
        // sines so the bands stop running parallel, then sum three octaves at
        // different angles and frequencies for a wandering, cloud-like drift
        const wu = u + Math.sin(w * 0.20 + t * 0.6) * 2.0;
        const ww = w + Math.sin(u * 0.16 - t * 0.4) * 2.0;
        const n1 = Math.sin(wu * 0.24 - ww * 0.14 + t * 0.9);
        const n2 = Math.sin(wu * 0.11 + ww * 0.19 - t * 0.6);
        const n3 = Math.sin(wu * 0.37 + ww * 0.05 + t * 1.3);
        const v  = (n1 * 0.5 + n2 * 0.32 + n3 * 0.18) * 0.5 + 0.5;

        let ti = -1;
        for (let i = BANDS.length - 1; i >= 0; i--) { if (v >= BANDS[i]) { ti = i; break; } }
        if (ti < 0) continue;

        let alpha = k;
        if (fade > 0 && x < fade) alpha *= (x / fade);
        if (alpha <= 0) continue;

        ctx.fillStyle = `rgba(${TONES[ti]}, ${alpha})`;
        ctx.fillRect(x + pad, y + pad, cell - pad * 2, cell - pad * 2);
      }
    }
  }

  requestAnimationFrame(frame);
})();

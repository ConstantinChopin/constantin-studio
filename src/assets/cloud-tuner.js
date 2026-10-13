/* Cloud tuner — a panel of sliders for adjusting the pixel sky live. It loads
 * only when the page address carries ?tune (pixelwave.js adds it), so the site
 * itself never sees it. Values are kept in this browser between reloads, and
 * "Copy settings" puts the ones that differ from the file on the clipboard, to
 * paste back so they can be written into CONFIG in pixelwave.js.
 */
(function () {
  const PC = window.PixelClouds;
  if (!PC) return;
  const { CONFIG, defaults } = PC;
  const KEY = 'cloud-tune';

  // [setting, label, min, max, step]
  const GROUPS = [
    ['Size', [
      ['widthScale',  'Cloud size',       0.4, 2.5, 0.05],
      ['sizeMin',     'Smallest cloud',   0.2, 1.5, 0.02],
      ['sizeMax',     'Largest cloud',    0.4, 2,   0.02],
      ['heightScale', 'Puffiness',        0.4, 1.8, 0.05]
    ]],
    ['How many', [
      ['spacing',     'Space between',    0.1, 4,   0.05],
      ['emptyChance', 'Empty slots',      0,   0.9, 0.01]
    ]],
    ['Look', [
      ['pixelSize',   'Pixel size',       3,   16,  1],
      ['gap',         'Pixel gap',        0,   4,   0.5],
      ['intensity',   'Opacity',          0.05, 0.8, 0.01],
      ['darkness',    'Darkness',         -0.4, 0.4, 0.02]
    ]],
    ['Motion', [
      ['speed',       'Drift speed',      0,   5,   0.1],
      ['evolve',      'Billowing',        0,   4,   0.1],
      ['fadeLeft',    'Fade on the left', 0,   1000, 10]
    ]]
  ];

  // starting points; each is applied on top of the values in the file
  const PRESETS = {
    'As in the file': {},
    'Fewer, bigger':  { widthScale: 1.5, sizeMin: 0.8, sizeMax: 1.3, heightScale: 1.1, spacing: 2.2, emptyChance: 0.3 },
    'Many, small':    { widthScale: 0.55, sizeMin: 0.5, sizeMax: 1.1, spacing: 0.45, emptyChance: 0.08 },
    'Thin wisps':     { widthScale: 1.2, heightScale: 0.6, spacing: 1.4, darkness: -0.2, intensity: 0.22 },
    'Chunky pixels':  { pixelSize: 10, gap: 2, intensity: 0.26 }
  };
  const KEYS = GROUPS.flatMap(([, rows]) => rows.map((r) => r[0]));

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(changed())); } catch (e) { /* storage blocked: values just won't survive a reload */ }
  }
  function changed() {
    const out = {};
    KEYS.forEach((k) => { if (CONFIG[k] !== defaults[k]) out[k] = CONFIG[k]; });
    return out;
  }
  try { Object.assign(CONFIG, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* nothing kept yet */ }

  const css = document.createElement('style');
  css.textContent = `
.cloud-tuner{position:fixed;right:16px;bottom:16px;z-index:100;width:min(270px,calc(100vw - 32px));max-height:calc(100svh - 32px);overflow:auto;padding:12px 14px;background:rgba(255,255,255,.95);border:1px solid rgba(17,15,15,.12);border-radius:14px;box-shadow:0 10px 28px rgba(24,18,12,.12);font:12px/1.4 var(--mono,ui-monospace,monospace);color:rgba(17,15,15,.82)}
.cloud-tuner .ct-head{display:flex;justify-content:space-between;align-items:center;gap:8px}
.cloud-tuner .ct-title{font-weight:500}
.cloud-tuner .ct-group{margin:12px 0 4px;color:rgba(17,15,15,.45)}
.cloud-tuner label{display:grid;grid-template-columns:1fr auto;gap:0 8px;margin:4px 0}
.cloud-tuner input[type=range]{grid-column:1/-1;width:100%;margin:2px 0;accent-color:#111}
.cloud-tuner .ct-row{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.cloud-tuner button{font:inherit;padding:3px 9px;border:1px solid rgba(17,15,15,.18);border-radius:999px;background:#fff;color:inherit;cursor:pointer}
.cloud-tuner button:hover{border-color:rgba(17,15,15,.5)}
.cloud-tuner .ct-note{min-height:1.4em;margin-top:6px;color:rgba(17,15,15,.5)}
.cloud-tuner textarea{width:100%;height:90px;font:inherit;margin-top:6px}
.cloud-tuner.is-min .ct-body{display:none}`;
  document.head.appendChild(css);

  const panel = document.createElement('div');
  panel.className = 'cloud-tuner';
  panel.innerHTML = '<div class="ct-head"><span class="ct-title">Clouds</span><button type="button" data-act="min">Hide</button></div><div class="ct-body"></div>';
  const body = panel.querySelector('.ct-body');
  const inputs = {};

  const presetRow = document.createElement('div');
  presetRow.className = 'ct-row';
  Object.keys(PRESETS).forEach((name) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = name;
    b.addEventListener('click', () => { Object.assign(CONFIG, pick(defaults), PRESETS[name]); sync(); save(); });
    presetRow.appendChild(b);
  });
  body.appendChild(presetRow);

  GROUPS.forEach(([title, rows]) => {
    const h = document.createElement('div');
    h.className = 'ct-group';
    h.textContent = title;
    body.appendChild(h);
    rows.forEach(([key, label, min, max, step]) => {
      const row = document.createElement('label');
      const out = document.createElement('span');
      const input = document.createElement('input');
      Object.assign(input, { type: 'range', min, max, step });
      row.append(label, out, input);
      input.addEventListener('input', () => { CONFIG[key] = +input.value; out.textContent = fmt(+input.value, step); save(); });
      inputs[key] = { input, out, step };
      body.appendChild(row);
    });
  });

  const actions = document.createElement('div');
  actions.className = 'ct-row';
  actions.innerHTML = '<button type="button" data-act="copy">Copy settings</button><button type="button" data-act="reset">Reset</button>';
  body.appendChild(actions);
  const note = document.createElement('div');
  note.className = 'ct-note';
  body.appendChild(note);

  panel.addEventListener('click', (e) => {
    const act = e.target.dataset && e.target.dataset.act;
    if (act === 'min') {
      panel.classList.toggle('is-min');
      e.target.textContent = panel.classList.contains('is-min') ? 'Show' : 'Hide';
    } else if (act === 'reset') {
      Object.assign(CONFIG, pick(defaults)); sync(); save(); note.textContent = 'Back to the values in the file.';
    } else if (act === 'copy') {
      const text = JSON.stringify(changed(), null, 2);
      const fallback = () => {
        let ta = body.querySelector('textarea');
        if (!ta) { ta = document.createElement('textarea'); body.appendChild(ta); }
        ta.value = text; ta.select();
        note.textContent = 'Copy the settings below.';
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => { note.textContent = 'Copied. Paste them into the chat.'; }, fallback);
      else fallback();
    }
  });

  function pick(src) { const o = {}; KEYS.forEach((k) => { o[k] = src[k]; }); return o; }
  function fmt(v, step) { return step >= 1 ? String(Math.round(v)) : v.toFixed(2); }
  function sync() {
    KEYS.forEach((k) => { const r = inputs[k]; r.input.value = CONFIG[k]; r.out.textContent = fmt(CONFIG[k], r.step); });
  }
  sync();
  document.body.appendChild(panel);
})();

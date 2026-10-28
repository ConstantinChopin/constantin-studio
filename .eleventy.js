const fs = require("fs");

// The pixel size of a picture under src/, from the first bytes of its file. Null when
// the file is missing or its format isn't one of the three the site uses.
function shotSize(src) {
  let b;
  try { b = fs.readFileSync(`src${src}`); } catch { return null; }
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.length > 30 && b.toString("ascii", 0, 4) === "RIFF") {
    const t = b.toString("ascii", 12, 16);
    if (t === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
    if (t === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (t === "VP8L") { const v = b.readUInt32LE(21); return { w: (v & 0x3fff) + 1, h: ((v >>> 14) & 0x3fff) + 1 }; }
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i + 9 < b.length;) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { w: b.readUInt16BE(i + 7), h: b.readUInt16BE(i + 5) };
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}

module.exports = function (eleventyConfig) {
  // Static assets are copied verbatim — they need no templating.
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/cv.pdf");
  eleventyConfig.addPassthroughCopy("src/assets");

  // A studio drawing is set inline rather than as an <img>, so its labels can
  // use the site's web fonts. Takes a site path like /assets/work/x.svg.
  eleventyConfig.addFilter("inlineSvg", (src) => fs.readFileSync(`src${src}`, "utf8"));
  // Its key and its phone labels, written by scripts/enable-drawings.mjs. Read
  // here rather than as global data because a Nunjucks macro can't see that.
  eleventyConfig.addFilter("drawingMeta", (src) =>
    JSON.parse(fs.readFileSync("src/_data/drawings.json", "utf8"))[src]);
  eleventyConfig.addWatchTarget("src/assets/work/**/*.svg");
  // A film's width and height, read from its poster's header (PNG, JPEG or WebP), so
  // the film can float on the frame's light grey at its own shape.
  eleventyConfig.addFilter("shotSize", shotSize);
  // A picture leads what it belongs to. A story section with no hero of its own
  // is led by its first picture that comes before any step heading (`sub`); and
  // under each step heading, the step's first picture moves above the heading
  // (marked `leadsStep`). A run of journeys never moves: each journey's picture
  // already sits above its own title. Returns { lead, blocks }.
  // With `grouped` (a story's `textBlocks`), each run of text between pictures,
  // quotes and detail rows is gathered into one { group: [...] } block.
  eleventyConfig.addFilter("storyOrder", (blocks, hasHero, grouped) => {
    // a step heading whose text is all still to write (`todo`, never shown)
    // would stand alone on the page, so it waits with its text
    const all = [...(blocks || [])];
    const list = all.filter((b, i) => {
      if (!b.sub) return true;
      let j = i + 1;
      while (j < all.length && !all[j].sub && all[j].todo) j++;
      return j < all.length && !all[j].sub;
    });
    const isPicture = (b) => b && b.figure && !b.figure.journeys;
    let lead = null;
    const firstStep = list.findIndex((b) => b.sub);
    const head = firstStep === -1 ? list.length : firstStep;
    if (!hasHero) {
      const i = list.slice(0, head).findIndex(isPicture);
      if (i !== -1) lead = list.splice(i, 1)[0];
    }
    for (let i = 0; i < list.length; i++) {
      if (!list[i].sub) continue;
      let j = i + 1;
      while (j < list.length && !list[j].sub && !isPicture(list[j])) j++;
      if (j < list.length && isPicture(list[j])) {
        const [picture] = list.splice(j, 1);
        list.splice(i, 0, { ...picture, leadsStep: true });
        i++;
      }
    }
    if (!grouped) return { lead, blocks: list };
    const isText = (b) => b && (b.p || b.sub || b.answers || b.list || b.source);
    // a note still to write (only `todo`) is never shown, so it must not split a run
    const pureTodo = (b) => Object.keys(b).every((k) => k === "todo");
    // one title and one text per box (his rule, 13 Oct: "we can only have one title
    // and one subtitle per box"): a run of text starts a new box at every heading
    const runs = [];
    for (const b of list.filter((b) => !pureTodo(b))) {
      const cur = runs[runs.length - 1];
      if (isText(b) && !b.sub && cur && cur.group) cur.group.push(b);
      else runs.push(isText(b) ? { group: [b] } : b);
    }
    // every section opens on a text box with its title, then its picture (his rule,
    // 13 Oct: "each section should start with a text box as the title of the
    // section, then the image, then text, then image"), so the section's own
    // picture, or the one lifted to lead it, comes straight after the first box
    const detailsOf = (b) => b && !b.todo && ["context", "insight", "stats", "tiles", "results"].map((k) => b[k]).find(Array.isArray);
    // a section's statement and its "What we focused on, and why" always sit side by
    // side, as one row (his rule, 13 Oct: "by definition design approach box, and
    // what we focused on and why can sit side by side on all projects"); the
    // section's other boxes follow, after its picture
    const FOCUS = "What we focused on, and why";
    if (runs[0] && runs[0].milestone && detailsOf(runs[1])) {
      const items = detailsOf(runs[1]);
      const focus = items.find((d) => !d.todo && d.label === FOCUS);
      if (focus) {
        const key = Object.keys(runs[1]).find((k) => runs[1][k] === items);
        const rest = items.filter((d) => d !== focus);
        runs.splice(0, 2, { row: { milestone: runs[0], items: [focus] } }, ...(rest.some((d) => !d.todo) ? [{ [key]: rest }] : []));
      }
    }
    const opening = hasHero && typeof hasHero === "object" ? { figure: hasHero } : lead;
    if (opening) {
      const first = runs[0];
      runs.splice(first && (first.milestone || first.group || first.row) ? 1 : 0, 0, { figure: opening.figure });
      lead = null;
    }
    // a picture box and a text box alternate as far as the story allows (his rule,
    // 13 Oct: "alternate between image box, and text box as much as possible").
    // text with no heading of its own never stands in a box alone: it joins the
    // box before it, a statement's (`more`), a step's, or the last journey's
    // (`outro`). anything with its own heading (a step, a detail) keeps its box
    const hasPicture = (j) => j && (j.src || j.video || j.phones || j.boxes);
    const firstHasPicture = (f) => f && f.journeys && hasPicture(f.journeys[0]);
    const runs2 = [];
    for (const b of runs) {
      const prev = runs2[runs2.length - 1], untitled = b.group && !b.group.some((t) => t.sub);
      if (untitled && prev && prev.group) prev.group.push(...b.group);
      else if (untitled && prev && prev.milestone) runs2[runs2.length - 1] = { ...prev, more: [...(prev.more || []), ...b.group] };
      else if (untitled && prev && prev.figure && prev.figure.journeys) runs2[runs2.length - 1] = { ...prev, figure: { ...prev.figure, outro: [...(prev.figure.outro || []), ...b.group] } };
      else runs2.push(b.group ? { group: [...b.group] } : b);
    }
    // two pairings: a step's picture and the text box that explains it (`step`,
    // stacked), and a section's opening statement beside the boxes under it when
    // they come to an odd number (`row`), so no box is left alone in a row
    const paired = [];
    for (let i = 0; i < runs2.length; i++) {
      const b = runs2[i], next = runs2[i + 1], items = detailsOf(next);
      if (b.figure && b.leadsStep && next && next.group) { paired.push({ step: { figure: b.figure, group: next.group } }); i++; }
      else if (b.milestone && items && Math.min(4, items.filter((d) => !d.todo).length) % 2 === 1) { paired.push({ row: { milestone: b, items } }); i++; }
      else paired.push(b);
    }
    // the order inside each pair is chosen so that pictures and boxes alternate: a
    // pair opens on its picture, unless a picture has just been shown, in which
    // case its box comes first (`flip`); key journeys are paired the same way. a
    // box always keeps its title and its text together
    let last = "T";
    const ordered = paired.map((b) => {
      if (b.step) {
        const flip = last === "I";
        last = flip ? "I" : "T";
        return flip ? { step: { ...b.step, flip } } : b;
      }
      if (b.figure && b.figure.journeys) {
        const journeys = b.figure.journeys.map((j) => {
          if (!hasPicture(j)) { last = "T"; return j; }
          const flip = last === "I"; last = flip ? "I" : "T"; return { ...j, flip };
        });
        return { ...b, figure: { ...b.figure, journeys } };
      }
      if (b.figure) { last = "I"; return b; }
      last = "T";
      return b;
    });
    // never two text boxes one above the other (his rule, 13 Oct: "never two text
    // boxes on top of each other ... across all projects"). where no picture can
    // come between them, text boxes that would meet are set side by side in one
    // band of boxes, two to a row (`band`, its `cells` each one box)
    const isTextTile = (b) => b && (b.milestone || b.group || b.row || detailsOf(b));
    const shown = (items) => items.filter((d) => !d.todo).slice(0, 4).map((d) => ({ detail: d }));
    const cellsOf = (b) => b.row ? [{ milestone: b.row.milestone }, ...shown(b.row.items)]
      : b.milestone ? [{ milestone: b }] : b.group ? [{ group: b.group }] : shown(detailsOf(b));
    const banded = [];
    for (let i = 0; i < ordered.length; i++) {
      if (isTextTile(ordered[i]) && isTextTile(ordered[i + 1])) {
        const cells = [];
        while (i < ordered.length && isTextTile(ordered[i])) cells.push(...cellsOf(ordered[i++]));
        banded.push({ band: cells });
        i--;
      } else banded.push(ordered[i]);
    }
    return { lead, blocks: banded };
  });

  // Content pages are authored as plain HTML bodies. Disabling the HTML
  // template engine means their markup (inline scripts, `{` in JS, etc.) is
  // passed through untouched — only the .njk layout that wraps them runs
  // through Nunjucks. The home page (index.njk) opts back into templating.
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    htmlTemplateEngine: false,
    markdownTemplateEngine: false,
  };
};

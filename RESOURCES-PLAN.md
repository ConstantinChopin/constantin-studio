# Resources — moved

The resources strand (AI product interface primitives, the design system they imply, and
reference layouts) is **not built inside this site**. It is a standalone app:

- Source: `..\resources.constantin.studio`
- Plan and status: `..\resources.constantin.studio\PLAN.md`
- Deploys to: `resources.constantin.studio`

The earlier version of this file planned an in-site React island. That was dropped on
2026-08-04: it would have required disabling Tailwind's preflight, scoping every utility,
namespacing tokens around a live `--ink` / `--surface` collision, and lazily mounting a dozen
animated React trees behind the hash router — all of it risk to shipped work, none of it
visible to a reader.

## What this repo has to do

A resource is a `studio.json` entry with a `site` URL and no rail. The panel iframes it.
Iframing our own page into the detail pane is the house pattern, not a departure — see the
`.embedded` rules at `src/styles.css:1378` and their twins in constantin.world. What was
dropped for projects was iframing *external* product sites.

1. **One scroll context.** `.viewport` is glass over the pixelwave canvas and it scrolls. An
   iframe that also scrolls inside it is the failure mode. The iframe fills the panel and owns
   the scroll; `.viewport` goes `overflow: hidden` while a resource set is live.
2. **Reuse `.viewport-site`** (`src/index.njk:71`) as the "Open full" capsule — already built,
   already glass, already conditional on a `site` URL.
3. **A `Resources` shelf** in `src/_data/studio.json`, and a `kind` branch in the
   `.canvas-set` loop (`src/index.njk:75`) so a resource entry renders an iframe instead of
   the still rail. Viewport chrome, breadcrumb, pager, and hash routing are shared unchanged.
4. **One paragraph** in the left prose column after the "three crafts" block, woven-link
   voice, STE100 register, no em dashes in body prose.
5. **Mobile is undecided** — the panel becomes a full-page slide-in there. Deferred until the
   desktop version works.

Nothing else in this repo changes. No bundler, no framework, no new dependency.

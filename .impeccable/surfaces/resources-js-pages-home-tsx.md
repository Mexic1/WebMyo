---
version: 1
slug: "resources-js-pages-home-tsx"
primary_target: "resources/js/Pages/Home.tsx"
related_targets: []
---

# Homepage — myomobile.ro

## Scope and mode

The storefront homepage. Visitor mode: **Persuade**. First surface of a full platform rebuild; it establishes the visual world every later surface inherits.

## Audience and job

Primary: a cold Romanian buyer who has never heard of MYO, arriving from search or ads, deciding whether a refurbished flagship from an unfamiliar seller is safe to buy. Secondary: a Timiș local who knows the physical stores and is checking stock and price.

**Action:** enter the catalog at a specific grade or category, or reach a single featured device.

**Belief to earn:** premium devices, intelligently cheaper — proven by the technical confidence of the surface itself rather than asserted in copy.

**Proof available:** 446 real products with real imagery and pricing; condition grades; LeanPay and TBI Credit financing; 14-day return; stated 12-month warranty on refurbished units; physical stores in Timiș.

**Proof NOT available and not to be invented:** store addresses beyond Buziaș, opening hours, contact email, review counts and satisfaction percentages. The current site's "96%" claim is unsubstantiated and must not be carried over until the client substantiates it.

## Constraints

- Laravel + Inertia + React, Vite, TypeScript. Romanian and English.
- Logo unchanged; MYO colour tokens retained.
- Mobile commerce funnel: shader work is lazy-loaded below the fold with static fallbacks and `prefers-reduced-motion` honoured. The incumbent site ships 276 KB of HTML and 84 stylesheets; the rebuild must not trade conversion for spectacle.
- `liquid-glass-js` is dropped: blur, translucency and specular glass contradict this world's flat matte paper. `react-three-fiber` carries grid-snapped geometric motion; `liquid-logo` generates the animated mark once as a shipped asset. `shadergradient` is unlicensed and excluded.

## Memorable moment

**Grade as a module re-sort.** Choosing a condition grade re-lays the catalog on the module: bars and cells travel to new grid positions in grid-snapped steps, never crossfading. The grid is visibly the instrument doing the sorting.

## Unresolved

- Condition grade vocabulary (four observed values unconfirmed as the intended set).
- Whether Poppins is retained; this contract proposes replacing it with Archivo.
- Store list, hours, contact email — pending client.
- Dark variant: not canonical, decide after the light world ships.

## Direction contract

**THESIS:** MYO's catalog is one modular grid in which every unit is a graded record, and the grid itself is the proof of seriousness. It refuses the refurbished-marketplace arrangement this category always ships: rounded pastel cards, a badge cluster per product, a percentage-off hero and a trust-logo strip.

**OWN-WORLD:** Paper-white `#F5F5F5` ground, navy `#141E30` ink, violet `#9B5DE5` as the single signal owning whole modules rather than scattered accents; cyan `#00BBF9` reserved for the condition axis alone, amber `#F6BB06` for financing alone. Archivo grotesque, flush left ragged right, sizes stepped in grid units, hierarchy by scale contrast. Hairline navy rules build every boundary. Imagery is geometric bars, quarter-arcs and halftone screens only — no photography furniture, no soft gradient, no glass, no drop shadow, no rounded card.

**STORY:** The visitor understands within one viewport that this seller thinks in systems; believes the grade is a measured field rather than a marketing badge; and enters the catalog at a grade or reaches the featured device with price and instalment legible in a single pass.

**FIRST VIEWPORT:** Twelve-column module. Columns 1–3: a rule-bounded nav rail, MYO mark at top left at 116px, nav items flush left in caps at 11/16, active item carrying violet; beneath it a live catalog readout — total units, grades in stock — set as a bar chart of black rules. Columns 4–8: the headline at roughly 96/88, flush left, four lines, ragged right, the largest ink on the page; one 18/28 sub-line beneath it; then the primary action as a solid violet block with a white tick bar at its right edge, and a bordered secondary beside it. Columns 9–12: the featured device as a quarter-arc and bar composition in violet and navy with its grade, price and monthly instalment set achromatically beneath; below it an index of four upcoming units as dated rows with arrow affordances. A single full-width hairline closes the viewport.

**FORM:** Swiss International Style concert-poster wall, adopted as a competitive challenger over assigned grounded candidate 7 of 7 (thin-film interference under raking light). Seed key `a15be0a8`.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

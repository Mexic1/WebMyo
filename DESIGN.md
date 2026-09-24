---
name: MYO
description: A Swiss concert-poster wall for graded refurbished hardware — paper, ink, hairlines, offset screens and one violet signal.
colors:
  paper: "#F5F5F5"
  paper-deep: "#E9E9E7"
  ink: "#141E30"
  ink-soft: "#1B263B"
  ink-muted: "#5B6577"
  signal: "#9B5DE5"
  signal-deep: "#6D28D9"
  axis: "#00BBF9"
  finance: "#F6BB06"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.05em"
  count:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 800
    lineHeight: 1.0
    letterSpacing: "-0.04em"
    fontFeature: "tabular-nums"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  measurement:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
  measurement-compact:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
  subhead:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  note:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "2.5rem"
  gutter: "clamp(1rem, 2.5vw, 2.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-deep}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1rem 0.9rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1rem 0.9rem 1.25rem"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-disabled:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "0.4rem 0"
  nav-link-active:
    textColor: "{colors.signal-deep}"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.1rem"
  filter-hover:
    backgroundColor: "{colors.paper-deep}"
  filter-selected:
    backgroundColor: "{colors.signal-deep}"
    textColor: "{colors.paper}"
  axis-field:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "1rem {spacing.gutter} 1.25rem"
  grade-row:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    padding: "0.55rem 0"
  grade-row-selected:
    textColor: "{colors.axis}"
  grade-plate:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "4.5rem"
  index-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0"
  index-row-hover:
    backgroundColor: "{colors.paper-deep}"
  unit-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.gutter}"
  unit-cell-hover:
    backgroundColor: "{colors.paper-deep}"
  unit-grade:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.axis}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.2rem 0.45rem"
  category-cell:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.gutter}"
    height: "11rem"
  category-cell-hover:
    backgroundColor: "{colors.paper-deep}"
  finance-tag:
    backgroundColor: "{colors.finance}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.6rem"
  finance-block:
    backgroundColor: "{colors.finance}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.gutter}"
  trust-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0.7rem 0"
  mark-field:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.25rem {spacing.gutter}"
    width: "116px"
    height: "40px"
  cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.gutter}"
---

# Design System: MYO

## Overview

**Creative North Star: "The Concert-Poster Wall"**

MYO is built as a Swiss International Style poster pasted flat on paper. One twelve-column module disciplines every surface; hairline navy rules, not boxes or shadows, build every boundary. Hierarchy comes from scale contrast and from where a thing sits on the grid, never from decoration. The surface is meant to read as an instrument: a seller who thinks in systems, grading hardware as measured records rather than selling it with badges.

The palette is a paper ground with navy ink and one violet signal that owns whole modules instead of scattering as accents. Two colours are held under strict conditions: cyan belongs only inside an inverted ink field and only to express condition; amber belongs only to financing, and only as a fill. Imagery is authored geometry — a quarter-arc, a bar ladder and dot screens drawn in brand colour — because the world is flat matte paper. Confirmed rejections, made when `liquid-glass-js` was dropped from the stack: no blur, no translucency, no specular glass, no soft gradient wash, no drop shadow, no rounded card.

Density is high and deliberately unpadded: cells are separated by rules rather than by whitespace, and type sizes are few and far apart. The system moves in one way only — the grid re-sorts and its cells travel to their new positions. Nothing crossfades, nothing lifts. Romanian is the primary market, so diacritics are a typographic constraint of the system, not a localisation afterthought.

**Key Characteristics:**
- One twelve-column module, reused on every page including the 404
- Hairline rules as the only boundary device; zero shadows, zero radii
- Paper-white ground, navy ink, a single violet signal
- Three materials only: paper, inverted ink field, offset dot screen
- Two conditional colours (cyan for condition, amber for financing) under hard placement rules
- Authored geometry as the only imagery; the geometry derives its length from the data
- Motion is travel on the grid, never a fade
- Browser chrome themed: selection, caret, scrollbar, focus ring, underline offset

## Colors

A cool paper-and-ink ground carrying one saturated signal and two single-purpose brand colours.

### Primary
- **Signal Violet** (`{colors.signal}`): the brand violet, carried over unchanged from the incumbent MYO token set. It measures 3.78:1 on paper, so it is used at display scale, as a fill, or as a rule — the quarter-arc in the geometric mark is its canonical home. Never body text.
- **Signal Deep** (`{colors.signal-deep}`): the same hue taken deep enough to carry text at 6.5:1 on paper. Every text-bearing violet — the primary button fill, the selected catalog filter, the active nav item, link carets, row arrows, the focus ring and the selection highlight — uses this step.

### Secondary
- **Axis Cyan** (`{colors.axis}`): the MYO wordmark colour and the colour of condition. At 2:1 on paper it can never be placed on paper. It has exactly three sanctioned homes, all of them ink fields: the wordmark inside the mark field, the fill and selected name inside the condition ladder, and the grade chip on a catalog unit (ink block, cyan caps). Inside ink it reads about 7.5:1.
- **Financing Amber** (`{colors.finance}`): instalment financing only. It always appears as a fill with ink on top of it, never as ink itself — as the inline financing tag beside a price, and as the full-cell financing block that opens the instalment band.

### Neutral
- **Paper** (`{colors.paper}`): the ground of every surface, and the browser `theme-color`.
- **Paper Deep** (`{colors.paper-deep}`): the only tonal step on paper — the hover fill on every interactive cell (index row, catalog unit, category cell, unfilled filter), unfilled bars in the geometric mark, the scrollbar track.
- **Ink** (`{colors.ink}`): all primary text, strong rules, the inverted fields (mark field, condition axis, grade chip) and the dots of the offset screens.
- **Ink Soft** (`{colors.ink-soft}`): subhead prose, and the accent rect inside the logo.
- **Ink Muted** (`{colors.ink-muted}`): field labels, secondary prose (`note`), empty states and disabled controls.

### Named Rules
**The Contrast-Step Rule.** Violet has two steps and they are not interchangeable. `{colors.signal}` may be display type, a fill or a rule; the moment violet carries reading text, a link or an icon, it becomes `{colors.signal-deep}`. Audit test: no text under 2.25rem is ever `{colors.signal}`.

**The Cyan-Never-On-Paper Rule.** Cyan appears only inside an ink field, and only to express condition or the wordmark. Three placements are sanctioned: mark field, condition ladder, unit grade chip. A fourth is added only by adding a fourth ink field — cyan on paper is a contrast failure (2:1), not a style choice.

**The Amber-Is-Fill-Only Rule.** Amber means financing and nothing else, and it is always a background with ink on top. Amber text does not exist in this system.

**The Screen-Density Rule.** The offset dot screen carries information, not texture. Three densities exist — 5px, 9px and 16px pitch (`.screen-50`, `.screen-20`, `.screen-05`) — and the density is semantic: the heavier the screen, the more visible the wear it describes. A screen is never applied to make an empty area look designed, and no fourth density is invented without a fourth thing to mean.

## Typography

**Display Font:** Archivo (with `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Archivo — one grotesque carries the whole system
**Label Font:** Archivo at 0.75rem, 600 weight, 0.08em tracking, uppercase

**Character:** A single neutral grotesque, set flush left and ragged right, with hierarchy built from scale distance alone: 0.75rem labels against a display that reaches 5rem. Weight swings hard (400 body, 800 display) so the page reads at a glance from across a room, poster-fashion. Font synthesis is disabled (`font-synthesis-weight: none`) so a missing weight fails visibly rather than being faked.

### Hierarchy
- **Display** (800, `clamp(2.25rem, 5.6vw, 5rem)`, line-height 1.0, -0.05em): the single largest ink on a page. One per surface, flush left, broken to hand-set lines.
- **Count** (800, 2.75rem, line-height 1.0, -0.04em, tabular): the category figure. The number is the content of a category cell; the name sits beneath it in label type.
- **Headline** (700, 2.25rem, 1.1, -0.02em): section titles and the featured unit's name.
- **Measurement** (700, 2.25rem, tabular figures): headline prices and the catalog readout — the same size as headline, distinguished by locked figures.
- **Measurement Compact** (700, 1.375rem, tabular): the price inside a catalog unit cell, where four cells share a row.
- **Subhead** (400, 1.125rem, 1.55, max-width 68ch, ink-soft): the line under the display headline and the explanatory line in a band.
- **Title** (600, 1.0625rem, 1.3, -0.01em): the unit name inside a catalog cell.
- **Body** (400, 1rem, 1.6): running text in cells and the footer.
- **Note** (400, 0.875rem, 1.55, ink-muted): secondary running prose — a qualifier, a step reference, a lending disclaimer. Sentence case, never tracked, never uppercase.
- **Label** (600, 0.75rem, 0.08em, uppercase, ink-muted): field names, nav items, grade names, the financing tag. Labels name a field; they are never a sentence and never a kicker.

### Named Rules
**The Twelve-Px Floor Rule.** No text in this system is set below `0.75rem` (12px). That is the floor for label type and it is a floor, not a target — it was raised from 0.6875rem after a legibility finding and must not be walked back for density.

**The Label-Is-Not-Prose Rule.** Tracked uppercase label type names a field in one or two words. Running prose never uses it. When prose must recede, it uses **Note** (0.875rem, sentence case, ink-muted). Audit test: no `.label` in the build contains a full sentence.

**The No-Kicker Rule.** No tracked uppercase label may sit as its own block directly above a heading. A kicker was shipped and removed; the replacement is not a smaller kicker. Sequence, category and context belong in running text, in the heading itself, or in a field/value pair where the value follows the label.

**The Latin-Ext Rule.** Archivo is self-hosted through the Bunny provider with subsets `latin` **and** `latin-ext`. This is a hard requirement, not an optimisation: without latin-ext, Romanian ă/ș/ț fall back to a system face mid-word and the word breaks. Any font added to this project ships both subsets or is not added.

**The Longest-Line Rule.** The display ceiling is set by the longest word measured against its five-column column, not by taste. The current 5rem cap is what "INTELIGENT." (11 caps) allows; change the copy and the cap is re-derived, not guessed.

**The Comma-Below Rule.** Display leading is exactly 1.0 and must clear the descending comma on Ț and Ș against the next cap line. Any tighter leading collides with Romanian diacritics.

**The Measurement Rule.** Every price, capacity and count carries `font-variant-numeric: tabular-nums` with tracking zeroed. Figures are measurements and must not shimmer between rows.

## Layout

Everything sits on one twelve-column module (`display: grid; grid-template-columns: repeat(12, minmax(0, 1fr))`), full-bleed to the viewport edges — there is no centred max-width container. Cells carry a fluid gutter of `clamp(1rem, 2.5vw, 2.5rem)` as padding and are separated by a hairline right rule, with the last cell in a row losing its rule. Horizontal bands are closed by `rule-bottom` (hairline) or `rule-strong-bottom` (solid ink) for the end of a major region. Every band on the homepage is closed by a strong rule; the footer is the only module that closes with nothing.

Placement is by span utilities on the shared module — `span-2`, `span-3`, `span-4`, `span-6`, `span-8`, `span-12` — plus four named placements on the hero: masthead columns 1–3 row 1, rail columns 1–3 row 2, statement columns 4–8 spanning both rows, feature columns 9–12 spanning both rows. Six category cells are `span-2`; the grading band is three `span-4`; the financing band is `span-4` + `span-8`; the footer is four `span-3`. Source order puts the statement before the rail so a phone meets the offer before the category list.

The catalog grid is the one nested grid: a four-column `units` grid inside a `span-12` cell, with its own step-downs to two columns at 1100px and one at 560px. It is a sub-division of the module, not a second grid system — its columns divide the twelve evenly.

There is a primary breakpoint at **1100px**. Below it, every named placement and every span utility collapses to the full twelve columns, vertical rules drop and horizontal hairlines take over as the separators. The only other breakpoint is **560px**, and it exists solely to take the catalog grid from two columns to one. No other breakpoint exists — the type scale and gutter are fluid instead.

Inverted fields (the ink mark field, the ink condition axis) bleed to the cell edges by negative gutter margins, so an ink block always meets the hairline rather than floating inside padding.

### Named Rules
**The One Module Rule.** Every surface — homepage, placeholder pages, the 404 — is laid on the same twelve-column module. A new region picks a span utility; it does not invent a layout. A nested grid is allowed only when its columns divide the parent span evenly.

**The Hairline Rule.** Boundaries are rules (`1px` ink at 22% for hairlines, solid ink for terminal edges), never borders used as decoration and never a box drawn around content for emphasis.

**The Travel-Not-Fade Rule.** When a control re-lays a grid, the surviving cells **travel** to their new positions — FLIP against a geometry snapshot, 420ms on `cubic-bezier(0.16, 1, 0.3, 1)` — so the module is visibly the instrument doing the sorting. Cells do not crossfade, do not stagger in, and are not remounted. Under `prefers-reduced-motion: reduce` the travel is skipped entirely and the new layout is simply there.

## Elevation & Depth

This system has **no shadows at all** and no elevation model. Nothing floats, nothing lifts on hover, nothing is blurred behind anything. The world is flat matte paper and flatness is the material, not an omission.

There are exactly three materials, all of them in the plane of the paper: **paper**, the **inverted ink field**, and the **offset dot screen**. Field inversion is the only figure/ground shift in the system — a block of ink is laid into the paper and its contents flip to paper-white — and it is the mechanism that makes cyan legible, which is why the mark field, the condition axis and the unit grade chip all exist as ink blocks. The offset screen is a printed material, not a depth cue: a radial-gradient dot grid of ink on paper at three fixed pitches, used to describe wear on the grade plates. The hairline rule remains the fourth device, separating without implying a plane.

### Named Rules
**The Zero-Shadow Rule.** `box-shadow` does not appear in this system. Not ambient, not on hover, not on focus, not as a hairline substitute. State is expressed by colour inversion, background fill and a 0.25rem translate, never by lift.

**The Inverted-Field Rule.** When a component needs to stand apart from the paper, it becomes an ink field bleeding to its cell edges — not a card, not a tint, not a shadow.

**The Three-Materials Rule.** Paper, ink field, offset screen. A new surface treatment is one of those three or it does not ship. There is no tint layer, no scrim, no frosted panel.

## Shapes

Every corner is square. `border-radius` is `0` throughout the shipped build; the incumbent MYO radius scale (5/10/20/50px) was not carried into this world and no rounded surface exists. Form language is rectangular fields, hairline rules and full-height bars.

The recurring geometry is a small authored vocabulary, drawn as inline SVG or CSS and coloured with the same tokens as the rest of the page:
- **The quarter-arc** — a violet square with one corner turned, the featured unit's mark.
- **The bar ladder** — one full-height bar per step in the condition vocabulary, filled in ink up to the unit's grade and paper-deep beyond it. The ladder's length is derived from the vocabulary, and the SVG viewBox is derived from the ladder — nothing is hardcoded to a count.
- **The dot screen** — a radial-gradient grid of ink dots at 5px, 9px or 16px pitch, filling a plate to describe wear.
- **The grade plate** — a 4.5rem hairline-bordered rectangle carrying a dot screen; the illustration for a grade.
- **The tick bar** — a 0.5rem × 1.1rem solid block of `currentColor` at the right edge of the primary button; the poster's action marker.
- **The arrow** — an 18×10 stroked line with a chevron, 1.5px, `currentColor`, used as a directional affordance on rows, cells and secondary buttons.

Icons are drawn geometry in inline SVG. There is no icon font and no glyph icon set in this system.

### Named Rules
**The Square-Corner Rule.** Radius is zero everywhere. A rounded card in this world reads as a foreign component, not a variant.

**The Authored-Geometry Rule.** Imagery is geometry this project draws: arcs, bars, rules, ladders, screens. No stock photography furniture, no gradient mesh, no glass. Product photography, when the catalog needs it, enters as a squared, full-bleed plate inside a cell — never as a floating rounded thumbnail.

**The Vocabulary-Length Rule.** Geometry that counts something takes the count as a parameter. The condition vocabulary is three steps — Bun, Excelent, Ca nou — and the mark, the ladder fill fractions and the axis note all derive from that length. Add or remove a grade and the drawing follows; no component carries a literal step count.

## Components

### Buttons
- **Shape:** square (`0` radius), inline-flex with content pushed apart (`justify-content: space-between`, 2.5rem minimum gap) so the marker sits at the far right edge.
- **Primary:** solid Signal Deep with paper text and a paper tick bar, label typography, asymmetric padding (`0.9rem 1rem 0.9rem 1.25rem`) that compensates for the tracking.
- **Secondary:** transparent with a solid ink 1px border, ink text, and an arrow instead of a tick bar.
- **Hover:** both variants invert to a solid ink field with paper text, 180ms on `--ease-out-expo` (`cubic-bezier(0.16, 1, 0.3, 1)`). No translate, no shadow.
- **Focus:** the global 2px Signal Deep outline at 2px offset. Controls never suppress it.
- **Disabled:** ink-muted border and text on transparent, `not-allowed` cursor.

### Filter Bar
A single hairline-strong rectangle divided by strong internal rules into one button per option, sized to its content (`width: fit-content`) rather than stretched. Label typography, `0.7rem 1.1rem` padding. Unselected hovers to Paper Deep; selected (`aria-pressed="true"`) fills Signal Deep with paper text, 160ms. The first option is always the unfiltered "all" state, and re-pressing the selected option clears the filter. No dropdown, no chip row, no pill.

### Condition Axis (signature material)
An ink field, bled to its cell edges, containing one row per grade. Each row is a button: a 0.5rem track of paper-at-16% with a cyan fill scaled by `transform: scaleX(step / steps)` from the left edge, and the grade name in label type at the right. Selected turns the name cyan and the fill fully opaque; hover and focus raise opacity only. Rows are separated by paper-at-18% hairlines. Focus ring inside the field switches to cyan, since Signal Deep would sink into the ink. A closing note in `axis-note` type states what the ladder measures.

The fill scale is a static property of each row — it describes that grade's position, and it does not animate. The axis's job is to state the scale and to select on it; the motion belongs to the grid it drives.

### Catalog Grid (signature component)
The system's memorable moment, and the only animated thing in it. A four-column grid of unit cells inside a `span-12` cell, each cell a hairline-ruled square carrying, in order: the cyan-on-ink grade chip, the unit name in title type, the storage in label type, the price in compact tabular measurement, and a label-type "see unit" line with an arrow.

Selecting a grade — from either control — filters the set and **re-lays the grid**. The surviving cells travel from their old positions to their new ones via FLIP: geometry is snapshotted at the end of every layout effect, and on the next change each cell is animated from its old offset to zero over 420ms on `cubic-bezier(0.16, 1, 0.3, 1)` via the Web Animations API. Because the snapshot is taken at the end of the effect rather than the beginning, the travel works no matter which control triggered it. Cells that move less than 1px are left alone. `prefers-reduced-motion: reduce` skips the travel entirely. There is no crossfade, no opacity transition, no stagger, and no skeleton.

Grade selection is a single piece of state held by the page and passed to both the rail's condition ladder and the grid's filter bar, so pressing either moves both, and the rail's index, the feature label and the catalog all answer to one selection.

### Category Cell
A `span-2` cell at least 11rem tall with the figure pushed to the top and the name to the bottom: the count in 2.75rem tabular count type, the name in label type with an arrow at the far right. Hovers to Paper Deep and translates the arrow 0.25rem. The number is the content; the name is its caption.

### Index Rows
Three-column grid (name / price / arrow) on a baseline, separated by hairlines, `0.85rem` vertical padding. Hover fills the row with Paper Deep and translates the Signal Deep arrow 0.25rem right (260ms). The grade sits under the unit name as a label. Empty state is a plain ink-muted line inside the same hairline rhythm.

### Trust Field
A label/value ledger opened by a strong rule: each line is a baseline-aligned pair separated by a hairline, `0.7rem` vertical padding, the value in 700 weight and tabular figures where it is a figure. It states terms as rows of a table, not as badges or icons.

### Financing Surfaces
Two, and only two. The **financing tag** is an inline amber block with ink label type and `0.35rem 0.6rem` padding, placed beside a price. The **financing block** is a whole amber cell whose label drops to ink-at-70% and whose title stays full ink — the opening cell of the instalment band. Both are square, borderless and iconless. No other amber exists.

### Grade Plate
A 4.5rem hairline-bordered rectangle carrying one of the three dot screens, standing above the grade name and its description in the grading band. The plate is the illustration; the screen's density is its content.

### Navigation
- Flush-left stacked list, label typography, no bullets, `0.4rem` vertical padding per item, no underline at rest.
- Hover and `aria-current="page"` both resolve to Signal Deep. There is no other active treatment — no underline bar, no background.
- Mobile: the rail becomes a full-width band under the statement; the list does not become a drawer.

### Mark Field
The logo sits in its own ink block (`1.25rem` gutter padding), fixed at its native 116×40 and never recoloured, rescaled disproportionately or re-drawn. The block exists so the cyan wordmark reads at ~7.5:1.

### Browser Surfaces
Treated as part of the design, not left default: selection is paper on Signal Deep, caret is Signal Deep on every field, the scrollbar is ink thumb on Paper Deep, `theme-color` is paper, focus is a 2px Signal Deep ring at 2px offset, links carry `0.18em` underline offset at 1px thickness. Reduced motion is honoured globally by collapsing all CSS transitions and animations to 0.01ms, and the grid's scripted travel checks the same query before it runs.

## Do's and Don'ts

### Do:
- **Do** lay every new surface on the twelve-column module with hairline-ruled cells, a span utility and the fluid `clamp(1rem, 2.5vw, 2.5rem)` gutter.
- **Do** step violet down to `{colors.signal-deep}` the moment it carries text, a link or an icon.
- **Do** put cyan inside an ink field and nowhere else, and reserve it for condition and the wordmark.
- **Do** keep label type at or above `0.75rem`, in one or two words, naming a field.
- **Do** use `note` (0.875rem, sentence case, ink-muted) whenever prose must recede.
- **Do** ship every typeface with the `latin-ext` subset so Romanian diacritics render in the intended face.
- **Do** set every price, capacity and count in tabular figures.
- **Do** make a filtered grid travel: FLIP its surviving cells 420ms on `cubic-bezier(0.16, 1, 0.3, 1)`, and skip the travel under `prefers-reduced-motion`.
- **Do** hold one piece of selection state per concept and pass it to every control that expresses it, so two surfaces can never disagree.
- **Do** derive counted geometry from the data — the condition vocabulary is three steps and the drawing follows it.
- **Do** let dot-screen density mean something: heavier screen, more visible wear.
- **Do** express state by inversion, fill and small translate: 160–420ms on `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Do** keep the 1100px collapse to full-width bands, and add a narrower breakpoint only to step down a nested grid's column count.

### Don't:
- **Don't** add a `box-shadow` anywhere, in any state, including as a fake hairline.
- **Don't** round a corner; radius is `0` across the system.
- **Don't** set body text, links or icons in `{colors.signal}`, and never place cyan on paper.
- **Don't** use amber as ink; it is a fill with ink on top or it is absent.
- **Don't** introduce blur, translucency, specular glass or a soft gradient wash — they were rejected with the glass library when this world was chosen. The offset screen's `radial-gradient` is a hard-stopped dot grid, not a ramp, and is the only gradient function in the system.
- **Don't** use a glyph icon font or an icon package; icons are inline SVG drawn in this vocabulary.
- **Don't** set an uppercase label above a headline as a kicker or eyebrow. Labels name a field beside or beneath content, or pair with a value that follows them.
- **Don't** set text below `0.75rem`, and don't set a sentence in tracked uppercase.
- **Don't** crossfade, stagger or remount a filtered list; the cells travel or nothing moves.
- **Don't** let two controls for the same concept own separate state.
- **Don't** apply a dot screen as decorative texture on an area that means nothing.
- **Don't** wrap content in a card to group it; group it with a rule or an inverted field.
- **Don't** centre a container or introduce a second grid; the module is full-bleed and singular.

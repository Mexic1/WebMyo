# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Laravel (PHP) full-stack, confirmed by the user. View layer is **Inertia.js + React** with Vite and TypeScript: Laravel owns routing, auth, the commerce domain and the admin; React renders pages through Inertia. This was chosen specifically so `react-three-fiber` and hand-written GLSL can be used natively — see Brand Commitments.

Admin is **Filament**, confirmed as the default when the backend scope was agreed.

Full rebuild from the ground up. The existing WordPress 7.1.2 / WooCommerce 10.4.4 / Woodmart 8.3.3 stack is replaced entirely, not migrated onto. Only the logo and the brand colour tokens carry over.

## Users

Two confirmed audiences, **cold online buyers leading**:

1. **Primary — cold online buyers.** People who have not heard of MYO, arriving from search or paid traffic, deciding whether a refurbished phone from an unfamiliar Romanian seller is safe to buy. Their job is to establish that the device, the grading and the seller are trustworthy before parting with money.
2. **Secondary — local customers in Timiș** who already know the physical stores and buy online for convenience. Their job is checking stock, price and whether they can collect in person.

Store locations and physical presence are treated as a first-class trust signal serving audience 1, not only as convenience for audience 2.

An internal audience (staff operating catalog, stock and orders) exists because the admin is in scope, but no interview has been conducted with them; their workflows are an open question.

## Product Purpose

Sell refurbished and new phones, tablets, laptops, wearables and accessories online in Romania, and make the condition and provenance of a used device legible enough that a stranger will buy one unseen.

Success is a completed online order from someone with no prior relationship to the business.

## Positioning

MYO sells graded second-hand devices alongside new stock, backed by physical stores in Timiș county, installment financing, and a stated testing process. The defensible position is **verifiable condition** — a specific, consistent grade attached to a specific unit — rather than price alone.

This position is currently asserted but not delivered: condition exists only as a suffix inside some product titles (see Capabilities and Constraints).

## Operating Context

- Company: MYOMOBILE TRADING SRL, CUI 46108435, registered Str. Mărășești 11C, Buziaș, Timiș county.
- Romanian market, Romanian consumer law. Site must carry ANPC / SAL links, GDPR compliance, and the legally required warranty terms.
- Languages: **Romanian and English**, confirmed. Romanian is the primary market; the current site is `ro_RO` only.
- Current catalog size: **446 products** in the live product sitemap (measured 2026-09-24).
- Current storefront categories: `telefoane`, `laptopuri`, `tablete`, `ceasuri`, `smeg`, `accesorii`. Note `ceasuri` (watches) rather than `wearables`, and that SMEG kitchen appliances are genuinely part of the catalog.
- Offers currently advertised: free shipping over a threshold, installments via LeanPay and TBI Credit, trade-in, 14-day return, stated 12-month warranty on refurbished units.
- A separate B2B property exists at `licitatii.myomobile.ro` (live). **Out of scope** for this rebuild.

### Migration source is compromised

The existing WordPress install is actively compromised with SEO spam injection, verified 2026-09-24:

- The post sitemap lists 248 posts, of which roughly 190 are injected spam (casino/betting content in DE/ES/NL/PL/FI/HU/PT/IT/RU/UK/VI, French adult-content posts, English "moving company" spam). Only ~18 posts are genuine MYO content.
- The page sitemap contains 6 further spam entries alongside legitimate pages.
- Two cloaked off-screen links are present in the live homepage markup (`casinotest2.com`, `argentobitfundix-ar.com`), the second spliced inside a genuine product paragraph.
- Most recent spam post is dated 2026-09-23 — the injection is ongoing, not historical.

Any data migration must therefore be treated as importing from an untrusted source: sanitised, allowlisted, and manually reviewed. Nothing is mirrored wholesale. This is a distinct workstream, not a step inside the build.

## Capabilities and Constraints

**In scope, confirmed:**

- Storefront: catalog, product detail, cart, checkout.
- Custom admin (Filament) for products, variants, condition grades, stock, pricing and order management — replacing wp-admin.
- Checkout with card payments plus **LeanPay** and **TBI Credit** installment integrations. These are the two hardest third-party integrations in the project and carry the most delivery risk.
- Romanian + English throughout.

**Explicitly out of scope, confirmed:**

- Trade-in and service/RMA workflows as tracked processes. (The current site's `trimite-un-produs-in-service` and `returneaza-un-produs` pages exist; whether they are reproduced as static content is an open question.)
- The B2B auctions property at `licitatii.myomobile.ro`.

**Condition grading is the central data problem.** On the live site, condition is not a product attribute. Of 446 products only **19** carry a condition grade, all of them iPhones: `-bun` ×6, `-excelent` ×7, `-ca-nou` ×6. The remaining 427 carry none. WooCommerce variations are `pa_culoare` (colour) and `pa_memoria-interna` (storage) only. Condition lives inside the product title string, punctuation errors included (`"Apple iPhone 16 Pro Max , Excelent"`). The rebuild must model condition as a real field with a defined, closed grade vocabulary.

**The vocabulary is three steps: Bun → Excelent → Ca nou.** Corrected 2026-09-24. An earlier count in this file claimed four grades including "Nou"; that was wrong — `-nou` only matched as a substring of `-ca-nou`. No "Nou" or "Sigilat" grade exists in the catalog. Three steps is confirmed by slug and by each product's own variation data, but whether three is the vocabulary the client *intends* is still unconfirmed.

**The grading and pricing disagree with each other in places**, which the client should resolve: iPhone 12 is priced identically at Bun and Excelent (999 lei both), and iPhone SE prices Excelent (800) above Ca nou (700), inverting the ladder that iPhone 14 follows correctly.

**The current site has no contact page.** Verified: `/contact/`, `/contacte/`, `/despre-noi/`, `/magazine/`, `/locatii/`, `/help/contact/` and `/pagina-contact/` all return 404. The footer carries no address, no email and no opening hours. This is the single largest content gap and makes `LocalBusiness` structured data impossible today.

**Performance is a product constraint, not a preference.** The current homepage ships 276 KB of HTML, 98 script tags (91 external), 84 stylesheets and references 172 unique images (a 40-image sample measured 587 KB, extrapolating to roughly 2.5 MB). The rebuild targets a mobile commerce funnel, so the pinned WebGL direction must be budgeted rather than assumed free.

## Brand Commitments

Recorded as given by the user; not expanded here.

- **Logo is unchanged.** `MYO-LOGO.svg`, 116×40, wordmark in `#00BBF9` with a rect accent in `#1B263B`.
- **Theme colours stay mainly the same.** The live child theme declares a real token set:
  `--myo-primary-color: #9B5DE5` (violet), `--myo-secondary-color: #00BBF9` (cyan), `--myo-accent-color-2: #F6BB06` (amber), `--myo-text-color: #1B263B` (navy), `--myo-dark-color-800: #141E30`, `--myo-bg-color: #F5F5F5`.
  Radii: `--myo-radius-xs/sm/md/lg` = 5 / 10 / 20 / 50 px.
- Current typeface is **Poppins** 400/500/600. Recorded as incumbent fact; not confirmed as binding.
- **Stated direction: modern, slick, easy on the eyes.**
- **Pinned technical references**, supplied by the user as aids for the new site:
  - `pmndrs/react-three-fiber` — MIT, actively maintained.
  - `dashersw/liquid-glass-js` — MIT, last released 2025-06.
  - `collidingScopes/liquid-logo` — MIT, last released 2025-03.
  - `ruucm/shadergradient` — **no license file; all rights reserved.** Not shippable in a commercial build as-is. Either replaced with an equivalent we write, or used only with written permission from the author. Flagged to the user 2026-09-24.
- Company name in footer: "Myo Mobile". Trading name on site: "MYO".

## Evidence on Hand

Real and verified (measured from the live site, 2026-09-24):

- Brand token set and logo — extracted from `woodmart-child/style.css` and available.
- 446 live products with real imagery, titles, categories and pricing.
- ~18 genuine Romanian blog posts on phones, laptops, open-box goods and buying guides.
- Company registration data (CUI 46108435).
- Phone `0720 512 157` on site; a Buziaș store listing shows a different number, `0787 333 144`.
- Social presence: Facebook, Instagram and TikTok, all `@myomobile.ro`.

Absent or unverified — **must not be fabricated**:

- **Store addresses and count are unconfirmed.** Only Buziaș (Str. Principală 31) is corroborated by an external directory. Facebook pages indicate Moșnița Nouă and Timișoara. A fourth location in Arad was claimed in an earlier research pass but could not be verified. The real list must come from the client.
- **No opening hours anywhere**, for any location.
- **No contact email** published anywhere on the site.
- Trust claims on the current homepage — "96% din clienții noștri sunt mulțumiți" (verified present in markup) and a Trustindex review rating (claimed in earlier research, not verified by me) — are unsubstantiated from outside. Their provenance must be confirmed before reuse, since the primary audience is cold buyers and a false proof claim is worse than none.
- No staff photos, store photos, or testimonials with attribution.

## Product Principles

1. **Condition is a fact about a unit, not a word in a title.** Grade is modelled, queryable, filterable and explained. This is the positioning; everything else is decoration on top of it.
2. **A cold buyer must be able to verify the seller without leaving the site.** Addresses, hours, real humans, and a published testing process. The current site's total absence of contact information is the defect that most directly costs revenue.
3. **Nothing migrates unverified.** The source install is compromised. Every imported record is allowlisted and reviewed; spam content and the injected link payload never reach the new platform.
4. **Spectacle is budgeted.** The pinned WebGL direction is honoured, and it is scoped to hero moments, lazy-loaded, with static poster fallbacks. A slow product grid is a lost sale regardless of how good the hero looks.
5. **Both languages are first-class.** Romanian leads the market, but EN is not a machine-translated afterthought bolted on at the end — routing, content model and admin assume two locales from the first migration.

## Accessibility & Inclusion

No formal standard was specified by the client. Two product-specific requirements follow from confirmed decisions:

- The pinned shader/WebGL direction requires `prefers-reduced-motion` support and non-animated fallbacks as a build requirement, not a polish item.
- Romanian diacritics (ă, â, î, ș, ț) must render correctly in every typeface chosen, including in the admin. The current site already shows mojibake and stray punctuation in product titles.

## Open Decisions

Recorded rather than invented:

- The condition grade vocabulary (the four observed values are not confirmed as the intended set).
- Whether Poppins is retained.
- Whether the service/RMA and returns pages are reproduced as static content.
- Store list, addresses, opening hours and contact email — pending client.
- Whether existing trust claims can be substantiated.
- Internal staff workflows for the admin.
- **The graded/ungraded catalog gap.** Only 19 of 446 products carry a condition grade (all iPhones), while the Telefoane category alone holds 145. The homepage currently shows a 145-product category tile above a 19-unit graded grid, which reads as truncated. Deferred deliberately (2026-09-24): the fix is grading the rest of the catalog during the WordPress migration, not a label on the homepage. Revisit when real grading data exists.

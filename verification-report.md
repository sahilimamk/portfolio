# Verification report — Portfolio Phase 1 (Sahil Khan)

Measured 13 Nov 2026 (IST). Nothing in this file is claimed without a
measurement behind it.

## Method

- **Browser:** Playwright (playwright-core 1.65.0) driving Chromium
  158.0.8127.18 (the Playwright-bundled build), plus a manual Chrome
  headless check for Lighthouse.
- **Server:** `python3 -m http.server 8127 --bind 127.0.0.1` from the site
  root — a local static server, as required. No hosted deployment was used.
- **Lighthouse:** 13.6.0 (npx), Chrome 158.0.8127.18, default mobile
  emulation, against the same local server.
- **Script:** the Playwright run lives outside the ZIP
  (`workspace/verify-portfolio.mjs`); its raw JSON output is
  `workspace/portfolio-verify-results.json`. Lighthouse JSON outputs are
  not shipped in the ZIP.
- **Fixes found and made during this pass** (re-measured after each fix):
  the skills/mapping tables overflowed at 390/768 px (wrapped in
  scrollable `.table-wrap` containers); the first interactive module sat
  at y=1168 at 1280×900 (hero/featured tightened, featured laid out in two
  columns on desktop — now y=885); two colour-contrast failures in the
  light theme (`.btn` text and `.clock-label` now use per-theme tokens);
  a heading-order skip on Home (featured `h3` → `h2`); a label/content
  mismatch on the theme toggle (redundant `aria-label` removed);
  `robots.txt` had a relative `Sitemap:` URL (line removed, absolute URL
  is an OWNER TO SUPPLY item); CSS/JS minified (except readable
  `data.js`/`config.js`). Before these fixes Lighthouse Home was
  78 Performance / 95 Accessibility / 100 Best Practices / 91 SEO;
  after: see §10.

## 1. Link click-test (every nav, footer, case-study and "Next project" link)

- Every internal `href` found on all 15 pages was resolved from its own
  page (root and `/work/`) and loaded: **14 unique destinations, all
  HTTP 200, zero failures.**

  | Destination | Result |
  |---|---|
  | `/index.html` | 200 |
  | `/about.html` | 200 |
  | `/contact.html` | 200 |
  | `/work/index.html` | 200 |
  | `/work/draftshot.html` | 200 |
  | `/work/dsa-buddy.html` | 200 |
  | `/work/fire-detection.html` | 200 |
  | `/work/car-dealership.html` | 200 |
  | `/work/miniledger.html` | 200 |
  | `/work/ai-army.html` | 200 |
  | `/work/portman.html` | 200 |
  | `/work/netbond.html` | 200 |
  | `/work/apex.html` | 200 |
  | `/work/stocky.html` | 200 |

  (`404.html` is linked from nowhere by design; it was loaded directly
  and returned 200 on the local server. "Next project" links are the
  case-study destinations above; Stocky links back to DraftShot labelled
  "Back to start". External repo/live links were not clicked — they are
  the owner's own published URLs, listed in §8.)
- Real click-through was also tested from `file://` (see §9).

## 2. Console — zero errors/warnings on every page

- **45 page/viewport combinations** (15 pages × 390×844, 768×1024,
  1280×900): **zero console errors, zero console warnings, zero
  pageerrors, zero failed requests.**

## 3. No horizontal overflow at 390 / 768 / 1280 px

- `document.documentElement.scrollWidth <= window.innerWidth` on all
  45 combinations: **pass everywhere** (after the table-wrap fix noted
  above; before the fix, `index.html` and `about.html` overflowed at
  390 px — scrollWidth 914 — and 768 px — scrollWidth 918 — because the
  skills table's natural width is ~898 px).

## 4. Hero check (1280×900)

- Top of the featured DraftShot block: **y = 453**.
- Top of the first interactive module (Skill Match, `#skillMatch`):
  **y = 885 — under 900, pass.** (First measured at y = 1168; fixed by
  tightening the hero and laying the featured block out in two columns
  on desktop, then re-measured at 885.)

## 5. JS-disabled run

With JavaScript disabled, all facts remain readable in the HTML:

| Check | Result |
|---|---|
| Home: DraftShot, skills, Ask Me Q&As, all 7 tick steps | readable |
| DraftShot case study: "accepts ANY username", JwtFilter, hard-coded leaderboard | readable |
| Car Dealership: 45–60 s cold starts, prices/stock re-seed | readable |
| About: full Ask Me list, "Still levelling" | readable |

## 6. Reduced-motion run

- With `prefers-reduced-motion: reduce` emulated: all 7 `.reveal`
  elements render at opacity 1 / visible immediately; `matchMedia`
  confirms the media query is honoured. Parallax and reveal animations
  are disabled by the site's reduced-motion CSS/JS paths.

## 7. Keyboard-only walkthrough

| Step | Result |
|---|---|
| Skill Match: Tab-focus first chip, Enter → result shows "Node.js Strong / DraftShot — Real-time game server…" | pass |
| Inside a Tick: focus Next, Enter ×2 → "Step 3 of 7"; focus scrubber, ArrowRight → "Step 4 of 7" | pass |
| Ask Me: focus first question, Enter → `aria-expanded` false → true (answer toggles) | pass |
| Contact: fill name/org → Next → step 2 visible; pick topic chip, fill message → Next → step 3 review shows the name and message, "This message has not been sent." is shown | pass |
| Contact: Back from step 3 → message text preserved | pass |
| Contact: "Copy message" button present; "Send — backend coming soon" button is `disabled` | pass |

## 8. Fact audit

Every claim on the site traces to the Phase 1 source-of-truth brief
(10 projects, skills, honest limits, links, statuses). Spot checks:

| Claim on the site | Source |
|---|---|
| DraftShot: 60 ticks/sec fixed-step loop, keyboard-state deltas, shared physics, AABB + Ghost Box, first to 5 | Brief §Projects-1; worded as the **design**, with an invisible `<!-- OWNER REVIEW -->` comment (not independently measured) |
| DraftShot limits: any-username/no-password JWT, empty unused JwtFilter, hard-coded leaderboard, in-memory players; auth hardening = next task | Brief §Projects-1; visible "Honest limits" box on `work/draftshot.html` and in Ask Me |
| No Redis / Kafka / Docker anywhere; Render URL never linked as the shooter | Grep over all `.html`/`.js`: **0 matches** for `redis|kafka|docker|game-multi-nf73` |
| DSA Buddy: "an LLM application, not a machine learning project"; no RAG/embeddings/fine-tuning/training/LangChain/MCP/evals | Brief §Projects-2; explicit "What it is not" list on the case study |
| Car Dealership: ~45–60 s free-Render cold starts; prices/stock re-seed randomly per load | Brief §Projects-4; visible box on the case study and in Ask Me |
| Skills: Strong / Good / Still levelling (React) / LLM apps 3/5 with the "what I do not do" line | Brief §Skills |
| Statuses: Live demo (Car Dealership, MiniLedger), Repo only (DSA Buddy, AI Army, PortMan), Has known limits (DraftShot), No public link yet (Smart Fire Detection, NetBond, APEX, Stocky) | Brief + owner's 13 Nov answers |
| No invented email, phone, metric, testimonial, screenshot or date | Grep for `@` in HTML finds no email address; contact form states plainly it has no backend |

**Unmapped / flagged, not hidden:** the sitemap still uses the
placeholder `https://REPLACE-WITH-YOUR-DOMAIN` (OWNER TO SUPPLY —
canonical domain unset, so canonical links and absolute `og:url` are
omitted from pages). The "60 ticks/sec" wording awaits the owner's
confirmation (OWNER REVIEW comment in place).

## 9. file:// run

- `index.html` opened straight from the filesystem (`file:///.../
  portfolio-sahil/index.html`); navigated to `work/index.html`,
  `about.html`, `contact.html` by URL and by clicking the Work nav link
  from the home page (landed on
  `file:///.../portfolio-sahil/work/index.html`). **Zero console/page
  errors.** All scripts are classic `<script defer>`; nothing fetches
  local JSON.

## 10. Lighthouse (local static server)

Lighthouse 13.6.0, Chrome 158.0.8127.18, default mobile emulation,
`http://127.0.0.1:8127/`. Multiple runs because Performance varies
run-to-run on this shared-CPU lab VM (TBT 60–260 ms).

| Page | Run | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | 1 | 98 | 100 | 100 | 100 | 0.9 s | 80 ms | 0.076 |
| Home | 2 | 94 | 100 | 100 | 100 | 1.0 s | 240 ms | 0.076 |
| Home | 3 | 98 | 100 | 100 | 100 | 0.9 s | 140 ms | 0.076 |
| Home | 4 | 94 | 100 | 100 | 100 | 0.9 s | 260 ms | 0.076 |
| DraftShot case study | 1 | 100 | 100 | 100 | 100 | 0.9 s | 0 ms | 0.01 |
| DraftShot case study | 2 | 99 | 100 | 100 | 100 | 0.9 s | 120 ms | 0.01 |
| DraftShot case study | 3 | 100 | 100 | 100 | 100 | 0.9 s | 30 ms | 0.01 |

- Page weight (Lighthouse transfer): Home **189 KB**, DraftShot
  **148 KB** — under the ~500 KB budget excluding fonts (whole site
  on disk is 448 KB including 156 KB of fonts).
- **Honest read on the ≥95 target:** Accessibility, Best Practices and
  SEO are 100 on every run on both pages. DraftShot Performance is
  99–100. Home Performance is **94–98: the target is met in 2 of 4
  runs and missed by 1 point in the other 2**, entirely on total
  blocking time variance (80–260 ms) on this shared-CPU lab VM, not on
  any content failure (LCP 0.9–1.0 s, CLS 0.076). I am not claiming a
  clean ≥95 pass on Home. The remaining `unminified-javascript`
  diagnostic is `data.js`, deliberately left readable because it is
  the file the owner edits (see README).

## Known limitations of this delivery (not verification results)

- Fonts are self-hosted latin-subset woff2; no external requests at view
  time (verified: zero failed/external requests in the Playwright runs;
  outbound links are only followed when the visitor clicks them).
- `og:image` is a relative path until a canonical domain is supplied.
- No backend exists (Phase 1): the contact form cannot send anything,
  and the site says so on the page.

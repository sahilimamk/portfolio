# Sahil Khan — Portfolio (Phase 1, static)

A calm, pixel-gaming-flavoured "technical instrument panel" portfolio.
Vanilla HTML/CSS/JS, no frameworks, no backend, no games. The earlier
arcade/games version of this site is replaced by this build.

## Open it locally

**Option A — straight from the filesystem (file://):**

Open `index.html` in a browser (double-click it, or `File → Open`).
All links are relative and explicit (`.html` everywhere), all scripts are
classic `<script defer>` files, and nothing fetches local JSON — so the whole
site works from `file://`, including navigation from `/work/` pages.

**Option B — a local static server (recommended for testing):**

```sh
cd portfolio-sahil
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

No installs are needed for anything in this folder. Node is only needed if
you re-run the case-study generator (see below).

## Deploy to Vercel

```sh
vercel deploy   # or: drag the folder into vercel.com/new, or `vercel --prod`
```

`vercel.json` deliberately does **not** use `cleanUrls`: every link in the
site is an explicit `.html` path (`work/index.html`, `../about.html`), so
navigation is identical on `file://` and on Vercel.

## Where to edit facts and dates

- **`assets/js/data.js`** — the single source of truth for projects, the
  skill map, the Inside-a-Tick steps and the Ask Me Q&As. Edit here first.
- **`assets/js/config.js`** — name, role, `lastUpdated` ("13 Nov 2026"),
  `resumeAvailable` flag, `canonicalDomain`, public profile links, email slot.
- **Case-study pages** (`work/*.html`) are **generated** from `data.js`.
  Do not hand-edit them: change `data.js`, then run:

  ```sh
  node tools/build-case-studies.js
  ```

  That regenerates all 10 pages. Both the script and its output are
  committed, and the ZIP runs with zero installs.
- **Home / Work / About / Contact / 404** are hand-written HTML files.
  Their shared facts (skills table, Ask Me answers) are duplicated in the
  HTML on purpose, so the facts are readable with JavaScript disabled.
  If you change a fact, change it in `data.js` **and** in those pages.

## OWNER TO SUPPLY slots

Everything below is a placeholder, a comment, or an omitted element — never
an invented value.

| Slot | Where | Current state |
|---|---|---|
| Email | `assets/js/config.js` → `email: ""`; Contact page fallback section | No email is shown anywhere until one is supplied. |
| Resume PDF | `resume/resume.pdf` + `config.js` → `resumeAvailable: false` | No file yet. The About page shows "Resume PDF coming soon." Set the flag to `true` after adding the file. |
| Photo | — (no photo slot is rendered) | No photo. None is shown. |
| Canonical domain | `config.js` → `canonicalDomain: ""` | Unset. Canonical links and absolute `og:url` are omitted entirely until a domain is supplied. When set, also replace `https://REPLACE-WITH-YOUR-DOMAIN` in `sitemap.xml`. |
| Repo URLs for Smart Fire Detection, NetBond, APEX, Stocky | `data.js` → `links.repo: null` for those four; their case studies say "No public link yet" | Send the URLs and they will be added as repo links; their status tag stays "No public link yet" until then. |
| "60 ticks/sec" wording (DraftShot) | `index.html` + `work/draftshot.html`, marked `<!-- OWNER REVIEW -->` | Presented as the design from the repo, not an independently measured figure. Confirm the wording before sharing. |
| Contact form backend | `assets/js/contact-form.js` → `CONTACT_BACKEND_ENABLED = false` | Phase 1: no backend. Step 3 shows the composed message with a Copy button and is labelled "backend coming soon". Phase 2 contract: `POST /api/contact {name, org, topic, message, honeypot}` → `{ok: true}`. |

## Structure

```
index.html  about.html  contact.html  404.html
work/index.html
work/draftshot.html  work/dsa-buddy.html  work/fire-detection.html
work/car-dealership.html  work/miniledger.html  work/ai-army.html
work/portman.html  work/netbond.html  work/apex.html  work/stocky.html
assets/css/main.css  assets/css/print.css
assets/js/config.js  assets/js/data.js  assets/js/main.js
assets/js/cursor.js  assets/js/skill-match.js  assets/js/tick.js
assets/js/ask-me.js  assets/js/contact-form.js
assets/fonts/  press-start-2p-latin.woff2  vt323-latin.woff2
  inter-400/600/700-latin.woff2  (+ OFL-*.txt licences)
assets/img/  knight.svg  favicon.svg  favicon-32.png  apple-touch-icon.png
  og-image.png (1200x630, drawn, name + role only)
resume/  (empty except .gitkeep — see OWNER TO SUPPLY above)
tools/build-case-studies.js
vercel.json  sitemap.xml  robots.txt  README.md  verification-report.md
```

## Facts and honesty rules (enforced in this build)

- No Redis, Kafka or Docker claims anywhere; no Render URL presented as the
  DraftShot demo (it serves a "Game of Life" page).
- DraftShot's honest limits are a visible box on its case study, and in the
  Ask Me answers: any-username login with no password check, empty unused
  JwtFilter, hard-coded leaderboard, in-memory players. Auth hardening is
  the next task, not a done feature.
- Car Dealership's honest note is a visible box on its case study: ~45–60 s
  cold starts on free Render; prices/stock re-seed randomly per load.
- DSA Buddy is labelled "an LLM application, not a machine learning project",
  with an explicit "what it is not" list (no RAG, embeddings/vector DB,
  fine-tuning, training, LangChain, MCP, evals).
- React is labelled "Still levelling" wherever it appears.
- Sections with no source fact are omitted, not padded. No invented emails,
  phone numbers, metrics, testimonials, screenshots or dates.

## Verification

See `verification-report.md` — measured results from the verification pass
(Playwright at 390/768/1280, file:// run, JS-off and reduced-motion runs,
keyboard walkthrough, fact audit, Lighthouse 13.6 against a local static
server). Nothing in it is claimed without a measurement behind it.

## Build notes

- `assets/css/main.css`, `assets/css/print.css` and the JS files except
  `data.js` and `config.js` are minified (clean-css / terser) for
  performance. `data.js` and `config.js` are intentionally left readable:
  they are the files you edit. To re-minify after editing CSS/JS, run
  `npx clean-css-cli -o assets/css/main.css assets/css/main.css` and
  `npx terser assets/js/<file>.js -c -m -o assets/js/<file>.js`
  (never run terser on `data.js` or `config.js`).

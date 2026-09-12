---
name: AGENT_HANDOFF
type: operational
last_updated: 2026-09-12
updated_by: Codex
---

# Agent Handoff Log — mrHendrixSL.github.io

Purpose: durable record of work across coding/writing assistants.
**Rule: update the header snapshot and add a session log entry at the end of every session before stopping.**

> **Before starting any work — read `STANDING_INSTRUCTIONS.md` in full.**

---

## Current Snapshot (always up to date — read this first)

| Item | Status |
|---|---|
| Git remote | `https://github.com/mrHendrixSL/mrHendrixsl.github.io.git` |
| Git branch | main |
| Latest commit | Comprehensive editorial, accessibility, SEO, CV, and repository-hygiene pass (this commit) |
| Rollback baseline | Annotated tag `pre-editorial-pass-2026-09-12` → `73b3d88` |
| Uncommitted work | None |
| Active work | None |
| Live URL | `https://mrHendrixSL.github.io` |

### Deliverable Status

| ID | Deliverable | Status |
|---|---|---|
| D1 | Custom dark card Jekyll layout | ✅ Done |
| D2 | Centralised navigation (no per-page nav links) | ✅ Done |
| D3 | Home page hero, news strip, research cards | ✅ Done |
| D4 | Current Work — doctoral research, current threads, upcoming engagement, and completed Nimbus secondment | ✅ Done |
| D5 | Publications — status-separated published work, presentations/abstracts, and current research | ✅ Done |
| D6 | Hiberno-English DHC 2026 presentation added with accurate status | ✅ Done |
| D7 | Publications page expanded with 2026 outputs, DOI/link metadata, and updated research descriptions | ✅ Done |
| D8 | Recent Updates includes Digital History Autumn School 2026 participant acceptance | ✅ Done |
| D9 | CASCADE × MECANO abstract PDF linked from Publications and Recent Updates | ✅ Done |
| D10 | 2026 editorial, information-architecture, accessibility, SEO, and repository-hygiene pass | ✅ Done |

### Pending Actions

1. **Zenodo DOI** — When the Hiberno-English dataset is uploaded to Zenodo, update `publications.md` WIP entry with the DOI link.
2. **Stale SCSS deletion** — `assets/css/style.scss` has been made non-compiling but remains tracked pending owner approval for deletion.
3. **LaTeX artefact cleanup** — approve removal from version control of `cv_source/cv.aux`, `cv_source/cv.log`, `cv_source/cv.out`, `cv_source/texput.log`, and `cv_source/cv.pdf`; `.gitignore` now excludes future generated output.
4. **Public CV privacy** — decide whether the public-web CV should use the UCC email and omit the mobile number; the verified PDF currently retains the existing personal email and mobile number.
5. **Navigation consolidation** — decide whether to consolidate Current Work, Academic, Industry, Education, and Skills into a smaller Research/Experience structure with redirects.

### Key Files

| File | Purpose |
|---|---|
| `_layouts/default.html` | Single layout for all pages — nav, footer, Google Fonts |
| `assets/css/style.css` | All styling — CSS variables at `:root`, dark card theme |
| `index.md` | Home page — hero, news strip, research focus cards |
| `current_status.md` | Current work — doctoral research, research threads, upcoming engagement, and completed secondment |
| `publications.md` | Published work, conference abstracts/presentations, and current research |
| `_config.yml` | Jekyll config — theme line commented out (custom layout used) |
| `STANDING_INSTRUCTIONS.md` | Rules for all agents on this project |

### Site Architecture

- **Jekyll static site** — GitHub Pages, no build step needed, pushes auto-deploy
- **No external theme** — `theme: jekyll-theme-cayman` is commented out in `_config.yml`; all layout is in `_layouts/default.html`
- **No Gemfile / bundler required** — GitHub Pages handles Jekyll automatically
- **All pages** use `layout: default` front matter
- **Nav** is centralised in `_layouts/default.html` — do not add nav links inside page content
- **CSS classes to know:** `.hero`, `.news-strip`, `.news-item`, `.card-grid`, `.card`, `.pub-entry`, `.exp-entry`, `.badge`, `.badge-wip`, `.badge-accepted`, `.badge-published`, `.tag`, `.section-label`, `.skills`

### Content Map

| Page | File | Notes |
|---|---|---|
| Home | `index.md` | Hero + news strip + research card grid |
| Current Work | `current_status.md` | Doctoral research, current threads, Autumn School, and completed Nimbus secondment |
| Teaching & Academic Experience | `academic_experience.md` | UCC teaching and two visiting lecturer roles |
| Industry Experience | `industry_experience.md` | EFL Global, Affno, SYNERGEN + internships |
| Education | `education.md` | PhD UCC, MSc RGU (Distinction), BSc Cardiff Met, HND |
| Publications | `publications.md` | Published work + conference outputs + current research |
| Talks & Contributions | `Presentations_Contributions.md` | Presentations, reviewer roles, curriculum dev |
| Notes | `blog.md` | Jekyll `site.posts` loop — posts in `_posts/`; permalink remains `/blog/` |
| CV | `assets/Rasika_Edirisinghe-CV.pdf` | Linked from nav; replace file to update |

### Owner Profile

| Item | Detail |
|---|---|
| Name | Rasika Edirisinghe |
| Role | MSCA Doctoral Researcher — University College Cork, Ireland |
| Program | CASCADE Horizon Europe Marie Skłodowska-Curie Doctoral Network |
| Research | Textual relations under transformation · information retrieval · parallel text · relation judgement · visual analytics |
| Secondment | Completed at Nimbus Research Centre, Apr–Jul 2026 (inTrusted project) |
| Collaborator | Tharindu Ranathunga (Nimbus) |
| Personal email | rasikahendrix@gmail.com |
| UCC email | rasika.edirisinghe@ucc.ie |
| GitHub | mrHendrixSL |

### Current Research Strands (do not imply manuscript status)

| Strand | Status | Notes |
|---|---|---|
| Modelling Intertextual Relations under Transformation | Current doctoral research | Representation, retrieval, relation judgement, benchmark construction, and evaluation |
| Relation-Space Exploration and Visual Analytics for Parallel Text | Current doctoral research | Corpus-scale exploration and close reading |
| Trust and Grounding in Agentic Cyber-Physical Systems | Research strand from completed secondment | Nimbus/inTrusted work conducted with Tharindu Ranathunga |
| Hiberno-English lexical extraction | Presented | DHC 2026 presentation, Sheffield, Sep 2–3 2026; official DHC page linked on site |

---

## Session Log

---

### Session 1 — 2026-05-19 — Claude Sonnet 4.6

**Scope:** Full site revamp

**Done:**
- Created `_layouts/default.html` — sticky dark nav, footer, Google Fonts (Inter + JetBrains Mono)
- Created `assets/css/style.css` — dark card theme (#0d1117 bg), CSS custom properties, responsive, card grid, badges, timeline exp entries, news strip
- Rewrote `index.md` — hero block, news strip (4 updates), research focus card grid
- Rewrote `current_status.md` — Nimbus secondment (inTrusted, Apr–Jul 2026) as lead section
- Rewrote `publications.md` — accepted/published + Work in Progress section (4 WIP entries including Hiberno-English paper)
- Cleaned all remaining pages (`academic_experience.md`, `industry_experience.md`, `education.md`, `Presentations_Contributions.md`) — removed manual nav links, added `layout: default` front matter
- Commented out `theme: jekyll-theme-cayman` in `_config.yml`
- Committed and pushed to `origin/main`

**Not done / future:**
- Zenodo DOI for Hiberno-English dataset not yet available
- No dark/light toggle (out of scope this session)

**Risks:**
- If GitHub Pages shows a blank page: check that `theme:` line is fully commented out and `_layouts/default.html` exists in root
- Google Fonts load from CDN — will fail in offline/local preview without internet

---

### Session 2 — 2026-09-11 — Codex

**Scope:** Expand the Publications & Research Output page and add an owner-confirmed Recent Update

**Done:**
- Reorganised `publications.md` into published/conference outputs, conference abstracts/research frameworks, and research in progress.
- Added the DHC 2026 Hiberno-English conference paper and its conference link.
- Updated the DH2025 abstract to published status and added its DOI.
- Added the CASCADE × MECANO parallel-text framework abstract.
- Replaced the earlier broad WIP descriptions with the supplied intertextual-relations, visual-analytics, and trust/grounding research entries.
- Preserved clean UTF-8 names and punctuation and verified balanced HTML containers.
- Expanded homepage Recent Updates with the Aug 2026 Digital History Autumn School acceptance, the DHC 2026 paper/presentation, the CASCADE × MECANO abstract, and DH2025's published abstract status and DOI.
- Committed the site and handoff updates to `main` and pushed them to `origin`.

**Not done / future:**
- Did not update the CV or other site pages; their older publication/status wording may now need alignment.
- Did not modify `skills.md`.

**Risks:**
- The Nimbus secondment status in `current_status.md` is now date-stale and requires owner confirmation before changing.

---

### Session 3 — 2026-09-11 — Codex

**Scope:** Add the owner-supplied source link for the CASCADE × MECANO Convention 1 abstract

**Done:**
- Linked the official short-abstracts PDF from the publication entry and its homepage Recent Updates item.
- Used the supplied CASCADE website URL without changing publication metadata.
- Committed the link updates and handoff record to `main` and pushed them to `origin`.

**Not done / future:**
- Did not modify `skills.md`.

---

### Session 4 — 2026-09-12 — Codex

**Scope:** Comprehensive editorial, information-architecture, technical, accessibility, SEO, CV, and repository-hygiene pass

**Done:**
- Repositioned the homepage and Current Work page around textual relations under transformation, with Nimbus presented as completed additional research experience.
- Reduced Recent Updates to five significant items and changed the Nimbus update to past tense.
- Separated publications from conference presentations/abstracts and broad current research; corrected DHC 2026 to presentation status and removed implied Nimbus co-authorship.
- Verified SCSE 2023 against the official conference record and session plan; standardised the venue and presentation date as 29 June 2023.
- Added the DHC 2026 talk, tightened academic/industry/education pages, removed stale calculated durations and old student-project detail, and rebuilt Skills into five compact categories.
- Renamed the visible blog container to Notes, added post front matter, and made social share URLs derive from Jekyll page metadata.
- Added `jekyll-seo-tag`, canonical site metadata, skip navigation, keyboard-accessible mobile navigation, focus styles, external-link protections, and a 920px responsive breakpoint.
- Disabled Jekyll compilation of the stale light-theme SCSS without deleting it.
- Updated and successfully built the CV with direct `pdflatex`; inspected all three pages and copied the verified build to `assets/Rasika_Edirisinghe-CV.pdf`.
- Added `.gitignore`, a concise `README.md`, and publication-status safeguards to `STANDING_INSTRUCTIONS.md`.
- Created the annotated rollback tag `pre-editorial-pass-2026-09-12` at the exact pre-pass commit, `73b3d88`.
- Recorded the complete pass in one reviewable commit so it can be reverted atomically if required.

**Not done / future:**
- Did not delete or untrack the stale SCSS or tracked LaTeX build artefacts; owner approval is required.
- Did not consolidate or rename URL-bearing content pages; navigation recommendations await owner approval.
- Did not change the public CV phone number or personal email; owner privacy decision is required.
- Could not run a local Jekyll build because Ruby/Jekyll is not installed. Structural, link, front-matter, CSS, and source checks were run instead.

**Risks:**
- Tracked LaTeX artefacts were restored after the verified build, but future builds will continue to modify them until repository cleanup is approved.
- `assets/css/style.scss` is inactive but remains a maintenance liability until deletion is approved.

---

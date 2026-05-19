---
name: AGENT_HANDOFF
type: operational
last_updated: 2026-05-19
updated_by: Claude Sonnet 4.6
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
| Latest commit | `2020058` — Revamp site with dark card theme and content updates |
| Uncommitted work | None |
| Active work | None |
| Live URL | `https://mrHendrixSL.github.io` |

### Deliverable Status

| ID | Deliverable | Status |
|---|---|---|
| D1 | Custom dark card Jekyll layout | ✅ Done |
| D2 | Centralised navigation (no per-page nav links) | ✅ Done |
| D3 | Home page hero, news strip, research cards | ✅ Done |
| D4 | Current Status — Nimbus secondment | ✅ Done |
| D5 | Publications — Work in Progress section | ✅ Done |
| D6 | Hiberno-English paper added as WIP entry | ✅ Done |

### Pending Actions

1. **Zenodo DOI** — When the Hiberno-English dataset is uploaded to Zenodo, update `publications.md` WIP entry with the DOI link.
2. **Nimbus secondment end** — After Jul 20 2026, update `current_status.md` secondment badge from WIP → completed, and move it to a past experience section if appropriate.
3. **DHC 2026 presentation** — After Sep 2026, update the Hiberno-English WIP entry with paper status (submitted / published).
4. **DH2025 paper** — After Jul 2025 conference, update `publications.md` badge from `Abstract Accepted` → `Published` and add proceedings link.

### Key Files

| File | Purpose |
|---|---|
| `_layouts/default.html` | Single layout for all pages — nav, footer, Google Fonts |
| `assets/css/style.css` | All styling — CSS variables at `:root`, dark card theme |
| `index.md` | Home page — hero, news strip, research focus cards |
| `current_status.md` | Current work — secondment + PhD |
| `publications.md` | Publications + WIP section |
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
| Current Status | `current_status.md` | Nimbus secondment + PhD + upcoming goals |
| Academic Experience | `academic_experience.md` | Two visiting lecturer roles (Ruhuna, SLT) |
| Industry Experience | `industry_experience.md` | EFL Global, Affno, SYNERGEN + internships |
| Education | `education.md` | PhD UCC, MSc RGU (Distinction), BSc Cardiff Met, HND |
| Publications | `publications.md` | Published + WIP sections |
| Talks & Contributions | `Presentations_Contributions.md` | Presentations, reviewer roles, curriculum dev |
| Blog | `blog.md` | Jekyll `site.posts` loop — posts in `_posts/` |
| CV | `assets/Rasika_Edirisinghe-CV.pdf` | Linked from nav; replace file to update |

### Owner Profile

| Item | Detail |
|---|---|
| Name | Rasika Edirisinghe |
| Role | PhD Researcher — University College Cork, Ireland |
| Program | CASCADE Horizon Europe MSCA (Marie Curie) |
| Research | NLP · Text Reuse Detection · Semantic Change · LLMs · Visualization |
| Secondment | Nimbus Research Centre, Apr–Jul 2026 (inTrusted project) |
| Collaborator | Tharindu Ranathunga (Nimbus) |
| Personal email | rasikahendrix@gmail.com |
| UCC email | rasika.edirisinghe@ucc.ie |
| GitHub | mrHendrixSL |

### Unpublished / WIP Papers (do not over-disclose)

| Paper | Status | Notes |
|---|---|---|
| Text Reuse Detection with LLMs | In progress | PhD, CASCADE project, UCC |
| Interactive Visualization for NLP Interpretability | In progress | Open-source tool goal |
| Hiberno-English Dictionary Parsing (hybrid RB+LLM) | Under preparation | DHC 2026 talk accepted (Sheffield, Sep 2–3 2026); full paper at `D:\Publications\HIBERNO - ENGLISH PAPER` |
| inTrusted — trust in agentic cyber-physical systems | In progress | Nimbus secondment, with Tharindu Ranathunga |

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

---
name: AGENT_HANDOFF
type: operational
last_updated: 2026-09-15
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
| Latest commit | `Deploy cinematic Semantic Observatory` — current deployment commit; use `git log -1` for its immutable hash |
| Full-pass rollback | Annotated tag `pre-editorial-pass-2026-09-12` → `73b3d88` |
| Homepage rollback | Annotated tag `pre-homepage-update-2026-09-12` → `fa50138` |
| Skip-link rollback | Annotated tag `pre-skip-link-fix-2026-09-12` → `70646ba` |
| Redesign rollback | Annotated tag `pre-editorial-research-redesign-2026-09-12` → `9d83c15` |
| Astro rollback | Annotated tag `pre-astro-migration-2026-09-12` → `1974f4b`; published to origin with migration |
| Interaction-semantics rollback | Annotated tag `pre-interaction-semantics-2026-09-12` → `fa9fb0b`; published with the interaction pass |
| Milton–Shelley demo rollback | Annotated tag `pre-milton-shelley-demo-2026-09-12` → `6c152b6`; published with the focused demonstration redesign |
| Transformation-reduction rollback | Annotated tag `pre-transformation-reduction-2026-09-12` → `2d6956c`; published with the progressive-disclosure pass |
| Homepage-IA rollback | Annotated tag `pre-homepage-ia-correction-2026-09-12` → `a40b75d`; published with the five-chapter homepage pass |
| Routed-home/toolchain rollback | Annotated tag `pre-routed-home-toolchain-2026-09-15` → `dc1c0a4`; published with the routed interface/toolchain pass |
| Semantic Observatory rollback | Annotated tag `pre-semantic-observatory-2026-09-15` → `fd39ffe`; published with the cinematic observatory pass |
| Uncommitted work | Only the unused untracked prototype `src/components/home/MethodPipeline.svelte`; it was explicitly excluded from deployment |
| Active work | Confirm the GitHub Pages Actions deployment completes and review the Semantic Observatory on the live site |
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
| D11 | Editorial researcher × cognitive cartography visual redesign | ✅ Done |
| D12 | Astro 7 static architecture with Svelte islands and structured content | ✅ Done |
| D13 | D3 relation field and research architecture, GSAP transformation sequence, selective OGL depth | ✅ Done |
| D14 | Astro GitHub Pages workflow and documented rollback procedure | ✅ Deployed |
| D15 | Qualitative relation field, token-level transformation sequence, and research-object pipeline | ✅ Deployed |
| D16 | Integrated Milton source, transformation path, and Shelley relation-trace demonstration | ✅ Deployed |
| D17 | Radically simplified transformation story with progressive disclosure | ✅ Deployed |
| D18 | Five-chapter homepage narrative with quiet identity hero and compact Now exit surface | ✅ Deployed |
| D19 | Reference-matched five-screen homepage with real routes, persistent responsive chapter navigation, reusable continuation controls, simplified transformation opening, and responsive architecture pipeline | ✅ Deployed |
| D20 | Compact publication/talk/experience/note directories, abstract one-screen responsive architecture, and persistent D3-calculated landing toolchain animation | ✅ Deployed |
| D21 | Cinematic Semantic Observatory landing sequence with a persistent three-dimensional semantic field | ✅ Deployed |

### Pending Actions

1. **Semantic Observatory live review** — Confirm the Pages workflow completes and inspect the complete animation on the public URL.
2. **Zenodo DOI** — When the Hiberno-English dataset is uploaded to Zenodo, update its record in `src/data/publications.ts` with the DOI link.
3. **Stale SCSS deletion** — `assets/css/style.scss` has been made non-compiling but remains tracked pending owner approval for deletion.
4. **LaTeX artefact cleanup** — approve removal from version control of `cv_source/cv.aux`, `cv_source/cv.log`, `cv_source/cv.out`, `cv_source/texput.log`, and `cv_source/cv.pdf`; `.gitignore` now excludes future generated output.
5. **Public CV privacy** — decide whether the public-web CV should use the UCC email and omit the mobile number; the verified PDF currently retains the existing personal email and mobile number.

### Key Files

| File | Purpose |
|---|---|
| `astro.config.mjs` | Static root-site output, integrations, code splitting, and canonical site URL |
| `src/layouts/BaseLayout.astro` | Global semantic shell, SEO metadata, navigation, and footer |
| `src/pages/` | Canonical pages and thin compatibility routes |
| `src/components/relation/` | D3 relation field/research map and GSAP transformation-sequence Svelte islands |
| `src/components/home/SemanticObservatory.svelte` | D3/GSAP cinematic Identity visualisation |
| `src/data/` | Typed profile, updates, publications, talks, projects, experience, and skills |
| `src/content/notes/` | Notes MDX content collection |
| `public/assets/` | URL-stable CV, portrait, favicon, and social-preview assets |
| `.github/workflows/deploy.yml` | Astro build and GitHub Pages artifact deployment |
| `MIGRATION_ROLLBACK.md` | Deployment-source switch and rollback procedure |
| `_layouts/`, `_posts/`, root `*.md` | Preserved pre-migration Jekyll source for rollback |
| `STANDING_INSTRUCTIONS.md` | Rules for all agents on this project |

### Site Architecture

- **Current production architecture:** Astro 7 static output, with page source in `src/pages/`, shared layouts/styles/components in `src/`, and static assets in `public/`.
- **Client islands:** Identity hydrates `SemanticObservatory.svelte` with `client:visible`, using D3 for deterministic spatial structure and dynamically imported GSAP for the cinematic sequence. Transformation and Architecture retain their focused islands. RelationField remains preserved but unmounted, so OGL is absent from the homepage-route output.
- **Structured content:** typed data under `src/data/`; Notes under `src/content/notes/` through an Astro MDX content collection.
- **Deployment:** `.github/workflows/deploy.yml` uses `withastro/action@v6` and `actions/deploy-pages@v5`; GitHub Pages uses the Actions artifact.
- **Preserved fallback:** all prior Jekyll root Markdown, `_layouts/`, `_posts/`, `_config.yml`, and original `assets/` remain present for rollback.
- **Recovery:** `MIGRATION_ROLLBACK.md` documents a revert-first rollback and the Pages-source switch needed to restore Jekyll.

### Content Map

| Page | File | Notes |
|---|---|---|
| Home sequence | `src/pages/index.astro`, `src/pages/position.astro`, `src/pages/transformation.astro`, `src/pages/architecture.astro`, `src/pages/now.astro` | Five separately navigable screens: Identity, Research Position, Relation under Transformation, Research Architecture, and Now / Additional Work |
| Research | `src/pages/research.astro` | Doctoral programme, D3 architecture, transformation model, and research contexts |
| Publications | `src/pages/publications.astro` + `src/data/publications.ts` | Published work, conference output, and projects |
| Talks | `src/pages/talks.astro` + `src/data/talks.ts` | Presentations and academic contributions |
| Experience | `src/pages/experience.astro` + `src/data/experience.ts` | Academic, industry, education, and methods/skills |
| Notes | `src/pages/notes/` + `src/content/notes/` | MDX collection and editorial note layout; `/blog/` redirects here |
| CV | `public/assets/Rasika_Edirisinghe-CV.pdf` | Stable `/assets/Rasika_Edirisinghe-CV.pdf` URL |

### Owner Profile

| Item | Detail |
|---|---|
| Name | Rasika Edirisinghe |
| Role | MSCA Doctoral Researcher — University College Cork, Ireland |
| Program | CASCADE Horizon Europe Marie Skłodowska-Curie Doctoral Network |
| Research | Textual relations under transformation · information retrieval · parallel text · relation judgement · visual analytics |
| Secondment | Completed at Nimbus Research Centre, Apr–Jul 2026 (inTrusted project) |
| Personal email | rasikahendrix@gmail.com |
| UCC email | rasika.edirisinghe@ucc.ie |
| GitHub | mrHendrixSL |

### Current Research Strands (do not imply manuscript status)

| Strand | Status | Notes |
|---|---|---|
| Modelling Intertextual Relations under Transformation | Current doctoral research | Representation, retrieval, relation judgement, benchmark construction, and evaluation |
| Relation-Space Exploration and Visual Analytics for Parallel Text | Current doctoral research | Corpus-scale exploration and close reading |
| Trust and Grounding in Agentic Cyber-Physical Systems | Research strand from completed secondment | Nimbus/inTrusted secondment work |
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

### Session 5 — 2026-09-12 — Codex

**Scope:** Simplify and reposition homepage Recent Updates and justify the About Me copy

**Done:**
- Confirmed that four owner-listed historical items were already absent, then restored the Jul 2025 DH2025 item after the owner clarified that its abstract was both published and presented.
- Retained five updates: four from 2026 and the restored Jul 2025 DH2025 publication and presentation.
- Recorded that the CASCADE × MECANO Convention 1 abstract was published and presented on 28 January 2026.
- Moved Recent Updates from above About Me to immediately below the About Me copy.
- Added a scoped `.about-copy` style so only the About Me paragraphs use justified alignment.
- Converted the About Me paragraphs to explicit HTML inside a semantic styling wrapper without changing their wording.
- Aligned the publication/presentation statuses and dates across `publications.md`, `Presentations_Contributions.md`, and the LaTeX CV source.
- Rebuilt the public CV with two successful `pdflatex` passes and verified the updated three-page PDF text and page-two layout.
- Created the annotated rollback tag `pre-homepage-update-2026-09-12` at `fa50138` so this homepage-only change can be reversed independently.

**Not done / future:**
- No unrelated homepage, publication, talk, or CV content was changed.

**Risks:**
- Justified text can produce uneven word spacing on narrow screens, depending on the browser and line breaks.

---

### Session 6 — 2026-09-12 — Codex

**Scope:** Fix the skip-navigation link remaining visible after pointer interaction

**Done:**
- Confirmed that the deployed page and stylesheet both contained the intended skip-navigation markup and CSS.
- Replaced transform-only hiding with a robust visually-hidden clipping pattern.
- Changed the visible state from generic `:focus` to `:focus-visible`, keeping the link available to keyboard users without leaving it visible after mouse clicks.
- Created the annotated rollback tag `pre-skip-link-fix-2026-09-12` at `70646ba`.

**Not done / future:**
- No navigation labels, destinations, or other page styling were changed.

**Risks:**
- The visible keyboard-focus treatment depends on `:focus-visible`, which is supported by current major browsers.

---

### Session 7 — 2026-09-12 — Codex

**Scope:** End-to-end design-led rethink: editorial researcher × cognitive cartography × restrained psychonautic depth

**Done:**
- Rebuilt the visual system around a nocturnal archival palette, Newsreader editorial typography, broader composition, low-contrast depth fields, thin relation lines, and amber/indigo conceptual accents.
- Reworked the global layout with a relation-graph monogram, five-link primary navigation, an Experience disclosure grouping the four supporting profile pages, an accessible mobile menu, and a deliberate research-signature footer.
- Preserved every existing page file and URL while making the navigation lean toward Home, Research, Publications, Talks, Experience, Notes, and CV.
- Completely redesigned the homepage around an identity-led hero, an accessible inline relation-map SVG, an editorial About section with left-aligned prose, a lightweight Recent timeline, a four-stage doctoral research spine, and a visually secondary Nimbus strand.
- Rebuilt Current Work as a deeper Research page with a doctoral-research lead, three connected inquiry lines, and separate upcoming/completed context blocks.
- Restyled publications, talks, academic experience, industry experience, education, and skills through the shared design system, replacing repeated dashboard cards and pill-heavy metadata with editorial rows, rules, and timelines.
- Rebuilt Notes as an essay index and replaced third-party image badges in the existing post with lightweight text sharing links without changing the post voice.
- Replaced legacy presentational heading `<div>` elements across publications, talks, experience, education, and skills with a proper `h1`/`h2`/`h3` hierarchy; corrected the existing post hierarchy without changing its wording.
- Added `assets/img/favicon.svg`, maintainable `assets/img/social-preview.svg`, and its verified 1200 × 630 PNG export; configured the social preview as the default page image.
- Created 240 px and 480 px responsive headshot derivatives (14.6 KB and 44.8 KB) while preserving the 388 KB high-resolution source unchanged.
- Added reduced-motion behaviour and retained semantic headings, skip navigation, alt text, keyboard focus styles, secure external links, and screen-reader labelling for the relation map.
- Previewed Home, Current Work, and Publications in headless Chrome at desktop and mobile breakpoints; corrected mobile min-content overflow before completion.
- Verified 11 layout/content files for structural tag balance, all target-blank links for secure `rel` values, all images for alt text, CSS braces/comments, SVG XML, output image dimensions, navigation JavaScript syntax and interaction, and absence of hard-coded CSS colours outside `:root`.
- Measured WCAG contrast against the base field: main text 16.61:1, soft text 11.97:1, muted text 7.64:1, indigo 7.75:1, and amber 9.11:1.
- Updated `README.md` and `STANDING_INSTRUCTIONS.md` to document the new system and derived visual assets.
- Created the annotated rollback tag `pre-editorial-research-redesign-2026-09-12` at the exact pre-redesign commit, `9d83c15`.
- Recorded the complete redesign in one atomic, extensively documented commit so it can be reviewed or reverted as a single unit.

**Not done / future:**
- Did not rename, consolidate, redirect, or delete any URL-bearing page.
- Did not delete the stale SCSS or tracked LaTeX artefacts.
- Did not change factual research, publication, employment, education, or collaborator data.
- Could not run Jekyll itself because Ruby/Jekyll is unavailable locally; browser previews used a static assembly of the actual layout and page content.

**Risks:**
- The social-preview default should be confirmed in generated Open Graph metadata after the first GitHub Pages/Jekyll build.
- The site still depends on Google Fonts for Inter, Newsreader, and JetBrains Mono; system fallbacks remain configured.
- The Experience disclosure simplifies the current navigation but URL consolidation remains a separate owner decision.

---

### Session 8 — 2026-09-12 — Codex

**Scope:** Architectural migration from the preserved Jekyll site to an Astro/Svelte/D3/GSAP/OGL static research environment

**Done:**
- Created local annotated rollback tag `pre-astro-migration-2026-09-12` at clean baseline `1974f4b2a7e9f017d40b3c537ab759b52734fb0e` before migration edits.
- Added Astro 7.3.2 with strict TypeScript, static output, root-site canonical configuration, Svelte and MDX integrations, an Astro Content Collection for Notes, and a filtered XML sitemap.
- Added typed single-source data for the profile, five approved Recent updates, publications, talks and academic contributions, research projects, academic/industry experience, education, and methods/skills.
- Built static Home, Research, Publications, Talks, Experience, Notes index, and migrated Note routes with reusable Astro layouts and components.
- Migrated the existing NLP Hellscape post to MDX without sanitising its voice and provided a compatibility redirect from its prior dated Jekyll URL.
- Built three Svelte islands: an accessible D3 relation field, a D3 research-architecture trajectory, and a GSAP/ScrollTrigger transformation sequence. The relation field uses one dynamically imported OGL point layer to encode shallow semantic depth on capable desktop browsers.
- Kept all interaction progressive: server-rendered HTML remains available before hydration; SVGs have titles/descriptions; conceptual nodes are keyboard focusable; mobile receives the textual/2D fallback; reduced motion disables OGL and makes the transformation sequence static.
- Replaced remote Google Fonts with self-hosted Newsreader and DM Sans variable font subsets and changed the portrait to Astro-generated 96/192 px WebP output (2.4/6.2 KB).
- Preserved extensionless legacy routes for Current Work, academic/industry experience, education, skills, Talks & Contributions, and `/blog/`; also emitted matching legacy `.html` redirects where the previous Jekyll build may have exposed them.
- Added the current official Astro GitHub Pages workflow pattern (`actions/checkout@v7`, `withastro/action@v6`, `actions/deploy-pages@v5`) and documented the deployment-source switch and rollback procedure in `MIGRATION_ROLLBACK.md`.
- Preserved every Jekyll content/source file and all original factual titles, collaborators, dates, affiliations, URLs, and publication/presentation statuses.

**Validation:**
- `npm install`: 371 packages audited, zero vulnerabilities.
- `npm run build`: 35 source files checked with zero errors, warnings, or hints; 14 Astro routes plus static compatibility files generated; sitemap includes only canonical content routes.
- Local preview returned HTTP 200 for all primary pages, the migrated post, every extensionless compatibility route, and the dated `.html` post route.
- Chrome DevTools emulation checked 1440, 1280, 1024, 768, 430, 390, and 360 px widths. No horizontal overflow occurred; every content page had one H1; the mobile menu opened, closed with Escape, and returned focus.
- Verified one initial homepage island hydration and all three after scrolling; GSAP changed the active transformation; desktop OGL produced one canvas; 430/390/360 px and reduced-motion modes produced none; no runtime exceptions occurred.
- Lighthouse 13.4.1 mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100. Desktop: 100 in all four categories.
- Generated internal link/asset targets all resolve, and every generated `target="_blank"` link includes `noopener`.

**Deployment:**
- After the local validation pass, the owner explicitly authorised migration to the live `.io` site.
- The migration was committed atomically, pushed to `origin/main`, and the rollback tag was published to origin.
- GitHub Pages was switched from the legacy branch/Jekyll build to GitHub Actions, and the deployment workflow was monitored through completion.

**Not done / future:**
- The future browser-only Relation Lab is documented as an architectural extension point, but Transformers.js/ONNX Runtime Web and `/lab/` were intentionally not built or installed.
- The existing public CV privacy decision, stale SCSS removal, and LaTeX artefact cleanup remain outside this migration.

**Risks:**
- OGL/WebGL availability varies by browser and device; the D3/SVG field remains the primary non-WebGL and mobile rendering.
- Restoring the preserved Jekyll build requires both reverting the Astro migration and switching GitHub Pages back to branch publishing, as documented in `MIGRATION_ROLLBACK.md`.

---

### Session 9 — 2026-09-12 — Codex

**Scope:** Replace invented research metrics and decorative interactions with qualitative, intellectually meaningful visualisation semantics

**Done:**
- Removed all invented similarity, relation, depth, and percentage-evidence readouts from the interactive research components.
- Rebuilt RelationField around qualitative surface-overlap, transformation-distance, and relation-evidence categories; D3 now derives node positions from categorical dimensions and generates the transformation paths.
- Retained OGL only as a dynamically imported, low-opacity desktop depth layer derived from the D3 layout; mobile and reduced-motion modes continue without WebGL.
- Replaced the row-shift sequence with an original, non-copyrighted demonstration passage and five explicit textual states: quotation, paraphrase, adaptation, obfuscation, and allusion.
- Added GSAP token-level substitution, reordering, fading, fragmentation, and semantic reconnection without pinning, scrubbing, or scroll hijacking.
- Added a robust reduced-motion rendering that displays all five passages statically without importing GSAP, including a CSS fallback before island hydration.
- Rebuilt ResearchArchitecture as a six-object pipeline — texts, representations, candidate space, ranked relations, evidence, and visual exploration — with REPRESENT, RETRIEVE, JUDGE, and EXPLORE spanning the relevant object transitions.
- Used D3 to lay out the pipeline, operation spans, connectors, representation matrix, candidate cluster, and ranked ordering; added concise focus/hover descriptions and a textual mobile fallback.
- Changed homepage `.about-copy` alignment from justified to left-aligned while retaining automatic hyphenation.
- Corrected the homepage relation field's responsive flow and minimum-content sizing so the true 390 px viewport has no horizontal overflow or portrait/readout collision.
- Preserved all factual research records, Astro architecture, page information architecture, dependencies, `client:visible` hydration directives, and deployment configuration.

**Validation:**
- `npm run build`: 35 files checked with zero errors, warnings, or hints; all 14 routes generated.
- Chrome DevTools emulation at 390 × 844 reported document width equal to viewport width (390 px).
- Standard-motion browser check observed 32 token elements in motion during the tested transition, activated OBFUSCATION, and left exactly one passage layer visible after completion.
- Reduced-motion browser check displayed all five static passages, hid the animated trace panel, and added no horizontal overflow.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.7 s, CLS 0.03, TBT 0 ms.
- Lighthouse desktop: 100 in all four categories; LCP 0.4 s, CLS 0.027, TBT 0 ms.
- Lighthouse produced valid reports but returned a Windows EPERM warning while attempting to remove its temporary Chrome profiles after each completed audit.

**Deployment:**
- After local review, the owner explicitly authorised the completed pass to be committed and pushed.
- Created the annotated rollback tag `pre-interaction-semantics-2026-09-12` at the exact pre-pass commit, `fa9fb0b`.
- Recorded the implementation and validation in one atomic commit and pushed `main` plus the rollback tag to origin.

**Not done / future:**
- The conceptual states are deliberately qualitative and are not presented as empirical findings; connecting them to project data remains future work.

**Risks:**
- The demonstration passage and category placement are explanatory models, not experimental outputs; retain qualitative labelling until real project data is connected.

---

### Session 10 — 2026-09-12 — Codex

**Scope:** Focused redesign of the transformation demonstration around the historical Milton–Shelley relation

**Done:**
- Replaced the generic invented passage with the owner-supplied historical anchors from John Milton's *Paradise Lost*, Book X, and Mary Shelley's *Frankenstein*.
- Explicitly labelled the Milton–Shelley relation as historical and the paraphrase, adaptation, and obfuscation states as constructed demonstrations of changing retrieval conditions.
- Framed the sequence as one illustrative path through a multidimensional transformation space rather than a universal linear taxonomy.
- Rebuilt the section as an integrated three-part comparison: persistent Milton source anchor, selectable transformation path, and conceptual relation trace with the Shelley destination always present.
- Added five concise transformation states with plain-language explanations of what remains visible, what changes, and how a computational system might recover the relation.
- Preserved restrained GSAP token-level substitution, reordering, disappearance, fragmentation, and allusive re-anchoring while removing the ScrollTrigger dependency and all scroll-driven activation.
- Added keyboard-operable state controls supporting focus, click, arrow keys, Home, and End; active state and destination emphasis remain textually explicit and do not rely on colour alone.
- Added a D3 tree for the persistent creator/created-being conceptual structure, including Adam and fallen angel re-anchoring at the allusion state.
- Added D3-positioned qualitative continua for surface wording, transformation distance, and relation evidence, explicitly labelled as categories rather than measurements.
- Applied stable shape, line-style, and colour encodings to created being, creator/maker, consent, origin/emergence, and responsibility/accusation concepts.
- Added a static reduced-motion mode showing all five passages while retaining both historical anchors and the complete concept map.
- Added responsive layouts: three simultaneous panels on desktop, a full-width source plus two panels on tablet, and source → transformation → trace stacking on mobile.
- Kept the existing Astro/Svelte/D3/GSAP/OGL architecture, `client:visible` hydration, page structure, dependencies, RelationField, and factual research content elsewhere unchanged.

**Validation:**
- `npm run build`: 35 source files checked with zero errors, warnings, or hints; all 14 routes generated.
- Chrome DevTools checks passed at 1440, 820, and 390 px; the 390 px document width equals the viewport width and the panels retain the intended semantic order.
- Keyboard End navigation selected and focused ALLUSION, emphasized the Shelley destination, and left exactly one animated text layer visible.
- Reduced-motion mode hid the animated stage, exposed all five static passages, retained both quotations and the D3 trace, and produced no horizontal overflow.
- Confirmed the generated interface contains the constructed-step disclosure and both author anchors, with no decimals or percentage metrics.
- Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 0.4 s, CLS 0.027, TBT 0 ms.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.7 s, CLS 0.03, TBT 0 ms.
- Removing ScrollTrigger reduced the deferred GSAP chunk from approximately 113 KB to 70 KB; the richer transformation island remains `client:visible` and the combined deferred component/GSAP payload is smaller than before this redesign.

**Deployment:**
- The owner explicitly authorised the completed focused redesign to be committed and pushed.
- Created the annotated rollback tag `pre-milton-shelley-demo-2026-09-12` at the exact pre-pass commit, `6c152b6`.
- Recorded the implementation and validation in one atomic commit and pushed `main` plus the rollback tag to origin.

**Not done / future:**
- No framework, dependency, route, page information architecture, RelationField behavior, or factual research record outside the demonstration was changed.

**Risks:**
- The intermediate paraphrase, adaptation, and obfuscation passages are explanatory constructions, not historical transmission stages; the interface disclosure must remain if the example is edited later.

---

### Session 11 — 2026-09-12 — Codex

**Scope:** Radical information reduction and progressive disclosure for the Milton–Shelley transformation demonstration

**Done:**
- Replaced the three-column analytical dashboard with one narrative composition led by two large text panels: a persistent Milton source and the current transformation state.
- Reduced the default conceptual model to a stable four-family relation spine: created being, creator/maker, creation/origin, and consent/grievance.
- Limited default evidence reporting to two categorical readouts—surface wording and evidence source—with no numeric values, fake precision, ruler charts, or measurement-like dots.
- Replaced the vertical stage table with an immediately visible five-stage horizontal stepper; retained click, focus, arrow-key, Home, and End interaction, with an internally scrolling mobile layout.
- Reduced each stage to one prominent plain-language explanation and one short sentence explaining why computational recovery becomes harder.
- Made stage 05 the Shelley payoff: the current-text panel becomes Mary Shelley’s *Frankenstein* quotation and reveals the Adam/created-being and fallen-angel/Miltonic-creation mappings.
- Kept Shelley as a subtle endpoint marker during stages 01–04 instead of permanently duplicating the destination quotation.
- Moved the fuller D3 concept graph and the additional transformation/evidence categories behind a native `details` disclosure labelled “Explore the relation model.”
- Preserved restrained, dynamically imported GSAP token motion for lexical substitution, repositioning, fading, fragmentation, and reconnection without scroll-driven activation.
- Preserved a motion-independent rendering: reduced-motion users receive the Milton anchor, all five textual states, the Shelley payoff, and the relation mappings without importing or requiring GSAP.
- Kept the existing Astro/Svelte/D3/GSAP/OGL architecture, page routes, content data, research claims, dependency set, and `client:visible` hydration unchanged.

**Validation:**
- `npm run build`: 35 source files checked with zero errors, warnings, or hints; all 14 static routes generated.
- Chrome DevTools checks confirmed the desktop two-panel hierarchy, one visible animated passage, four default concept families, two default indicators, and a closed-by-default advanced model.
- Click and keyboard navigation reached every state; End selected and focused ALLUSION, changed the right panel to Mary Shelley / *Frankenstein*, and revealed both literary mappings.
- A true 390 px mobile viewport had no page-level horizontal overflow; the text panels stacked and the stepper scrolled only within its own container.
- Reduced-motion emulation hid the animated active panel and navigator, displayed all five static states with both historical anchors, revealed the final mappings, and retained a no-overflow layout.
- Confirmed the rendered default interface contains no invented decimal metrics and none of the former quantitative-looking similarity/relation/depth labels.
- Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 0.4 s, CLS 0.027, TBT 0 ms.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.7 s, CLS 0.03, TBT 0 ms.
- The deferred transformation component is approximately 22.4 KB and the existing dynamically loaded GSAP chunk approximately 69.7 KB; OGL remains separately deferred.
- Lighthouse generated both valid reports but returned the known Windows EPERM warning while cleaning its temporary Chrome profiles after the completed audits.

**Deployment:**
- The owner explicitly authorised the completed simplification to be committed and pushed.
- Created the annotated rollback tag `pre-transformation-reduction-2026-09-12` at the exact pre-pass commit, `2d6956c`.
- Recorded the implementation, validation, and rollback point in one atomic commit and pushed `main` plus the rollback tag to origin.

**Not done / future:**
- No whole-site redesign, dependency addition, information-architecture change, or factual research-content edit was made.

**Risks:**
- The intermediate stages remain explanatory constructions rather than a claimed historical transmission sequence; retain the visible historical-anchor/constructed-demonstration disclosure.

---

### Session 12 — 2026-09-12 — Codex

**Scope:** Final homepage information-architecture correction and removal of RelationField from the identity hero

**Done:**
- Reordered the homepage into the exact narrative sequence `#intro` → `#position` → `#transformation` → `#architecture` → `#now`.
- Rebuilt chapter 00 as a quiet identity-first hero containing the owner’s name, MSCA/UCC role, research direction, conceptual statement, seven profile links, and portrait—with no graph, conceptual axes, metrics, or substitute visualisation.
- Removed the RelationField import and mount from Home without deleting or editing the preserved RelationField component.
- Condensed chapter 01 around the owner-supplied research question and two focused paragraphs covering textual transformation, paraphrase, adaptation, obfuscation, allusion, historical variation, and retrieval after lexical overlap weakens.
- Moved the existing simplified Milton–Shelley TransformationSequence ahead of ResearchArchitecture and added an optional chapter index prop so Home labels it as chapter 02 without changing its presentation on Research.
- Renumbered ResearchArchitecture as chapter 03 and reframed its short introduction as the research response to the transformation problem.
- Combined the latest three featured updates, the completed Nimbus/inTrusted secondary research experience, and links to Research, Publications, Talks, and Experience into one compact chapter 04 exit surface.
- Added restrained `NEXT` links from Position to Transformation, Transformation to Architecture, and Architecture to Now.
- Added an accessible desktop chapter rail with exactly `00 INTRO`, `01 POSITION`, `02 TRANSFORMATION`, `03 ARCHITECTURE`, and `04 NOW`; its current location follows section intersection and ordinary hash links remain keyboard operable.
- Applied native CSS `scroll-snap-type: y proximity` to the homepage chapters, with no wheel/touch interception or scroll hijacking; reduced-motion mode disables snapping and inherits non-smooth scrolling.
- Kept the rail out of narrower layouts and preserved a one-column mobile narrative.

**Validation:**
- `npm run build`: 36 source files checked with zero errors, warnings, or hints; all 14 static routes generated.
- Generated HTML places the five required IDs in the specified order, contains exactly three featured updates, and has no RelationField markup or OGL reference.
- The generated homepage now contains two `client:visible` islands instead of three; the prior RelationField and OGL chunks are absent from the output bundle.
- Chrome checks at 1440, 820, and 390 px found no page-level horizontal overflow; the tablet portrait does not overlap the profile links, and the mobile hero, Now grid, and exit links collapse to one column.
- Desktop rail activation followed direct scrolling and hash navigation for every chapter; a rail click landed the selected chapter at the viewport boundary and updated `aria-current="location"`.
- Reduced-motion emulation reported no scroll snapping, automatic rather than smooth scrolling, and effectively disabled rail transitions.
- Visual inspection covered the desktop Identity, Research Position, and Now chapters plus the complete mobile identity hero.
- Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 0.4 s.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.7 s.
- Both Lighthouse reports are valid; the CLI additionally emitted a Lantern `NO_LCP` diagnostic despite recording LCP values, followed by the known Windows EPERM temporary-profile cleanup warning.

**Deployment:**
- The owner explicitly authorised the completed homepage correction to be committed and pushed after reviewing the local result.
- Created the annotated rollback tag `pre-homepage-ia-correction-2026-09-12` at the exact pre-pass commit, `a40b75d`.
- Recorded the implementation and validation in one atomic commit and pushed `main` plus the rollback tag to origin.

**Not done / future:**
- RelationField was not moved to Research because the owner requested a focused homepage correction and its current deeper purpose there was optional rather than required.
- No research record, publication status, route, dependency, or non-homepage information architecture was changed.

**Risks:**
- The desktop chapter rail intentionally hides at 1360 px and below to protect the content column; chapter-to-chapter `NEXT` links remain available at every width.

---

### Session 13 — 2026-09-14 — Codex

**Scope:** Interpret the four supplied homepage design references within the approved five-chapter Astro architecture and prepare a local review package

**Done locally:**
- Preserved the fixed `#intro` → `#position` → `#transformation` → `#architecture` → `#now` narrative, the current stack, all routes, and all factual research content.
- Added the reusable `NextChapter.astro` component and used real anchor links after Identity, Position, Transformation, and Architecture.
- Refined Identity proportions without adding decorative graphics or returning RelationField; the desktop remains quiet and editorial, while the complete mobile chapter now includes its portrait and continuation cue.
- Rebalanced Research Position typography for desktop, laptop-height, tablet, and mobile contexts; the supplied central question remains unchanged and occupies seven lines at all tested phone widths.
- Simplified the homepage Transformation opening around the two primary Milton/current-state panels, defaulted Home to Paraphrase, kept one stage explanation and exactly two qualitative cues, and retained the advanced D3 relation model behind a closed native disclosure.
- Kept stages 02–04 labelled as constructed demonstrations and stage 05 as the Mary Shelley / *Frankenstein* payoff; no invented numeric research claims were added.
- Made the D3 architecture pipeline more compact on desktop and added non-colliding multiline object labels; at 800 px and below it becomes a readable vertical object/operation flow rather than a squeezed SVG.
- Kept the chapter rail secondary and desktop-only, native proximity snapping on desktop/tablet, no mobile snapping, `client:visible` islands, and no RelationField/OGL homepage payload.
- Generated 20 local PNG review screenshots: all five chapters at 1440×900, 1024×768, 768×1024, and 390×844 under `C:/Users/sup3r/.codex/review/homepage-2026-09-14/`.

**Validation:**
- `npm run build`: 37 source files checked with zero errors, warnings, or hints; all 14 static routes generated successfully.
- Local production preview ran successfully at `http://127.0.0.1:4321/`.
- Explicitly audited all ten requested viewports: 1440×900, 1366×768, 1280×800, 1024×768, 820×1180, 768×1024, 430×932, 390×844, 375×812, and 360×800.
- Every viewport reported zero page-level horizontal overflow, visible section overflow rather than clipping, exact anchor alignment, no portrait collision, three homepage updates, and the Paraphrase default state.
- Desktop comparison panels remain side by side; phone panels stack; the phone stage selector scrolls only on its own horizontal axis; Architecture changes from horizontal to vertical at 800 px.
- Keyboard End selected and focused ALLUSION, changed the destination to Mary Shelley, and exposed the Shelley quotation. Space opened the native advanced-model disclosure while retaining focus.
- Reduced-motion mode disabled page snapping, hid the animated active panel/stage controller, and displayed all five transformation states statically.
- Deferred JavaScript changed from 198,356 raw / 74,590 gzip bytes to 199,451 raw / 74,786 gzip bytes: +1,095 raw / +196 gzip bytes. No dependency was added.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.7 s, CLS 0.004.
- Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 0.4 s, CLS 0.003.
- Lighthouse reports are valid; the CLI emitted the known Windows temporary-profile EPERM cleanup warning and, on desktop, a non-fatal Lantern `NO_LCP` diagnostic despite recording the LCP value.

**Deployment:**
- Nothing was committed, tagged, or pushed. `HEAD` and `origin/main` remain at deployed baseline `dc1c0a4` until the owner reviews the screenshots and explicitly approves deployment.

**Risks / review notes:**
- Transformation and the mobile Architecture/Now chapters intentionally exceed one viewport so no content is clipped merely to imitate slides.
- The intermediate transformation passages remain illustrative constructions; the historical-anchor disclosure remains visible.

---

### Session 14 — 2026-09-14 — Codex

**Scope:** Match the supplied homepage screen references as closely as possible while replacing the long-scroll chapter document with explicit page navigation

**Done locally:**
- Split the five-part homepage narrative into five static Astro routes: `/`, `/position/`, `/transformation/`, `/architecture/`, and `/now/`.
- Added typed shared chapter metadata plus a dedicated `HomeChapterLayout` so screen numbering, labels, active state, and route destinations stay consistent.
- Replaced the IntersectionObserver/hash-only rail with real page links and `aria-current` states. Desktop uses the fixed right rail, tablet uses a fixed compact five-number navigator, and mobile exposes all five routes inside the sticky header menu.
- Added ordinary `NEXT` route links to the first four screens, preserving native browser history and keyboard navigation rather than intercepting wheel or touch input.
- Preserved compatibility for old homepage chapter hashes by redirecting `/#position`, `/#transformation`, `/#architecture`, and `/#now` to their canonical routes.
- Matched the supplied screen compositions across Identity, Position, Transformation, Architecture, and Now, including the large editorial type, strict dark palette, restrained amber/indigo accents, right-side rail gutter, compact transformation selector, two-panel comparison, and split research-pipeline composition.
- Kept the Identity route free of client JavaScript. Retained the established Svelte/D3 research pipeline and Svelte/GSAP textual transformation on their relevant routes with `client:visible`, without adding libraries or fabricated quantitative claims.
- Preserved the richer transformation model on the Research page while keeping the routed homepage demonstration focused on the supplied reference.
- Reduced the phone Transformation screen to the requested complete comparison: the Milton source, the active transformed passage, the horizontally scrollable five-stage selector, and one live explanatory sentence. Hid the relation spine, categorical status block, and Next footer at phone widths so the route fits within one viewport.
- Rebalanced the phone Transformation typography by reducing display-heading dominance and raising micro-label, source metadata, and stage-selector sizes to a more legible middle register.
- Restored the visible `NEXT — RESEARCH ARCHITECTURE` control on the phone Transformation screen; it remains fully inside the viewport down to 360×800, including for the longer Obfuscation and Allusion explanations.
- Replaced the horizontally scrolling phone stage strip with five equal-width native buttons. All labels are visible simultaneously at a 45-degree angle, the interface explicitly says “Choose a stage to transform the passage,” and the active button has a distinct background/dot treatment.
- Reduced oversized display typography across the shared site scale and all five routed homepage compositions, including Identity, Position, Transformation, Architecture, Now, generic page headers, notes, prose headings, and the global footer. Supporting body copy and metadata retain their readable middle register.
- Contained GSAP token fragments within the responsive passage panel so changing states cannot create transient document overflow.
- Generated 25 final PNG screenshots and five contact sheets at 1920×1080, 1440×900, 1024×768, 768×1024, and 390×844 under `C:/Users/sup3r/.codex/review/homepage-routed-2026-09-14/`.

**Validation:**
- `npm run build`: 43 source files checked with zero errors, warnings, or hints; all 18 static routes generated successfully.
- Local production preview runs at `http://127.0.0.1:4321/`.
- Audited all five routes at ten viewports: 1440×900, 1366×768, 1280×800, 1024×768, 820×1180, 768×1024, 430×932, 390×844, 375×812, and 360×800. All 50 cases have one H1, no page-level horizontal overflow, and the expected responsive route navigation.
- Verified the mobile menu opens and displays all five chapter links; the tablet navigator is fixed and marks the active route; route clicks preserve native URL/history behaviour.
- Verified keyboard End selection reaches and focuses ALLUSION, displays the Shelley destination, and preserves the correct quotation.
- Verified reduced-motion mode displays all five transformation states statically with no animated passage and no horizontal overflow.
- Verified every transformation state at 430×932, 390×844, 375×812, and 360×800. In all 20 cases, document width and height exactly match the viewport; both passages, the stage selector, and the longest explanatory sentence remain visible on the same screen.
- Verified the revised stage control has equal client/scroll widths at all four phone sizes, confirming there is no horizontal scroll container, and confirmed the visible Next control resolves to `/architecture/`.
- Ran a broader post-typography regression audit across 16 routes at six desktop/mobile viewports (96 cases): zero horizontal-overflow or H1-count failures.
- Verified the old `/#architecture` URL redirects to `/architecture/` without retaining the hash.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.1 s, LCP 1.2 s, CLS 0.004.
- Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.3 s, LCP 0.4 s, CLS 0.003.
- Final built JavaScript across all lazy route chunks is 199,786 raw / 74,987 gzip bytes; the Identity route itself has no hydrated island.

**Deployment:**
- Nothing was committed, tagged, or pushed. `HEAD` and `origin/main` remain at deployed baseline `dc1c0a4` pending owner review of the routed screenshot package.

**Risks / review notes:**
- Mobile Architecture and Activity can scroll within their individual route where the content cannot fit legibly in one phone viewport; Transformation now fits its complete interactive comparison in one phone viewport. Page-to-page navigation stays immediately available from the sticky menu and the site is no longer one continuous homepage scroll.
- The intermediate transformation passages remain clearly identified as constructed demonstrations, and the Milton/Shelley historical anchors remain intact.

---

### Session 15 — 2026-09-15 — Codex

**Scope:** Reduce directory-page scrolling, replace the responsive Architecture diagram with an abstract layered research pipeline, remove redundant/name-specific public references, and add a persistent landing-page toolchain animation

**Done locally:**
- Removed the redundant Research item from the primary navigation and the Now-page continuation grid while preserving `/research/` as a compatibility/deep-research route.
- Removed the named collaborator from the public Nimbus secondment copy in project/publication data; the work is now described without attributing it to an individual.
- Added a compact layout mode to the shared page shell and applied it to Publications, Talks, Experience, and Notes. Desktop records now use denser two-column layouts where appropriate, while optional summaries, talk descriptions, and responsibility lists use accessible native `details` disclosures.
- Reduced final page heights at 1920×1080 / 390×844 from 3322 / 4731 to 2682 / 3420 px for Publications, 2884 / 3565 to 2410 / 2873 px for Talks, and 5350 / 7730 to 4119 / 5572 px for Experience. Notes now renders at 1189 / 1161 px.
- Replaced the responsive Architecture flow with six D3-calculated ascending planes for TEXTS, REPRESENTATIONS, CANDIDATE SPACE, RANKED RELATIONS, EVIDENCE, and VISUAL EXPLORATION. The component uses abstract points and signals only; no Milton, Shelley, or other literary example appears in the Architecture visualisation.
- Kept each Architecture layer keyboard-focusable/clickable with one concise live readout, a restrained upward entrance, and a fully static reduced-motion mode.
- Added a landscape-laptop split composition so Architecture fits one viewport at 1180×820 and 1024×768 as well as large desktop, tablet, and tested phone sizes.
- Added `ToolOrbit.svelte` to the Identity route. D3 `scalePoint` distributes a concise tool inventory drawn from the existing Experience data and its timing; desktop uses two persistent, slow orbital paths and phones use two compact counter-moving tracks around REPRESENT / RETRIEVE / JUDGE / EXPLORE.
- Reduced the landing name scale so the toolchain has visual presence without competing with the research statement. Reduced-motion mode presents all eight tools in a static two-row grid.
- Refreshed 25 five-route screenshots plus five contact sheets under `C:/Users/sup3r/.codex/review/homepage-routed-2026-09-14/`, and eight compact-directory screenshots plus two contact sheets under `C:/Users/sup3r/.codex/review/compact-pages-2026-09-14/`.

**Validation:**
- `npm run build`: 43 source files checked with zero errors, warnings, or hints; all 18 static routes generated successfully.
- Final 18-route × 6-viewport regression audit: 108/108 cases have exactly one H1 and no page-level horizontal overflow.
- Architecture document height equals the viewport at 1180×820, 1024×768, 820×1180, 768×1024, 390×844, and 360×800; the Next control remains visible.
- Identity document height equals the viewport at 1920×1080, 390×844, and 360×800. Phone tool tracks stay within the page bounds and the Next control remains visible.
- Reduced-motion emulation at 390×844 reports `animation-name: none` for every tool, displays all eight labels, has no horizontal overflow, and remains exactly one viewport tall.
- Landing Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.5 s, LCP 1.7 s, CLS 0.001, TBT 0 ms.
- Landing Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP/LCP 0.4 s, CLS 0, TBT 0 ms.
- Architecture Lighthouse mobile remains Performance 99, Accessibility 100, Best Practices 100, SEO 100.

**Deployment:**
- The owner explicitly authorised the complete reviewed pass to be committed and pushed.
- Created the annotated rollback tag `pre-routed-home-toolchain-2026-09-15` at the exact pre-pass commit, `dc1c0a4`.
- Included the implementation, validation record, and rollback documentation in one detailed deployment commit and pushed `main` plus the rollback tag to origin.

**Risks / review notes:**
- The landing toolchain is a concise selection from the existing methods/skills inventory, not an exhaustive software list.
- Historical Session 14 notes describe the state at that checkpoint; Session 15 supersedes its statements about the Identity route having no island and mobile Architecture requiring scroll.

---

### Session 16 — 2026-09-15 — Codex

**Scope:** Replace the landing-page orbit with a cinematic, semantically causal observatory sequence and resolve visual/document overflow.

**Done locally:**
- Replaced the Identity route's mounted `ToolOrbit` with a new `SemanticObservatory.svelte` client island; the deployed `ToolOrbit.svelte` source remains preserved and unchanged.
- Built one continuous 14.15-second loop: archival Milton/Shelley fragments enter, words become a semantic field, retrieval highlights candidates, judgement reveals clusters and decays weak evidence, exploration resolves an interpretable relation map, and the final statement appears beside it.
- Used D3 to generate deterministic clustered coordinates, Delaunay neighbourhood links, curved retrieval paths, cluster extents, and the final force-laid relation map.
- Used dynamically imported GSAP only for the cinematic state transitions. After Represent establishes the coordinates, the semantic points remain fixed; highlight, decay, cluster contours, restrained pan, and zoom perform the later analytical stages.
- Added three translucent depth planes and connecting struts so Represent constructs a restrained three-dimensional semantic space without adding another library or using decorative random particles.
- Corrected GSAP/SVG transform composition by separating static-position wrappers from animated groups. This keeps both quotation cards inside the frame and restores the complete final statement.
- Removed lingering retrieval/judgement artefacts before Explore and separated the final network from the concluding copy.
- Repositioned the portrait on phone layouts so it no longer overlaps the observatory or Next control.
- Added a compact 801–900 px two-column composition, eliminating the 820 px horizontal overflow while keeping the route one viewport tall at the tested tablet sizes.
- Kept the complete static final state for `prefers-reduced-motion`; GSAP is not requested in that mode.

**Validation:**
- `npm run build`: 43 source files checked with zero errors, warnings, or hints; all 18 routes generated.
- Captured and visually inspected every timed desktop phase plus mobile Represent, Judge, Relation Space, and reduced-motion states under `C:/Users/sup3r/.codex/review/semantic-observatory-2026-09-15/`.
- Verified the loop returns to TEXTS after 14.15 seconds and that the complete quotation and final statement remain within the SVG frame.
- Breakpoint checks at 1920×1080, 1440×900, 1180×820, 1024×768, 901×820, 900×820, 820×1180, 820×820, 801×800, 768×1024, 430×932, 390×844, and 360×800 found no horizontal overflow. The canonical 1920, 820, 768, 430, 390, and 360 layouts remain exactly one viewport tall.
- At 390×844, both animated and reduced-motion layouts are exactly one viewport with the portrait, observatory, and Next control separated. At 360×800 the same holds.
- Reduced-motion checks confirmed the stable final relation state and that no GSAP resource is loaded.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.6 s, LCP 1.7 s, CLS 0.001, TBT 20 ms.
- Lighthouse desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP/LCP 0.4 s, CLS 0, TBT 0 ms.
- Both Lighthouse reports were written successfully; the CLI emitted only the known Windows EPERM temporary-profile cleanup warning.

**Deployment:**
- The owner explicitly authorised the completed and reviewed pass to be committed and pushed.
- Created annotated rollback tag `pre-semantic-observatory-2026-09-15` at the exact pre-pass commit, `fd39ffe8366575657e8c818cffdab4442eae7bcd`.
- Committed only the finished observatory implementation, Identity integration, and handoff record; the unused untracked prototype was not included.
- Pushed `main` and the rollback tag to origin for GitHub Pages deployment.

**Risks / review notes:**
- `src/components/home/MethodPipeline.svelte` is an unused untracked intermediate prototype. It is not imported or built; standing instructions require owner confirmation before deleting source files.
- The observatory uses the owner-supplied Milton/Shelley demonstration and qualitative research operations; it introduces no experimental measurements or quantitative claims.

---

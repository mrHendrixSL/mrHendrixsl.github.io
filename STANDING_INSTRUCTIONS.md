---
name: STANDING_INSTRUCTIONS
type: operational
last_updated: 2026-09-12
---

# Standing Instructions — mrHendrixSL.github.io

These rules apply to every session, every agent, without exception.

---

## Safety Rules

1. **Never push to git** without an explicit instruction in the current session.

2. **Never delete or overwrite source files** without user confirmation.

3. **Always check git status before making edits.** Report unexpected state before proceeding.

4. **Update `AGENT_HANDOFF.md` after completing work.** Record what was done, what was not done, any new risks.

5. **Do not invent content.** All biographical details, paper titles, dates, and collaborator names must come from the user or existing files — never guessed.

---

## Workflow Rules

- Read `AGENT_HANDOFF.md` before starting any session — the snapshot section is always up to date
- The production site is **Astro static output on GitHub Pages**, deployed through `.github/workflows/deploy.yml`; run `npm run build` before any authorised push
- Canonical pages live under `src/pages/` and use `src/layouts/BaseLayout.astro`; the preserved root Jekyll files are rollback source, not the production implementation
- **Never add ad hoc navigation lists inside page content** — primary navigation is centralised in `src/components/layout/Navigation.astro`; the homepage profile links are the intended exception
- CSS variables are defined in `src/styles/tokens.css`; component-specific CSS stays scoped with its component

---

## Content Rules

- **WIP papers** — label clearly as `Work in Progress`; do not describe methodology in more detail than the owner has approved
- **Dates** — always use absolute dates (e.g. `Apr 2026`) not relative ones ("recently", "last month")
- **Collaborator names** — only name people the owner has explicitly mentioned
- **Unpublished findings / numbers** — do not include specific results or data from unpublished papers
- **Research status** — do not conflate conference presentations, abstracts, proceedings papers, datasets, and works in progress; status must match the underlying source
- **Official titles** — preserve exact publication, presentation, project, and course titles unless the owner confirms a correction

---

## Site Architecture

- Framework/config: `astro.config.mjs` — static output at the GitHub user-site root
- Layouts: `src/layouts/` — base page and editorial Note shells
- Pages: `src/pages/` — canonical routes plus compatibility redirects
- Components: `src/components/` — static Astro components and scoped Svelte client islands
- Structured data: `src/data/` — profile, updates, publications, talks, projects, and experience
- Notes: `src/content/notes/` with schema in `src/content.config.ts`
- Styles: `src/styles/` plus component-scoped styles
- Public assets: `public/assets/`; original Jekyll-era source remains under root `assets/`
- Deployment: `.github/workflows/deploy.yml`; generated `dist/`, `.astro/`, and `node_modules/` must remain ignored
- Rollback: `MIGRATION_ROLLBACK.md` and tag `pre-astro-migration-2026-09-12`

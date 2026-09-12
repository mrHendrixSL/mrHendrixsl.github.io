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
- The site is **Jekyll on GitHub Pages** — push to `main` and it auto-deploys; no build step needed
- All pages must have `layout: default` front matter
- **Never add ad hoc navigation lists inside page content** — navigation is centralised in `_layouts/default.html`; the owner-approved homepage hero profile links (including CV and Notes) are the only current exception
- CSS variables are defined in `:root` in `assets/css/style.css` — use them; do not hardcode hex colours

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

- Layout: `_layouts/default.html` — single layout, all pages
- Styles: `assets/css/style.css` — nocturnal editorial research environment, CSS custom properties
- Config: `_config.yml` — `theme:` line is commented out; custom layout is active
- No Gemfile required — GitHub Pages handles Jekyll

## CSS Classes Quick Reference

| Class | Use |
|---|---|
| `.hero` | Home page identity and relation-map field |
| `.editorial-section` | Numbered homepage editorial section |
| `.recent-section` | Lightweight Recent timeline |
| `.news-item` | Single Recent timeline row |
| `.research-programme` | Four-stage doctoral research spine |
| `.secondary-strand` | Secondary research-experience block |
| `.pub-entry` | Publication block |
| `.exp-entry` | Timeline experience entry |
| `.section-label` | Small uppercase section divider |
| `.badge-published` | Indigo — published work |
| `.badge-accepted` | Neutral — accepted work |
| `.badge-wip` | Amber — work in progress |
| `.tag` | Lightweight metadata term |
| `.skills` | Flex row of `.tag` items |

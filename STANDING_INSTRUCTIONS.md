---
name: STANDING_INSTRUCTIONS
type: operational
last_updated: 2026-05-19
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
- **Never add manual nav links inside page content** — navigation is centralised in `_layouts/default.html`
- CSS variables are defined in `:root` in `assets/css/style.css` — use them; do not hardcode hex colours

---

## Content Rules

- **WIP papers** — label clearly as `Work in Progress`; do not describe methodology in more detail than the owner has approved
- **Dates** — always use absolute dates (e.g. `Apr 2026`) not relative ones ("recently", "last month")
- **Collaborator names** — only name people the owner has explicitly mentioned
- **Unpublished findings / numbers** — do not include specific results or data from unpublished papers

---

## Site Architecture

- Layout: `_layouts/default.html` — single layout, all pages
- Styles: `assets/css/style.css` — dark card theme, CSS custom properties
- Config: `_config.yml` — `theme:` line is commented out; custom layout is active
- No Gemfile required — GitHub Pages handles Jekyll

## CSS Classes Quick Reference

| Class | Use |
|---|---|
| `.hero` | Home page header block |
| `.news-strip` | Recent updates strip |
| `.news-item` | Single update row (date + text) |
| `.card-grid` | CSS grid of cards |
| `.card` | Individual card |
| `.pub-entry` | Publication block |
| `.exp-entry` | Timeline experience entry |
| `.section-label` | Small uppercase section divider |
| `.badge-published` | Blue — published work |
| `.badge-accepted` | Green — accepted work |
| `.badge-wip` | Amber — work in progress |
| `.tag` | Mono pill tag |
| `.skills` | Flex row of `.tag` items |

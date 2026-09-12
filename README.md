# mrHendrixSL.github.io

Source for Rasika Edirisinghe's academic website at [mrHendrixSL.github.io](https://mrhendrixsl.github.io).

The new implementation uses Astro for static generation, Svelte client islands for the three interactive research components, D3 for conceptual mapping, GSAP for the controlled transformation sequence, and one lazy OGL layer for shallow semantic depth. Publications, talks, updates, profile information, and experience are maintained as typed data under `src/data/`; notes use an Astro MDX content collection.

The prior Jekyll site remains preserved in the root Markdown files, `_layouts/`, `_posts/`, `_config.yml`, and `assets/` as a rollback source. The production Astro source lives in `src/`, with static public assets under `public/`.

## Local development

```sh
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` first runs `astro check`, then writes the static site to `dist/`. The deployment workflow publishes this static output at the user-site root through GitHub Pages Actions. See `MIGRATION_ROLLBACK.md` for the recovery procedure.

## Deferred Relation Lab

The site remains a static multi-page build, with browser-only interaction isolated behind Svelte hydration boundaries. A future `/lab/` can therefore be added as another lazy client island under `src/components/lab/`, with Transformers.js or ONNX Runtime Web imported only inside that island. No model runtime is installed now, and a future implementation must keep submitted text in the browser.

Visual identity assets live in `assets/img/` and are mirrored to `public/assets/img/` for Astro. `favicon.svg` and the maintainable `social-preview.svg` relation-field artwork belong to the design system; `social-preview.png` is the 1200 × 630 social-card export. `headshot-240.jpg` and `headshot-480.jpg` are responsive web derivatives of the preserved high-resolution `headshot.jpg` source.

The CV source is `cv_source/cv.tex`. Its public distributable is `assets/Rasika_Edirisinghe-CV.pdf`; transient LaTeX build output should not be committed.

Operational guidance for coding and editorial agents is recorded in `STANDING_INSTRUCTIONS.md` and `AGENT_HANDOFF.md`.

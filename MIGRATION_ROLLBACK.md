# Astro migration and rollback

The Astro implementation is being developed alongside the preserved Jekyll source. The root Markdown files, `_layouts/`, `_posts/`, `_config.yml`, and original `assets/` directory remain intact so that the previous site is still recoverable.

## Deployment switch

The Astro build is static and targets the user-site root `https://mrhendrixsl.github.io/`. The workflow in `.github/workflows/deploy.yml` follows Astro's GitHub Pages deployment pattern: it checks out the repository, uses the lockfile to install dependencies, builds and uploads `dist/`, then deploys that artifact.

The workflow runs on pushes to `main`. Production Pages must use **Repository settings → Pages → Build and deployment → Source → GitHub Actions**.

## Rollback points

- `pre-astro-migration-2026-09-12` points to `1974f4b2a7e9f017d40b3c537ab759b52734fb0e`, the clean Jekyll site immediately before this migration.
- `pre-editorial-research-redesign-2026-09-12` points to `9d83c1524bcf0144eb8e829921ee34edf3363181`, the state before the previous editorial redesign.

The Astro rollback tag is published to origin with the migration so the baseline is available outside the local clone.

## Preferred recovery after a migration commit

Use a new revert commit rather than rewriting shared history:

```sh
git revert <astro-migration-commit>
```

Review the revert locally. Only after explicit authorisation, push the revert and switch the Pages source back to **Deploy from a branch** (`main`, root) so GitHub Pages resumes the preserved Jekyll build.

For local inspection of the exact pre-migration tree without changing the active branch:

```sh
git worktree add ../mrhendrixsl-jekyll-rollback pre-astro-migration-2026-09-12
```

Do not use `git reset --hard` on an unreviewed or shared working tree.

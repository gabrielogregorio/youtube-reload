# CLAUDE.md - Youtube Reload

Rules and context for any agent that touches this project. Read it before editing. This folder is self-contained.

## What it is

A static React site, published on GitHub Pages, that shuffles a local song catalog into playlists. Likes, ignored songs
and the language stay in the browser. There is no account and no server.

## Stack

Node 24, pnpm 12, React 19, Redux Toolkit, Vite 8, Tailwind 4, TypeScript 6, Vitest 5, Cypress 16, Storybook 10.

## Commands

- `pnpm run check:all`: format, lint, unit with coverage, E2E, Lighthouse, RAM and CPU, Storybook.
- `pnpm run unit:coverage`: unit tests. Fails below 100%.
- `pnpm run e2e`: builds, then Cypress, Lighthouse and the resource monitor.
- `pnpm run e2e:storybook`: opens every story in a real browser, with axe.

Run what the change can break: lint for a config tweak, unit for logic, E2E for a flow, a route or the layout.

## Rules

- Code, comments, logs, docs and UI keys in English. UI text goes through `t('…')` with its line in
  `src/core/i18n/locales/ptBR.ts`, and a unit test fails when one is missing.
- `tsconfig.json` is the only place with path aliases. Vite reads them with `resolve.tsconfigPaths`.
- Every `button` has a `type`, also in the examples of the docs.
- Scripts are `.mts`, run directly by Node 24, with erasable syntax only.
- New components get a story in `src/stories` that uses the real thing.
- The memory limit of the site stays at 300 MB. When the check fails, find the cause, do not raise the limit.
- Tests never use the network. Fixtures keep the dimensions of the real images, because memory depends on them.
- Storage goes through `StorageService`, never directly. `localStorage.clear()` is forbidden in anything published,
  stories included. Details in `docs/security.md`.
- Each PR to `main` needs a new version in `package.json`: the merge creates the tag and the release.

## CI/CD

- Tests run on PRs to `main` and on the merge, with their own build. The merge also publishes the coverage report.
- `deploy.yml` publishes the site and `deploy-storybook.yml` publishes the Storybook. Neither one waits for the tests.
- Everything that publishes uses the `publish-pages` action, which tries again when `gh-pages` moved. A `concurrency`
  group does not work here: GitHub keeps one pending run per group and cancels the others.
- A cancelled `pages build and deployment` is normal after a merge. Only the last one counts.

## Traps already paid for

- Tailwind 4: CSS outside `@layer`, even inline in `index.html`, beats the utilities and removes padding and margin
  while every test stays green. Look at the screen after changing the CSS.
- The service worker hides `cy.clock` from the page, so the specs turn it off. They also fix the browser language.
- The PWA `navigateFallback` would take over `/preview/`, `/storybook/` and `/coverage/`, so they are on the denylist.
- pnpm 12 ignores `onlyBuiltDependencies`. Use `allowBuilds`, and test with `CI=true pnpm install --frozen-lockfile`.
- GitHub expressions: `condition && '' || '0'` is always `'0'`, because an empty string is false.
- The notifications backdrop is modal, so a spec must close the panel before clicking the page.
- A failing Storybook flow shows no error screen: the story ends as `finished` and only the console has the failure.
- The `github.io` origin is shared with every project of the account. A `localStorage.clear()` in a story erased the
  data of all of them, and no test of this repository could see it.
- A card shows 320x180. A bigger thumbnail adds 17 MB of memory per playlist.
- `vite preview` keeps a child alive when its wrapper dies. Check who owns a port before killing anything: other
  projects use 5556 too.

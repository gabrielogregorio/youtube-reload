# Changelog

What changed and **why**. Releases also get notes on GitHub (`create-tag-and-release.yml`).

## 5.1.0 - 2026-10-31

- Opening the notifications blurs and tints the page behind them, and clicking the bell again now closes the panel
  instead of reopening it.
- The Storybook and the coverage report are published with the site, and the service worker leaves those paths alone.
- `tsconfig.json` is the only place that declares path aliases. Vite reads it, and the aliases that pointed to missing
  folders are gone.
- The E2E run now uses the site in a real Chrome and reads RAM and CPU from the system, failing above 300 MB of site
  memory.
- The license is now MIT, like the other projects.

## 5.0.0 - 2026-10-31

### Everything up to date

Node 24, pnpm 12 and the latest major of every package, which took `pnpm audit` from 262 alerts to none in what ships
to the browser. Exceptions: TypeScript stays on 6 because typescript-eslint has no support for the Go compiler of
TypeScript 7, and `@types/node` follows Node 24.

- ESLint 10 with a flat config. `eslint-config-airbnb` is gone because it does not support ESLint 10; the project
  rules stayed.
- Tailwind 4 through its Vite plugin. Resets now live in `@layer base`: an unlayered rule beats every utility.
- `@cypress-audit/lighthouse` (stuck on Lighthouse 10) replaced by `scripts/lighthouse.mjs`; `pa11y`, whose test was
  skipped, and unused packages removed.
- Husky and commitlint removed.

### English code, two languages

The interface text moved to English and `src/core/i18n` adds live switching between English and Brazilian Portuguese,
including quotes, special dates, notifications and date formats.

### Fixed

- Accessibility: the accessible name of links and buttons now contains their visible text, and the notification
  bell announces how many are new.
- The pending "mark as viewed" timer was cleared on mount instead of on unmount.
- Previews now load their own assets instead of the production ones.
- The E2E specs depended on today's date, because the service worker hid the mocked clock from the page.

### Tests and CI

100% unit coverage enforced by thresholds, from 5 tests to 174. New CI following the devkit projects: actions pinned
to a hash, CodeQL, Dependabot and releases from `package.json`. The deploy now waits for the tests. The Codacy and
Bearer workflows were removed. ESLint runs only in CI with the project config, and `.codacy.yml` keeps Codacy's own
ESLint and Markdown checks out of the way.

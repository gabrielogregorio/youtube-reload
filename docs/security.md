# Security

`pnpm audit --prod` must stay clean: nothing with a known vulnerability ships to the browser.
The CI also fails on any high or critical alert in the tooling.

## Accepted risks

Accepted by alert id, so a new alert on the same package still counts. Review date: 2027-01-31.

| Alert | Package | Severity | Why it is accepted |
|---|---|---|---|
| [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) | `deepmerge` through `workbox-build` | low | No patched version exists. Runs only at build time over the project own config. |
| [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) | `minimatch` through ESLint and others | moderate | The fix is the major 11, which breaks `eslint-plugin-import-x`. Runs only during lint over patterns from this repository. |

## Dependency rules

- `pnpm-workspace.yaml` refuses versions published less than 3 days ago (`minimumReleaseAge`).
- Install scripts are blocked except for the packages in `allowBuilds`.
- Each entry in `overrides` keeps its reason next to it and goes away once the parent package updates.
- Actions are pinned to a commit hash, and `check-quality.yml` fails when one is not.

# Contributing

Thanks for helping. Bugs, ideas and questions go through the issue templates. Security problems go through
[docs/security.md](docs/security.md), never through a public issue.

## Set up

Follow [Set up on a new PC](README.md#set-up-on-a-new-pc) in the README.

## Make a change

1. Branch from `dev`, and open the PR to `main` when it is ready.
2. Write text in English inside `t('…')`, with its line in `src/core/i18n/locales/ptBR.ts`.
3. Add tests in the same PR, and a story in `src/stories` for a new component.
4. Bump `version` in `package.json`: the merge creates the tag and the release.
5. Run `pnpm run check:all` and look at the change on the screen, at phone and desktop widths.

## What CI requires

Lint, types and Prettier, 100% of unit coverage, Cypress, axe, Lighthouse, the 300 MB memory limit and every Storybook
story. By taking part you agree to the [code of conduct](CODE_OF_CONDUCT.md).

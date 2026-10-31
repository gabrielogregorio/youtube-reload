// Writes src/core/env.ts at build time. Values come from the environment, so a branch name
// or a secret never goes through a shell string.
import { readFileSync, writeFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('package.json', 'utf8'));

const envs = {
  VITE_ENVIRONMENT: process.env.VITE_ENVIRONMENT ?? '',
  TIME_BUILD: new Date().toISOString(),
  SENTRY_DSN: process.env.SENTRY_DSN ?? '',
  VERSION: version,
};

writeFileSync('src/core/env.ts', `export const envs = ${JSON.stringify(envs, undefined, 2)};\n`);

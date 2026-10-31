import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import js from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import canonicalVocabulary from 'eslint-plugin-canonical-vocabulary';
import cypress from 'eslint-plugin-cypress';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { flatConfigs as importConfigs } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import spellcheck from 'eslint-plugin-spellcheck';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const rootDirectory = dirname(fileURLToPath(import.meta.url));

const projectRules = {
  'canonical-vocabulary/canonical-vocabulary': [
    'error',
    [
      {
        words: ['Reboot', 'Recharge'],
        fixTo: 'reload',
        message: '🚨 Not use <word>, use <fixTo>. 😉',
      },
      {
        words: ['Enjoy', 'Admire', 'gostei', 'Appreciate', 'Approve', 'Prefer'],
        fixTo: 'like',
      },
      {
        words: ['NãoGostei', 'naoGostei', 'Disapprove', 'Hate', 'Detest', 'Loathe', 'Despise', 'Reject', 'Resent'],
        fixTo: 'Unlike',
      },
      {
        words: ['Tracklist', 'Mixtape', 'Setlist', 'Compilation', 'Queue', 'SongList', 'Album', 'ListaDeMusicas'],
        fixTo: 'playlist',
      },
    ],
  ],
  'spellcheck/spell-checker': [
    'warn',
    {
      comments: false,
      strings: false,
      templates: false,
      identifiers: true,
      lang: 'en_US',
      minLength: 3,
      skipWords: [
        'youtube',
        'enum',
        'unlikes',
        'checkbox',
        'fieldset',
        'readonly',
        'href',
        'bdd',
        'dsn',
        'integrations',
        'emojis',
        'axe',
        'Sao',
        'Paulo',
        'Bundler',
        'Esbuild',
        'Gmt',
        'unmount',
        'vite',
        'tailwindcss',
        'argv',
        'Dom',
        'globals',
      ],
    },
  ],
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react/require-default-props': ['error', { functions: 'defaultArguments' }],
  'react/function-component-definition': ['error', { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' }],
  'id-length': ['error', { min: 3, properties: 'never', exceptions: ['id', 'on', 'config', 't'] }],
  'max-lines': ['error', { max: 250, skipBlankLines: true, skipComments: true }],
  'max-depth': ['error', 3],
  'max-lines-per-function': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
  'max-params': ['error', { max: 4 }],
  'no-alert': 'error',
  'no-console': 'error',
  'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
  'sonarjs/pseudo-random': 'off',
  'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
  'import-x/no-unresolved': 'off',
  'import-x/named': 'off',
  'import-x/no-named-as-default-member': 'off',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/no-duplicate-enum-values': 'error',
  '@typescript-eslint/no-dynamic-delete': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-redeclare': 'error',
  '@typescript-eslint/consistent-type-assertions': 'error',
  '@typescript-eslint/consistent-type-definitions': 'error',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-useless-empty-export': 'error',
  '@typescript-eslint/ban-tslint-comment': 'error',
  '@typescript-eslint/no-unsafe-argument': 'error',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
  '@typescript-eslint/no-unnecessary-condition': 'error',
  '@typescript-eslint/no-unsafe-assignment': 'error',
  '@typescript-eslint/no-unsafe-call': 'error',
  '@typescript-eslint/explicit-member-accessibility': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/no-confusing-non-null-assertion': 'error',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/naming-convention': [
    'error',
    { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Za-z]', match: true } },
    { selector: 'enum', format: ['PascalCase'], custom: { regex: 'Enum$', match: true } },
  ],
};

export default tseslint.config(
  {
    ignores: [
      'node_modules',
      'build',
      'coverage',
      'storybook-static',
      'pnpm-lock.yaml',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      '.storybook',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importConfigs.recommended,
  importConfigs.typescript,
  sonarjs.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.ts', 'vite.config.mts'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.vitest },
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: rootDirectory, ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': reactHooks,
      'jsx-a11y': fixupPluginRules(jsxA11y),
      'canonical-vocabulary': fixupPluginRules(canonicalVocabulary),
      spellcheck: fixupPluginRules(spellcheck),
    },
    settings: {
      react: { version: '19' },
      'import-x/resolver-next': [createTypeScriptImportResolver()],
    },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      ...projectRules,
    },
  },
  {
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'no-magic-numbers': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/no-nested-functions': 'off',
    },
  },
  {
    files: ['cypress/**/*.ts'],
    ...cypress.configs.recommended,
    languageOptions: {
      ...cypress.configs.recommended.languageOptions,
      parserOptions: { project: './cypress/tsconfig.json', tsconfigRootDir: rootDirectory },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'off',
      'sonarjs/no-fixed-wait-in-tests': 'off',
      'sonarjs/no-empty-test-file': 'off',
      'sonarjs/no-duplicate-string': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  ...storybook.configs['flat/recommended'],
  {
    files: ['src/stories/**'],
    rules: { 'sonarjs/no-commented-code': 'off', 'react/prop-types': 'off' },
  },
  prettierRecommended,
);

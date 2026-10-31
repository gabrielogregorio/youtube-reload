import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

const baseUrl = process.env.VITE_BASE_PATH ?? '/youtube-reload/';

export default defineConfig(({ mode }) => {
  const isTest = mode === 'test';
  const isStorybook = process.argv.some((arg) => arg.includes('storybook'));

  const shouldUploadToSentry = Boolean(process.env.SENTRY_AUTH_TOKEN);

  return {
    root: '.',
    base: baseUrl,
    build: {
      outDir: 'build',
      sourcemap: true,
    },
    resolve: {
      tsconfigPaths: true,
    },

    plugins: [
      react(),
      !isTest && tailwindcss(),
      !isTest &&
        !isStorybook &&
        VitePWA({
          registerType: 'autoUpdate',

          injectRegister: 'auto',
          manifestFilename: 'manifest.webmanifest',

          // these paths are separate sites on the same domain, not routes of the app
          workbox: { navigateFallbackDenylist: [/\/preview\//, /\/storybook\//, /\/coverage\//] },

          includeAssets: ['favicon.ico', 'icon.png', 'icon-512x512.png'],

          manifest: {
            name: 'Youtube Reload',
            short_name: 'Youtube Reload',
            description: 'Discover plenty of songs you have never heard',

            theme_color: '#2d3036',
            background_color: '#2d3036',

            display: 'standalone',
            orientation: 'portrait',

            start_url: baseUrl,
            scope: baseUrl,

            icons: [
              {
                src: 'icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: 'icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
              },
              {
                src: 'icons/icon-maskable-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
              },
              {
                src: 'icons/icon-maskable-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
              },
            ],
          },
        }),
      !isTest &&
        !isStorybook &&
        shouldUploadToSentry &&
        sentryVitePlugin({
          org: 'gregorio-kg',
          project: 'youtube-reload',
          telemetry: false,
        }),
    ].filter(Boolean),
    test: {
      css: false,
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        reporter: ['text', 'json', 'html', 'lcov'],
        include: ['src/**/*.{ts,tsx}'],
        // entry point and test helpers run in the E2E; the stories are Storybook samples
        exclude: ['src/index.tsx', 'src/stories/**', 'src/core/utils/mockProviders.tsx', 'src/**/*.d.ts', 'src/**/*.{spec,test}.{ts,tsx}'],
        thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
      },
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
    },
  };
});

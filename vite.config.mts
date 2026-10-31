import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

const baseUrl = '/youtube-reload/';

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
      alias: {
        // bdd loader
        '@badeball/cypress-cucumber-preprocessor/*': resolve(
          __dirname,
          './node_modules/@badeball/cypress-cucumber-preprocessor/dist/subpath-entrypoints/*',
        ),

        // rest

        '@/layouts': resolve(import.meta.dirname, './src/components/layouts'),
        '@/screens': resolve(import.meta.dirname, './src/screens'),
        '@/templates': resolve(import.meta.dirname, './src/components/templates'),
        '@/widgets': resolve(import.meta.dirname, './src/components/widgets'),
        '@/screen': resolve(import.meta.dirname, './src/components/screen'),

        '@/mappers': resolve(import.meta.dirname, './src/core/mappers'),
        '@/configs': resolve(import.meta.dirname, './src/core/configs'),
        '@/connections': resolve(import.meta.dirname, './src/core/connections'),
        '@/constants': resolve(import.meta.dirname, './src/core/constants'),
        '@/contracts': resolve(import.meta.dirname, './src/core/contracts'),
        '@/helpers': resolve(import.meta.dirname, './src/core/helpers'),
        '@/data': resolve(import.meta.dirname, './src/core/data'),
        '@/errors': resolve(import.meta.dirname, './src/core/errors'),
        '@/guard': resolve(import.meta.dirname, './src/core/guard'),
        '@/hooks': resolve(import.meta.dirname, './src/core/hooks'),
        '@/facades': resolve(import.meta.dirname, './src/core/facades'),
        '@/locales': resolve(import.meta.dirname, './src/core/locales'),
        '@/services': resolve(import.meta.dirname, './src/core/services'),
        '@/utils': resolve(import.meta.dirname, './src/core/utils'),
        '@/core': resolve(import.meta.dirname, './src/core'),
        '@/features': resolve(import.meta.dirname, './src/features'),
        '@/modules': resolve(import.meta.dirname, './src/modules'),

        '@/mocks': resolve(import.meta.dirname, './src/mocks'),
        '@/pages': resolve(import.meta.dirname, './src/pages'),
      },
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

          includeAssets: ['favicon.ico', 'icon.png', 'icon-512x512.png'],

          manifest: {
            name: 'Youtube Reload',
            short_name: 'Youtube Reload',
            description: 'Discover plenty of songs you have never heard',

            theme_color: '#2d3036',
            background_color: '#2d3036',

            display: 'standalone',
            orientation: 'portrait',

            start_url: '/youtube-reload/',
            scope: '/youtube-reload/',

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
      },
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
    },
  };
});

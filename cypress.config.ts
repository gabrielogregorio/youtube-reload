import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

const loadBddConfig = async (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  // reference https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/step-definitions.md
  await addCucumberPreprocessorPlugin(on, config);

  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on('file:preprocessor', bundler);
};

const showCypressLogOnHeadlessMode = (on) => {
  on('task', {
    log(...message) {
      console.log(...message);
      return null;
    },
  });
};

async function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
  showCypressLogOnHeadlessMode(on);
  await loadBddConfig(on, config);

  return config;
}

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 5000,
  requestTimeout: 5000,
  responseTimeout: 5000,
  screenshotOnRunFailure: true,
  video: false,
  retries: 1,
  e2e: {
    setupNodeEvents,
    specPattern: ['cypress/e2e/bdd/*.feature', 'cypress/e2e/accessibility/*.{js,ts}', 'cypress/e2e/tests/*.{js,ts}'],
    baseUrl: 'http://127.0.0.1:5556/youtube-reload',
  },
});

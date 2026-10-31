import 'cypress-plugin-tab';
import 'cypress-real-events';

import './commands';

// The PWA service worker serves index.html from its cache, which skips the script Cypress
// injects and leaves cy.clock without effect on the page.
Cypress.on('window:before:load', (win) => {
  delete Object.getPrototypeOf(win.navigator).serviceWorker;
});

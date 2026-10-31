import 'cypress-plugin-tab';
import 'cypress-real-events';

import './commands';

// The PWA service worker serves index.html from its cache, which skips the script Cypress
// injects and leaves cy.clock without effect on the page.
// The app follows the browser language, so the machine locale must not change the tests.
Cypress.on('window:before:load', (win) => {
  delete Object.getPrototypeOf(win.navigator).serviceWorker;
  Object.defineProperty(win.navigator, 'language', { value: 'en-US' });
});

// The specs must not depend on the network or on which thumbnails the playlist drew.
beforeEach(() => {
  cy.intercept('GET', 'https://img.youtube.com/vi/*/mqdefault.jpg', { fixture: 'thumbnail-320x180.jpg,null' });
  cy.intercept('GET', 'https://img.youtube.com/vi/*/hqdefault.jpg', { fixture: 'thumbnail-480x360.jpg,null' });
});

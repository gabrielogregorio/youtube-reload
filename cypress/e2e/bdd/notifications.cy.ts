import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is logged in to the website', () => {
  cy.visit('/');
  cy.clock();
});

When('the user clicks on the notifications icon', (text: string) => {
  cy.get('div[aria-label="Notifications"]').should('not.exist');
  cy.get('button[id="open-notify"]').click();
});

Then('the notifications dropdown should open', () => {
  cy.get('div[aria-label="Notifications"]').should('exist').should('be.visible');
  cy.get('h3:contains("Notificações")').should('exist').should('be.visible');
});

Then('the user should see a list of their notifications after {string} ms', (timeInMs: string) => {
  cy.window().then((win) => {
    const notifications = JSON.parse(win.localStorage.getItem('notify') || '');
    expect(notifications).to.be.an('array').that.is.empty;
  });

  cy.tick(Number(timeInMs));

  cy.window().then((win) => {
    const notifications = JSON.parse(win.localStorage.getItem('notify') || '');
    expect(notifications).to.be.an('array').that.is.not.empty;
    expect(notifications.every((item) => typeof item === 'number')).to.be.true;
  });
});

import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

Given('the user are in date {string}', (isoDate: string) => {
  cy.clock(new Date(isoDate).getTime(), ['Date']);
  cy.log(new Date().toLocaleDateString(), isoDate);
});

When('open the page', () => {
  cy.visit('/');
});

Then('show title {string}', (title: string) => {
  cy.get(`h2:contains("${title}")`).should('exist').should('be.visible');
});

Then('show subtitle {string}', (subtitle: string) => {
  cy.get(`div:contains("${subtitle}")`).should('exist').should('be.visible');
});

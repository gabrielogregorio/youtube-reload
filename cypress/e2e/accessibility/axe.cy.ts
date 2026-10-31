/// <reference types="cypress" />

context('Axe Accessibility', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should validate screen with notify modal', () => {
    cy.get('button[id="open-notify"]').click();
    cy.get('h3:contains("Notifications")').should('be.visible');
    cy.wait(1000);

    cy.verifyAccessibilityAxeA11y({ root: '#root-react-youtube-reload-app', screensSizesToTest: [[1366, 768]] });
  });

  it('should validate home screen', () => {
    cy.get('button:contains("Generate Playlist")').should('be.visible');
    cy.wait(1000);

    cy.verifyAccessibilityAxeA11y({ root: '#root-react-youtube-reload-app' });
  });

  it('should validate likes screen', () => {
    cy.get('button:contains("Generate Playlist")').should('be.visible');
    cy.get('main button:contains("Like")').first().click();
    cy.get('nav button:contains("Likes")').first().click();
    cy.wait(1000);

    cy.verifyAccessibilityAxeA11y({ root: '#root-react-youtube-reload-app' });
  });

  it('should validate unlikes screen', () => {
    cy.get('button:contains("Generate Playlist")').should('be.visible');
    cy.get('main button:contains("Ignore")').first().click();
    cy.get('nav button:contains("UnLikes")').first().click();
    cy.wait(1000);

    cy.verifyAccessibilityAxeA11y({ root: '#root-react-youtube-reload-app' });
  });
});

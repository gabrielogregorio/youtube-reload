/// <reference types="cypress" />

context('<App /> ', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render app', () => {
    cy.get('button[id="open-notify"]').click();

    cy.get('h3:contains("Notifications")').should('exist');

    cy.get('h4:contains("Special quotes system created")').should('exist');

    cy.get('main button:contains("Like")').first().click();

    cy.get('nav button:contains("Likes")').first().click();

    cy.get('main li').should('have.length', 1);
  });

  it('should change the language and keep it after reloading', () => {
    cy.get('nav button:contains("Home")').should('exist');
    cy.get('html').should('have.attr', 'lang', 'en');

    cy.get('select[id="language-switcher"]').select('pt-BR');

    cy.get('nav button:contains("Início")').should('exist');
    cy.get('main button:contains("Gostei")').should('exist');
    cy.get('html').should('have.attr', 'lang', 'pt-BR');

    cy.reload();

    cy.get('nav button:contains("Início")').should('exist');
    cy.get('select[id="language-switcher"]').should('have.value', 'pt-BR');
  });
});

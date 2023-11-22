/* eslint-disable no-undef */

Cypress.Commands.add("getByData", (seletor) => {
  return cy.get(`[data-testid=${seletor}]`);
});

Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.getByData("loginUser").type(email);
    cy.getByData("loginPassword").type(password);
    cy.getByData("entrar").click();
  });
});

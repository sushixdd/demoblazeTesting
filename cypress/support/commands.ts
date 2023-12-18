Cypress.Commands.add("visitBaseUrl", () => {
  cy.clearLocalStorage();
  cy.intercept("GET", "/entries").as("getEntries");
  cy.visit(Cypress.env("baseUrl"));
  cy.wait("@getEntries");
});

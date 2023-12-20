describe("temp test to implement api login", () => {
  it("test the thing", () => {
    cy.apiLogin(Cypress.env("username"), Cypress.env("password"));
    cy.visit(`${Cypress.env("baseUrl")}`);
  });
});

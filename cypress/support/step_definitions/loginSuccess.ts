import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on landing page with login form opened", () => {
  cy.visitBaseUrl();
  cy.get("#login2").click();
});
When("I send login form with correct credentials", () => {
  cy.get("#loginusername").type(Cypress.env("username"));
  cy.get("#loginpassword").type(Cypress.env("password"));
  cy.intercept("POST", "/login").as("postLogin");
  cy.intercept("GET", "/entries").as("getEntries");
  cy.get('button[onclick="logIn()"]').click();
  cy.wait("@postLogin");
  cy.wait("@getEntries");
});
Then("I am logged in", () => {
  cy.get("#nameofuser")
    .should("exist")
    .and("contain", `Welcome ${Cypress.env("username")}`);
});

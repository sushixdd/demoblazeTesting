import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on landing page", () => {
  cy.visitBaseUrl();
});
When("I send login form with correct credentials", () => {
  cy.get('[id="login2"]').click();
  cy.get('input[id="loginusername"]').type(Cypress.env("username"));
  cy.get('input[id="loginpassword"]').type(Cypress.env("password"));
  cy.intercept("POST", "/login").as("postLogin");
  cy.intercept("GET", "/entries").as("getEntries");
  cy.get('button[onclick="logIn()"]').click();
  cy.wait("@postLogin");
  cy.wait("@getEntries");
});
Then("I am logged in", () => {
  cy.get('[id="nameofuser"]')
    .should("exist")
    .and("contain", `Welcome ${Cypress.env("username")}`);
});

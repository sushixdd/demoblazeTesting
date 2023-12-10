import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on landing page", () => {
  cy.visit("https://www.demoblaze.com/");
});
When("I send login form with correct credentials", () => {
  cy.get('[id="login2"]').click();
});
Then("I am logged in", () => {
  cy.contains("Username:");
});

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import Chance from "chance";

const chance = new Chance();
// not sure if this is ideal for signup testing, accepting feedback for improvement
const generatedUsername = `${Cypress.env("randomUsername")}${chance.string({
  length: 16,
  pool: "0123456789",
})}`;
const generatedPassword = chance.string({
  length: 16,
  pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
});

Given("I am on landing page with signup form opened", () => {
  cy.visitBaseUrl();
  cy.get("#signin2").should("be.visible").click();
});
When("I fill with correct values and send signup form", () => {
  cy.intercept("POST", "/signup").as("postSignup");
  // magic to get around (uncaught exception)Error: Modal is transitioning
  // seems to be working after a few iterations - will address i'm proven wrong
  // not sure if the error is caused by cypress going way faster than user ever could
  // would normally raise this with dev team if it was my project
  cy.get("#signInModal")
    .should("have.class", "modal fade show")
    .then(() => {
      cy.get("#sign-username").should("exist").invoke("val", generatedUsername);
      cy.get("#sign-password").should("exist").invoke("val", generatedPassword);
      cy.get('.btn-primary[onclick="register()"]').should("be.visible").click();
    });
});
Then("new account is created", () => {
  cy.on("window:alert", (t) => {
    expect(t).to.contains("Sign up successful.");
  });
  cy.wait("@postSignup").its("response.statusCode").should("eq", 200);
  // it would make sense to test if we can access the account
  // could just paste manual login test, but that feels silly
  // would prefer to use api login for this, when (if) I can make it work
});

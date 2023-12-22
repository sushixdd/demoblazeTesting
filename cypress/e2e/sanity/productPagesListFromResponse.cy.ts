import { selectorCategories } from "../../testdata/selectors";
import { monitors } from "../../testdata/products/monitors";
import { phones } from "../../testdata/products/phones";
import { notebooks } from "../../testdata/products/notebooks";

// for legitimate eshop it would not be a good idea to implement such test, but based on my knowledge of this being a static site I think it's acceptable

describe("testing product list from request based on template", () => {
  beforeEach(() => {
    cy.visitBaseUrl();
  });
  it("test monitors", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/bycat`).as("postBycat");
    cy.get(selectorCategories.monitors).click();
    cy.wait("@postBycat").then((req) => {
      cy.assertProductProperties(monitors, req.response.body.Items);
    });
  });
  it("test laptops", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/bycat`).as("postBycat");
    cy.get(selectorCategories.notebooks).click();
    cy.wait("@postBycat").then((req) => {
      cy.assertProductProperties(notebooks, req.response.body.Items);
    });
  });
  it("test phones", () => {
    cy.intercept("POST", `${Cypress.env("apiUrl")}/bycat`).as("postBycat");
    cy.get(selectorCategories.phones).click();
    cy.wait("@postBycat").then((req) => {
      cy.assertProductProperties(phones, req.response.body.Items);
    });
  });
});

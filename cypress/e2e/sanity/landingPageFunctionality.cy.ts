import {
  stringNavbar,
  stringCategories,
  stringFooter,
} from "../../testdata/testData";
import {
  selectorsNavbar,
  selectorCategories,
  selectorFooter,
} from "../../testdata/selectors";

describe("basic sanity test of homepage", () => {
  beforeEach(() => {
    cy.visitBaseUrl();
  });
  it("assertion of navbar categories", () => {
    cy.assertVisibility(selectorsNavbar.signUp, true); // Signup
    cy.assertVisibility(selectorsNavbar.logIn, true); // Login
    cy.assertVisibility(selectorsNavbar.cart, true); // Cart
    cy.assertVisibility(selectorsNavbar.aboutUs, true); // About us
    cy.assertVisibility(selectorsNavbar.contact, true); // Contact
    cy.assertVisibility(selectorsNavbar.home, true); // selects two elements, not ideal, missing id
    cy.assertVisibility(selectorsNavbar.productStore, true); // top left string

    cy.assertContent(selectorsNavbar.signUp, stringNavbar.signUp); // Signup
    cy.assertContent(selectorsNavbar.logIn, stringNavbar.logIn); // Login
    cy.assertContent(selectorsNavbar.cart, stringNavbar.cart); // Cart
    cy.assertContent(selectorsNavbar.aboutUs, stringNavbar.aboutUs); // About us
    cy.assertContent(selectorsNavbar.contact, stringNavbar.contact); // Contact
    cy.assertContent(selectorsNavbar.home, stringNavbar.home); // selects two elements, not ideal, missing id
    cy.assertContent(selectorsNavbar.productStore, stringNavbar.productStore); // top left string

    cy.assertAttrib(selectorsNavbar.signUp, "data-target", "#signInModal"); // signup
    cy.assertAttrib(selectorsNavbar.logIn, "data-target", "#logInModal"); // login
    cy.assertAttrib(selectorsNavbar.cart, "href", "cart.html"); // Cart
    cy.assertAttrib(selectorsNavbar.aboutUs, "data-target", "#videoModal"); // About us
    cy.assertAttrib(selectorsNavbar.contact, "data-target", "#exampleModal"); // Contact
    cy.assertAttrib(selectorsNavbar.home, "href", "index.html"); // selects two elements, not ideal, missing id
    cy.assertAttrib(selectorsNavbar.productStore, "href", "index.html"); // top left string
  });
  it("assertion of categories", () => {
    cy.assertVisibility(selectorCategories.header, true); // categories header
    cy.assertVisibility(selectorCategories.monitors, true); // monitors
    cy.assertVisibility(selectorCategories.notebooks, true); // notebooks
    cy.assertVisibility(selectorCategories.phones, true); // phones

    cy.assertContent(selectorCategories.header, stringCategories.header); // categories header
    cy.assertContent(selectorCategories.phones, stringCategories.phones); // phones
    cy.assertContent(selectorCategories.notebooks, stringCategories.notebooks); // notebooks
    cy.assertContent(selectorCategories.monitors, stringCategories.monitors); // monitors
  });
  it("assertions of footer", () => {
    cy.assertVisibility(selectorFooter.footer, true);
    cy.get(selectorFooter.aboutUs).eq(0).should("be.visible");
    cy.get(selectorFooter.aboutUs).eq(1).should("be.visible"); // i admit the solution looks ugly, but it does the work
    cy.assertVisibility(selectorFooter.productStore, true);

    cy.assertContent(selectorFooter.aboutUs, stringFooter.aboutUs);
    // not ideal solution, missing tags for better targeting of DOM elements
    cy.get(selectorFooter.aboutUs)
      .siblings()
      .eq(0)
      .contains(stringFooter.aboutUsContent);
    cy.assertContent(selectorFooter.contact, stringFooter.contact);
    cy.assertContent(selectorFooter.footer, stringFooter.contactContentAdd);
    cy.assertContent(selectorFooter.footer, stringFooter.contactContentEmail);
    cy.assertContent(selectorFooter.footer, stringFooter.contactContentPhone);
    // not ideal solution, missing tags for better targeting of DOM elements
    cy.get(selectorFooter.productStore)
      .parents()
      .contains(stringFooter.productStore);
    cy.assertContent(selectorFooter.footerCopyright, stringFooter.copyright);

    // not 100% sure if asserting px dimensions is a good practice
    cy.assertAttrib(selectorFooter.productStore, "width", 50);
    cy.assertAttrib(selectorFooter.productStore, "height", 50);
  });
});

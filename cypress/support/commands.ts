Cypress.Commands.add("visitBaseUrl", () => {
  // cy.clearLocalStorage();
  cy.intercept("GET", "/entries").as("getEntries");
  cy.visit(Cypress.env("baseUrl"));
  cy.wait("@getEntries");
});
// just a scaffoling for generating and handling api token for api login, WIP
Cypress.Commands.add("apiLogin", (username: String, password: string) => {
  cy.request({
    url: `${Cypress.env("apiUrl")}/login`,
    method: "POST",
    form: true,
    body: {
      username,
      password,
    },
  }).then(({ body }) => {
    cy.log(body);
    // window.localStorage.setItem("authToken", body.token);
  });
});

// assertion of single attribute of given element
Cypress.Commands.add(
  "assertAttrib",
  (el: string, attrib: string, value: string) => {
    if (el && attrib && value) {
      cy.get(el).should("have.attr", attrib, value);
    }
  }
);

// assertion of visibility of given element
Cypress.Commands.add("assertVisibility", (el: string, bool: boolean) => {
  switch (bool) {
    case true:
      cy.get(el).should("be.visible");
      break;
    case false:
      cy.get(el).should("not.be.visible");
      break;
    default:
      throw new Error("ERROR in boolean handling logic.");
  }
});

// assertion of content of given element
Cypress.Commands.add("assertContent", (el: string, content: string) => {
  cy.get(el).should("contain", content);
});

Cypress.Commands.add(
  "assertProductProperties",
  (product: any[], responseItems: any[]) => {
    product.forEach((_, index) => {
      expect(responseItems[index].cat).to.equal(product[index].cat);
      expect(responseItems[index].desc).to.equal(product[index].desc);
      expect(responseItems[index].id).to.equal(product[index].id);
      expect(responseItems[index].img).to.equal(product[index].img);
      expect(responseItems[index].price).to.equal(product[index].price);
    });
  }
);

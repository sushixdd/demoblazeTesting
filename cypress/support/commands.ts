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

const baseUrl = "https://www.heroku.com";
const apiUrl = "https://restful-booker.herokuapp.com";

describe("test of auth endpoint", () => {
  it("try login", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username,
        password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const token = response.body.token;

      expect(token).to.exist;
      cy.log(token);
    });
  });
  it("create booking", () => {});
});

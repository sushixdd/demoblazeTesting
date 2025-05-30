// i'm fully aware of how messy this test looks
const baseUrl = "https://www.heroku.com";
const apiUrl = "https://restful-booker.herokuapp.com";

describe('test booking "flow"', () => {
  // declare temp variables to use during testing
  let createdBookingId: Number;
  let createdBookingName: string;
  let editedBookingName: string;
  let partialUpdate: Number;
  let authToken: string;

  const auth = () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username,
        password,
      },
    }).then(({ body }) => {
      authToken = body.token;
      cy.log(authToken);
    });
  };
  beforeEach(() => {
    //cy.clearAllCookies();
  });

  it("create a booking", () => {
    // create booking
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        firstname: "Blbec",
        lastname: "Blbej",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
      // handle response
    }).then((response) => {
      expect(response.status).to.eq(200);
      // for debugging purposes
      cy.log(response.body);
      // save our variables to use later
      createdBookingId = response.body.bookingid;
      createdBookingName = response.body.booking.firstname;
      // more debugging
      cy.log(String(createdBookingId));
      cy.log(createdBookingName);
    });
  });
  it("check created booking", () => {
    // request info of our just created booking
    cy.request({
      method: "GET",
      url: `https://restful-booker.herokuapp.com/booking/${createdBookingId}`,
    }).then((response) => {
      // check first name of our yielded request against first name of our created booking
      // not ideal, but should be enough for demonstration
      expect(response.body.firstname).to.equal(createdBookingName);
    });
  });
  it("update created booking", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username,
        password,
      },
    }).then(({ body }) => {
      authToken = body.token;
      cy.request({
        method: "PUT",
        url: `https://restful-booker.herokuapp.com/booking/${createdBookingId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${authToken}`,
        },
        body: {
          firstname: "Blbec",
          lastname: "Blbejsi",
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
            checkin: "2018-01-01",
            checkout: "2019-01-01",
          },
          additionalneeds: "Breakfast",
        },
      }).then((updateResp) => {
        // more debugging
        cy.log(updateResp.body);
        // this time we are changing last name
        editedBookingName = updateResp.body.lastname;
        cy.log(editedBookingName);
      });
    });
  });
  it("check created booking for change", () => {
    // request info of our just edited booking
    cy.request({
      method: "GET",
      url: `https://restful-booker.herokuapp.com/booking/${createdBookingId}`,
    }).then((response) => {
      // checking last name for change
      expect(response.body.lastname).to.equal(editedBookingName);
    });
  });

  it("partial update created booking using patch", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username,
        password,
      },
    }).then(({ body }) => {
      authToken = body.token;
      cy.request({
        method: "PATCH",
        url: `https://restful-booker.herokuapp.com/booking/${createdBookingId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${authToken}`,
        },
        body: {
          totalprice: 222,
        },
      }).then((updateResp) => {
        // more debugging
        cy.log(updateResp.body);
        // this time we are changing last name
        partialUpdate = updateResp.body.totalprice;
        cy.log(String(partialUpdate));
      });
    });
  });
  it("check created booking for partial change", () => {
    // request info of our just edited booking
    cy.request({
      method: "GET",
      url: `https://restful-booker.herokuapp.com/booking/${createdBookingId}`,
    }).then((response) => {
      // checking last name for change
      expect(response.body.totalprice).to.equal(partialUpdate);
    });
  });
  it("delete our booking", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/auth",
      body: {
        username,
        password,
      },
    }).then(({ body }) => {
      authToken = body.token;
      cy.request({
        method: "DELETE",
        url: `https://restful-booker.herokuapp.com/booking/${createdBookingId}`,
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${authToken}`,
        },
      }).then((deleteResp) => {
        // more debugging
        cy.log(deleteResp.body);
        expect(deleteResp.status).to.eq(201);
      });
    });
  });
  it("find our deleted booking, expecting failed request", () => {
    // request info of our just edited booking
    cy.request({
      method: "GET",
      url: `https://restful-booker.herokuapp.com/booking/${createdBookingId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});

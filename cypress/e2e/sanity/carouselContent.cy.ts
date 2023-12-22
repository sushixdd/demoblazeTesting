// just an experiment with POM as I've never used it before
// would have to think for some time to find out how to test the dynamic carousel

import { carouselAssertions } from "../../support/pages/carouselAssertions";

describe.only("test carousel assertions", () => {
  beforeEach(() => {
    cy.visitBaseUrl();
  });
  it("test POM implementation", () => {
    const carouselInstance = new carouselAssertions();
    carouselInstance.exists();
    // not sure if this is a good practice, but I like to use this hack when I want to run some non-cypress code
    cy.get("body").then(() => {
      for (let i = 1; i < 4; i++) {
        carouselInstance.imgSrc(i);
      }
    });
  });
});

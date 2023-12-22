// just an experiment with POM as I've never used it before
import { selectorCarouselHomepage } from "../../testdata/selectors";

export class carouselAssertions {
  exists() {
    cy.get(selectorCarouselHomepage.Base).should("exist");
  }
  imgSrc(slide: number) {
    // there must be a better solution, TBD
    switch (slide) {
      case 1:
        cy.get(selectorCarouselHomepage.firstSlide).should(
          "have.attr",
          "src",
          selectorCarouselHomepage.firstSlideSrc
        );
        break;
      case 2:
        cy.get(selectorCarouselHomepage.secondSlide).should(
          "have.attr",
          "src",
          selectorCarouselHomepage.secondSlideSrc
        );
        break;
      case 3:
        cy.get(selectorCarouselHomepage.thirdSlide).should(
          "have.attr",
          "src",
          selectorCarouselHomepage.thirdSlideSrc
        );
        break;
      default:
        throw new Error("ERROR: Wrong carousel selector");
    }
  }
}

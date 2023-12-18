declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      visitBaseUrl(): Chainable<JQuery<HTMLElement>>;
    }
  }
}
Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
});

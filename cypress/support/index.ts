declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      visitBaseUrl(): Chainable<JQuery<HTMLElement>>;
      apiLogin(username, password): Chainable<JQuery<HTMLElement>>;
      assertAttrib(el, attrib, value): Chainable<JQuery<HTMLElement>>;
      assertVisibility(el, bool): Chainable<JQuery<HTMLElement>>;
      assertContent(el, content): Chainable<JQuery<HTMLElement>>;
      assertProductProperties(
        product,
        responseItems
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
// had an issue of jumping to next command before cy.type() was finished, this should mitigate the issue
// if the issue persists, I'll swap from cy.type() to filling fields using cy.invoke()
Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
});

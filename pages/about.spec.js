import About from "./about";


describe('About page', () => {
  it('mount', () => {
    cy.mount(<About />)
  });

  it('about have anchor tag', () => {
    cy.mount(<About />);
    cy.get('a').should('have.length', 6);
  });
});
describe('Enter page', () => {
  it('visible text', () => {
    cy.visit('http://localhost:4000');
    cy.get('h2:first-of-type').should('have.text', 'New VideosNew blog postsTo manager');
  });

  it('How many anchor tag are there on the About', () => {
    cy.visit('http://localhost:4000/about');
    cy.get('a').should('have.length', 17);
  });
});
describe('Mi primer test', () => {
  it('debe cargar la página', () => {
    cy.visit('/');
    cy.contains('FIND CLOTHES THAT MATCHES YOUR STYLE').should('be.visible');
  });
});
describe('Login', () => {
  it('debe permitir iniciar sesión correctamente', () => {
    cy.visit('/login');

    cy.get('input[name="emailInput"]').type('admin@gmail.com');

    cy.get('input[name="passwordInput"]').type('admin123');

    cy.get('button[type="submit"]').click();
    
    cy.url().should('eq', `${Cypress.config().baseUrl}/dashboard`);
  });
});
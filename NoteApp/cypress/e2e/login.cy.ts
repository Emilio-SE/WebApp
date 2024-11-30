describe('Login correcto', () => {
  it('passes', () => {
    // Abre la página de login
    cy.visit('http://localhost:4200/login')

    // Coloca el email y la contraseña
    cy.get('input[type="email"]').type('emilio@itnl.com'); 
    cy.get('input[type="password"]').type('123');  

    // Da click en el botón de login
    cy.get('button[type="button"]').click();

    // Verifica que la URL contenga "/my/notes"
    cy.url().should('include', '/my/notes');

    // Verifica que el título de la página sea "Notas"
    cy.get('h1').should('contain.text', 'Notas');
  })
})
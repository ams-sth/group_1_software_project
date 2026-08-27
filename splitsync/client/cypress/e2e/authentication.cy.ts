describe('authentication page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('switches to create account mode', () => {
    cy.contains('button', 'Create account').click()
    cy.contains('button', 'Create account').should('have.attr', 'aria-selected', 'true')
    cy.get('#identifier').should('have.attr', 'type', 'email')
    cy.contains("We'll generate a username for you automatically")
  })

  it('blocks submit when password is too short', () => {
    cy.get('#identifier').type('user@example.com')
    cy.get('#password').type('short')
    cy.get('#password').then(($input) => {
      expect(($input[0] as HTMLInputElement).checkValidity()).to.be.false
    })
  })
})

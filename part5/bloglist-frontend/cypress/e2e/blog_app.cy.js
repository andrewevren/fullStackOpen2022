describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Andy',
      username: 'andyevery',
      password: 'open'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('andyevery')
      cy.get('#password').type('open')
      cy.get('#login-button').click()

      cy.contains('Andy logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('neverandy')
      cy.get('#password').type('close')
      cy.get('#login-button').click()

      cy.contains('Invalid username or password')
    })
  })
})
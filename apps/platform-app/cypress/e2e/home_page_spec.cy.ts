describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')

    cy.contains('Frontend')
  })
})

export {}

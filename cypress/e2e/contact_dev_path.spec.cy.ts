describe('The Home Page', () => {
  it('Good Dev Local', () => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000/', { failOnStatusCode: false })
    cy.get('[data-test-id="profileContainer"]').first().click()
    cy.intercept('/profile/*').as('profileLoaded')
    cy.wait('@profileLoaded')
    cy.get('[data-test-id="contactBtn"]').click()
    cy.get('input[name="senderFullName"]').type('Jan Testowy')
    cy.get('input[name="senderEmail"]').type('test@mail.server.pl')
    cy.get('input[name="subject"]').type('Remote job offer')
    cy.get('textarea[name="message"]').type(
      'We have a very interesting job offer for you.',
    )
    cy.get('[data-test-id="submitBtn"]').click()
    cy.get('[data-test-id="closeBtn"]').click()
  })
})

export {}

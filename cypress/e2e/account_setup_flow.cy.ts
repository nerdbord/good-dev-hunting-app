describe('Account Setup', () => {
  it('covers the user golden path', () => {
    cy.visit('/')
    cy.get('[data-testid="createProfileButton"]').should('be.visible').click()
    cy.login()
    cy.wait(5000)
    cy.mockDeleteUserProfile()
    cy.wait(5000)
    cy.visit('/my-profile/create')
    cy.url().should('include', '/my-profile/create')
    cy.get('[data-testid="fullName"]').type('Krzysztof Misiorny')
    cy.get('[data-testid="linkedin"]').type('https://www.linkedin.com/')
    cy.get('[data-testid="bio"]').type('dzień dobry :)')
    cy.get('[data-testid="country"]').type('Zimbabwe')
    cy.get('[data-testid="country2"]').click()
    cy.get('[data-testid="openToRelocationCountry"]').click()
    cy.get('[data-testid="city"]').type('Warszawa')
    cy.get('[data-testid="openToRelocationCity"]').click()
    cy.get('[data-testid="remoteOnly"]').click()
    cy.get('[data-testid="position"]').click()
    cy.get('[data-testid="positionOption"]').first().click()
    cy.get('[data-testid="seniority"]').click()
    cy.get('[data-testid="seniorityOption"]').first().click()
    cy.get('[data-testid="techStack"]').type(
      'excel, microsoft word, obsluga dystrybutora lpg',
    )
    cy.get('[data-testid="saveAndPreviewProfile"]').click()
    cy.get('[data-testid="publishProfileButton"]', { timeout: 20000 })
      .should('be.visible')
      .click()
    cy.get('[data-testid="publishProfilePopup"]', { timeout: 20000 }).should(
      'be.visible',
    )
  })
})

export {}

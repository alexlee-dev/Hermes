describe('Travel', () => {
  it('Should travel from the Home Planet to another planet.', () => {
    cy.visit('http://localhost:3000')
    cy.get(
      '#outer-container > div:nth-child(1) > div.bm-menu-wrap > div.bm-menu > nav > div > div > a.StyledAnchor-sc-1rp7lwl-0.fwWNdB'
    ).click()
    cy.get(
      '#page-wrap > div > div:nth-child(2) > div.StyledBox-sc-13pk1d4-0.gQLnBt > button'
    ).click()
    cy.contains('Travel Timer').should('be', true)
  })
})

describe('Travel', () => {
  it('Should travel from the Home Planet to another planet.', () => {
    cy.visit('http://localhost:3000')
    cy.get('select').select('Planets')
    cy.get(
      '#root > div > div:nth-child(6) > div:nth-child(2) > div.StyledBox-sc-13pk1d4-0.gQLnBt > button'
    ).click()
  })
})

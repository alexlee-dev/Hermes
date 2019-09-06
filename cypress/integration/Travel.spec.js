import { setMockState } from '../fixtures/default'

describe('Travel', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('http://localhost:3000')
  })

  it('Should travel from the Home Planet to another planet.', () => {
    cy.get('body').contains('ETA: 0 minutes 10 seconds')
    cy.get('button[data-testid="travel-button-Test Planet 2"').click()
    cy.get('body').contains('Travel Timer')
    cy.wait(10000)
    cy.get('body').contains('ETA: 0 minutes 10 seconds')
  })
})

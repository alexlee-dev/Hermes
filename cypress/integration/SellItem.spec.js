import { setMockState } from '../fixtures/default'

describe('Sell Item', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('http://localhost:3000')
  })

  it('Should sell an item.', () => {
    cy.contains('100').should('be', true)
    cy.get('button[data-testid="travel-button-Test Planet 2"').click()
    cy.wait(10000)
    cy.contains('104').should('be', true)
  })
})

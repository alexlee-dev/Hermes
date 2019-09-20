import { setMockState } from '../fixtures/default'

describe.skip('Sell Item', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('http://localhost:3000')
  })

  it('Should sell an item.', () => {
    cy.get('body').contains('100')
    cy.get('button[data-testid="travel-button-Test Planet 2"').click()
    cy.wait(10000)
    cy.get('body').contains('104')
  })
})

import { setMockState } from '../fixtures/default'

describe.skip('Buy Item', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('http://localhost:3000')
  })

  it('Should buy an item.', () => {
    cy.get('body').contains('100')
    cy.contains('Market').click()
    cy.get('#quantity-input-0').type('1')
    cy.get('button[data-testid="add-button-0').click()
    cy.get('body').contains('94')
  })
})

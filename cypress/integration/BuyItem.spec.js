import { setMockState } from '../fixtures/default'

describe('Buy Item', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('http://localhost:3000')
  })

  it('Should buy an item.', () => {
    cy.contains('100').should('be', true)
    cy.get('#quantity-input-0').type('1')
    cy.get('button[data-testid="add-button-0').click()
    cy.contains('94').should('be', true)
  })
})

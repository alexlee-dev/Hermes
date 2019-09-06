import { setMockState } from '../fixtures/default'

describe('Export Game', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('http://localhost:3000')
  })

  it('Should export the game state to a JSON file.', () => {
    cy.get('button[data-testid="button-export"]')
      .click()
      .then(() => {
        expect(typeof localStorage.getItem('exportedGame')).to.equal('string')
      })
  })
})

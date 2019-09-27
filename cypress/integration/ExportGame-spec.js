/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Export Game', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
  })

  it('Should export the game state to a JSON file.', () => {
    cy.get('#view-speeddial').trigger('mouseover', { force: true })
    cy.get('button[title="Export Game"]')
      .click()
      .then(() => {
        expect(typeof localStorage.getItem('exportedGame')).to.equal('string')
      })
  })
})

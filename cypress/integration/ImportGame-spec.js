/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Import Game', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
  })

  it('Should import the game state from a JSON file.', () => {
    cy.get('#view-speeddial').trigger('mouseover', { force: true })
    cy.get('button[title="Import Game"]')
      .click()
      .then(() => {
        expect(localStorage.getItem('importedGame')).to.equal('true')
      })
  })
})

/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Reset State', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
  })

  it.skip('Should reset the state.', () => {
    cy.get('#view-speeddial').trigger('mouseover', { force: true })
    cy.get('button[title="Market"]').click()
    cy.get('body').contains('Ammunition')
    cy.get('.reset-state').click()
    cy.get('body').contains('Your Ship')
  })
})

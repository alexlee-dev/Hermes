/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Market', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
    cy.get('#view-speeddial').trigger('mouseover', { force: true })
    cy.get('button[title="Market"]').click()
  })

  it('Should click the "Sell" tab.', () => {
    cy.contains('Antibiotics').click()
    cy.get('body').contains('Samara Zinoboppian')
    cy.contains('Sell').click()
    cy.contains('Kreia Protheans').should('not.be.visible')
  })

  it('Should click the "Jumps Away" column label.', () => {
    cy.contains('Jumps Away').click()
  })
})

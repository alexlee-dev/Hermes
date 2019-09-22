/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Market', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
    cy.contains('Market').click()
  })

  it('Should click the "Sell" tab.', () => {
    cy.contains('Antibiotics').click()
    cy.get('body').contains('Samara Zinoboppian')
    cy.contains('Sell').click()
    cy.contains('Kreia Protheans').should('not.be.visible')
  })

  it('Should click the "Jumps Away" column labeel.', () => {
    cy.contains('Jumps Away').click()
  })
})

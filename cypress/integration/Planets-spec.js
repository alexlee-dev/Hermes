/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Planets', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
    cy.contains('Planets').click()
  })

  it('Should display planets.', () => {
    cy.get('body').contains('Planet 1')
    cy.get('body').contains('Planet 2')
    cy.get('body').contains('Planet 3')
  })
})

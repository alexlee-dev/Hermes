/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Import Game', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
  })

  it('Example.', () => {
    cy.contains('Market').click()
    cy.contains('Planets').click()
    cy.contains('Ship').click()
  })
})

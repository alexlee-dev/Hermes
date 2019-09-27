/// <reference types="cypress" />

import { setMockState } from '../fixtures/default'

describe('Ship', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
    cy.contains('Ship').click()
  })

  it('Should display ship contents.', () => {
    cy.get('body').contains('Your Ship')
  })
})

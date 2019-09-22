/// <reference types="cypress" />

import { setMockState, mockState } from '../fixtures/default'

describe('Map', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
    cy.contains('Map').click()
  })

  it('Should display planets.', () => {
    cy.get('body').contains(mockState.world.planets[0].name)
    cy.get('body').contains(mockState.world.planets[1].name)
    cy.get('body').contains(mockState.world.planets[2].name)
  })

  // * Update this in the future
  it('Should display an alert when clicking a planet.', () => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('body')
      .contains(mockState.world.planets[0].name)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Clicked!')
      })
  })
})

/// <reference types="cypress" />

import { setMockState, mockState } from '../fixtures/default'

describe('Map', () => {
  beforeEach(() => {
    setMockState()
    cy.visit('/')
    cy.get('#view-speeddial').trigger('mouseover', { force: true })
    cy.get('button[title="Map"]').click()
  })

  it('Should display planets.', () => {
    cy.get('body').contains(mockState.world.planets[0].name)
    cy.get('body').contains(mockState.world.planets[1].name)
    cy.get('body').contains(mockState.world.planets[2].name)
  })

  // * Update this in the future
  it('Should display a prompt when clicking a planet.', () => {
    cy.get('body')
      .contains(mockState.world.planets[2].name)
      .click()
    cy.get('#travel-prompt').contains('TRAVEL_PROMPT')
  })

  it("Should display the clicked planet's name in the Travel Prompt.", () => {
    cy.get('body')
      .contains(mockState.world.planets[2].name)
      .click()
    cy.get('#travel-prompt').contains(mockState.world.planets[2].name)
  })

  it('Should indicate the Home Planet.', () => {
    cy.get('body').contains('(Home Planet)')
  })

  it('Should indicate the ship current location.', () => {
    cy.get('body').contains('(YOUR_SHIP)')
  })

  it('Should not be able to interact with the planet that the ship is currently at.', () => {
    const currentPlanet = mockState.world.planets.find(
      planet => planet.name === mockState.ship.location.name
    )
    cy.contains(currentPlanet.name)
      .should('have.css', 'font-size')
      .and('match', /16px/)
    cy.contains(currentPlanet.name).trigger('mouseover')
    cy.contains(currentPlanet.name)
      .should('have.css', 'font-size')
      .and('match', /16px/)

    cy.get('body')
      .contains(currentPlanet.name)
      .click()
    cy.contains('TRAVEL_PROMPT').should('not.exist')
  })

  it.skip('Should be able to instantaneously travel to a planet.', () => {
    const destinationPlanet = mockState.world.planets.find(
      planet => planet.name !== mockState.ship.location.name
    )
    cy.contains(destinationPlanet.name).click()
    cy.contains('TRAVEL').click()
    // ! Assert that the new planet is traveled to
  })
})

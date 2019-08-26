import {
  generateItems,
  generatePlanets,
  loadState,
  saveState,
  createDuration,
  createETA,
  generateContracts
} from '../util'

describe('Utilities', () => {
  it('Should test generateItems().', () => {
    expect(
      generateItems([
        { location: 50, name: 'Mock Planet 1' },
        { location: 100, name: 'Mock Planet 2' }
      ]).length
    ).toBe(5)
  })

  it('Should test generatePlanets().', () => {
    expect(generatePlanets().length).toBe(3)
  })

  it('Should test loadState().', () => {
    expect(loadState()).toBe(undefined)
  })

  it('Should test saveState().', () => {
    expect(saveState({ mockedState: true })).toBe(undefined)
  })

  it('Should test createDuration().', () => {
    expect(typeof createDuration()).toBe('object')
  })

  it('Should test createETA().', () => {
    expect(typeof createETA({ value: 0 }, { location: { value: 50 } })).toBe(
      'object'
    )
  })

  it('Should test generateContracts().', () => {
    expect(generateContracts().length).toBe(5)
  })
})

import { saveState } from '../../src/util'

export const mockState = {
  ship: {
    cargo: {
      items: [
        {
          description: 'Shiny!',
          destination: { name: 'Test Planet 2', value: 1 },
          id: '1',
          name: 'Silver',
          price: 2,
          quantity: 1,
          value: 4,
          volume: 0.5
        }
      ],
      volumeRemaining: 10
    },
    destination: null,
    isShipTraveling: false,
    location: {
      name: 'Test Planet 1',
      value: 0
    }
  },
  ui: {
    isCreatingContract: false,
    view: 'Planets'
  },
  user: {
    cash: 100,
    contract: null
  },
  world: {
    contracts: [],
    isTimerRunning: false,
    planets: [
      {
        id: '0',
        isHomePlanet: true,
        items: [
          {
            description: "Bullets used for shootin'.",
            destination: { name: 'Test Planet 2', value: 1 },
            id: '0',
            name: 'Ammunition',
            price: 6,
            quantity: 5,
            value: 3,
            volume: 0.8
          }
        ],
        location: 0,
        name: 'Test Planet 1'
      },
      {
        id: '1',
        isHomePlanet: false,
        items: [
          {
            description: "Bullets used for shootin'.",
            destination: { name: 'Test Planet 1', value: 0 },
            id: '1',
            name: 'Ammunition',
            price: 6,
            quantity: 5,
            value: 3,
            volume: 0.8
          }
        ],
        location: 1,
        name: 'Test Planet 2'
      }
    ]
  }
}

export const setMockState = () => {
  saveState(mockState)
}

export const defaultState = {
  ship: {
    cargo: {
      items: [],
      volumeRemaining: 5
    },
    location: {
      name: null,
      value: null
    }
  },
  ui: {
    view: 'Ship'
  },
  user: {
    cash: 100
  },
  world: {
    isTimerRunning: false,
    planets: [
      {
        id: "0",
        isHomePlanet: true,
        location: 0,
        items: [
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '0',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '1',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '2',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '3',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '4',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          }
        ],
        name: 'Test Planet 1'
      },
      {
        id: "1",
        isHomePlanet: false,
        location: 50,
        items: [
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '5',
            destination: {
              name: 'Test Planet 1',
              value: 0
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '6',
            destination: {
              name: 'Test Planet 1',
              value: 0
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '7',
            destination: {
              name: 'Test Planet 1',
              value: 0
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '8',
            destination: {
              name: 'Test Planet 1',
              value: 0
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '9',
            destination: {
              name: 'Test Planet 1',
              value: 0
            }
          }
        ],
        name: 'Test Planet 2'
      },
      {
        id: "2",
        isHomePlanet: false,
        location: 100,
        items: [
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '10',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '11',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '12',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '13',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          },
          {
            name: 'Test Item',
            space: 1,
            value: 1,
            id: '14',
            destination: {
              name: 'Test Planet 2',
              value: 50
            }
          }
        ],
        name: 'Test Planet 3'
      }
    ]
  }
}

/**
 * Saves the application state in localStorage.
 * @param {object} state State of the application.
 */
const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.error(error)
  }
}

export const mockState = {
  market: {
    buyers: [
      {
        color: {
          '50': '#e0f2f1',
          '100': '#b2dfdb',
          '200': '#80cbc4',
          '300': '#4db6ac',
          '400': '#26a69a',
          '500': '#009688',
          '600': '#00897b',
          '700': '#00796b',
          '800': '#00695c',
          '900': '#004d40',
          A100: '#a7ffeb',
          A200: '#64ffda',
          A400: '#1de9b6',
          A700: '#00bfa5'
        },
        id: 'fa9cd06d-f2c6-4b64-9d18-2fc13f518a32',
        name: 'Samara Zinoboppian',
        price: 10,
        location: {
          id: 'd23cd552-b79b-4752-86d8-9abb22d04c27',
          isHomePlanet: true,
          location: {
            x: 0.22,
            y: 0.03
          },
          name: 'Kennajeannet',
          items: [
            {
              description: "Midas' favorite.",
              name: 'Gold',
              value: 5,
              volume: 0.5,
              id: 'b9a6b27e-e778-4acd-8c48-fa676b6c4393',
              destination: { name: 'Gaffey', value: 51 },
              price: 6,
              quantity: 1
            }
          ]
        },
        jumps: 6,
        item: {
          description: 'Still used to fight the common cold!',
          name: 'Antibiotics',
          value: 2,
          volume: 0.1
        }
      },
      {
        color: {
          '50': '#e8eaf6',
          '100': '#c5cae9',
          '200': '#9fa8da',
          '300': '#7986cb',
          '400': '#5c6bc0',
          '500': '#3f51b5',
          '600': '#3949ab',
          '700': '#303f9f',
          '800': '#283593',
          '900': '#1a237e',
          A100: '#8c9eff',
          A200: '#536dfe',
          A400: '#3d5afe',
          A700: '#304ffe'
        },
        id: 'e7621b0e-767b-46c2-ad2c-cb5014c946c7',
        name: 'Kreia Protheans',
        price: 7,
        location: {
          id: '83a7a2b7-3e94-4968-ab35-edb37c30f6ea',
          isHomePlanet: false,
          location: {
            x: -0.3,
            y: -0.14
          },
          name: 'Gaffey',
          items: [
            {
              description: "Bullets used for shootin'.",
              name: 'Ammunition',
              value: 3,
              volume: 0.8,
              id: '3838ae02-28f0-4591-bd46-d9461f2c4967',
              destination: { name: 'Kennajeannet', value: 99 },
              price: 3,
              quantity: 6
            }
          ]
        },
        jumps: 9,
        item: {
          description: 'Your garden variety ore. From a rock. A space rock.',
          name: 'Ore',
          value: 2,
          volume: 1
        }
      }
    ],
    sellers: [
      {
        color: {
          '50': '#fffde7',
          '100': '#fff9c4',
          '200': '#fff59d',
          '300': '#fff176',
          '400': '#ffee58',
          '500': '#ffeb3b',
          '600': '#fdd835',
          '700': '#fbc02d',
          '800': '#f9a825',
          '900': '#f57f17',
          A100: '#ffff8d',
          A200: '#ffff00',
          A400: '#ffea00',
          A700: '#ffd600'
        },
        id: 'bec6030d-e4b0-4ed1-903c-f1fb73201884',
        name: 'Talyn Vulpimancer',
        price: 2,
        location: {
          id: 'd23cd552-b79b-4752-86d8-9abb22d04c27',
          isHomePlanet: true,
          location: {
            x: 0.22,
            y: 0.03
          },
          name: 'Kennajeannet',
          items: [
            {
              description: "Midas' favorite.",
              name: 'Gold',
              value: 5,
              volume: 0.5,
              id: 'b9a6b27e-e778-4acd-8c48-fa676b6c4393',
              destination: { name: 'Gaffey', value: 51 },
              price: 6,
              quantity: 1
            }
          ]
        },
        jumps: 3,
        item: {
          description:
            'Junk! Space junk, to be exact. Prevalent throughout the galaxy.',
          name: 'Space Junk',
          value: 1,
          volume: 0.1
        }
      },
      {
        color: {
          '50': '#f9fbe7',
          '100': '#f0f4c3',
          '200': '#e6ee9c',
          '300': '#dce775',
          '400': '#d4e157',
          '500': '#cddc39',
          '600': '#c0ca33',
          '700': '#afb42b',
          '800': '#9e9d24',
          '900': '#827717',
          A100: '#f4ff81',
          A200: '#eeff41',
          A400: '#c6ff00',
          A700: '#aeea00'
        },
        id: '7620a0fd-fdd8-4af2-8924-06183243d842',
        name: 'Stark Minbari',
        price: 1,
        location: {
          id: '83a7a2b7-3e94-4968-ab35-edb37c30f6ea',
          isHomePlanet: false,
          location: {
            x: -0.3,
            y: -0.14
          },
          name: 'Gaffey',
          items: [
            {
              description: "Bullets used for shootin'.",
              name: 'Ammunition',
              value: 3,
              volume: 0.8,
              id: '3838ae02-28f0-4591-bd46-d9461f2c4967',
              destination: { name: 'Kennajeannet', value: 99 },
              price: 3,
              quantity: 6
            }
          ]
        },
        jumps: 6,
        item: {
          description:
            'Smoke it or chew it. Farmed on distant planets by astronauts in overalls.',
          name: 'Tobacco',
          value: 3,
          volume: 0.2
        }
      }
    ]
  },
  ship: {
    cargo: { items: [], volumeRemaining: 10 },
    destination: null,
    isShipTraveling: false,
    location: { name: 'Kennajeannet', value: 99 },
    tripDuration: null
  },
  ui: { view: 'Ship' },
  user: { cash: 100 },
  world: {
    isTimerRunning: false,
    planets: [
      {
        id: 'd23cd552-b79b-4752-86d8-9abb22d04c27',
        isHomePlanet: true,
        location: {
          x: 0.22,
          y: 0.03
        },
        name: 'Kennajeannet',
        proximity: {
          '650f6b64-a7ff-4b72-b75c-a376bf1e4446': 1,
          '83a7a2b7-3e94-4968-ab35-edb37c30f6ea': 2
        },
        items: [
          {
            description: "Midas' favorite.",
            name: 'Gold',
            value: 5,
            volume: 0.5,
            id: 'b9a6b27e-e778-4acd-8c48-fa676b6c4393',
            destination: { name: 'Gaffey', value: 51 },
            price: 6,
            quantity: 1
          }
        ]
      },
      {
        id: '650f6b64-a7ff-4b72-b75c-a376bf1e4446',
        isHomePlanet: false,
        location: {
          x: -0.29,
          y: -0.32
        },
        name: 'Richardspalding',
        proximity: {
          'd23cd552-b79b-4752-86d8-9abb22d04c27': 1,
          '83a7a2b7-3e94-4968-ab35-edb37c30f6ea': 1
        },
        items: [
          {
            description: 'Still used to fight the common cold!',
            name: 'Antibiotics',
            value: 2,
            volume: 0.1,
            id: '4fbad0f5-152f-4070-af8b-e0128b845b9a',
            destination: { name: 'Kennajeannet', value: 99 },
            price: 4,
            quantity: 6
          }
        ]
      },
      {
        id: '83a7a2b7-3e94-4968-ab35-edb37c30f6ea',
        isHomePlanet: false,
        location: {
          x: -0.3,
          y: -0.14
        },
        name: 'Gaffey',
        proximity: {
          '650f6b64-a7ff-4b72-b75c-a376bf1e4446': 1,
          'd23cd552-b79b-4752-86d8-9abb22d04c27': 2
        },
        items: [
          {
            description: "Bullets used for shootin'.",
            name: 'Ammunition',
            value: 3,
            volume: 0.8,
            id: '3838ae02-28f0-4591-bd46-d9461f2c4967',
            destination: { name: 'Kennajeannet', value: 99 },
            price: 3,
            quantity: 6
          }
        ]
      }
    ]
  }
}

export const setMockState = () => saveState(mockState)

import { customRender } from '../../test-utils'
import { defaultState } from '../../fixtures'
import MarketView from '../../views/market'

const customState = {
  ...defaultState,
  ui: {
    isCreatingContract: false,
    view: 'Market'
  },
  ship: {
    ...defaultState.ship,
    location: { name: 'Test Planet 1', value: 0 },
    cargo: {
      items: [
        {
          destination: {
            name: 'Test Planet 2',
            value: 50
          },
          id: '0',
          name: 'Test Item',
          quantity: 1,
          value: 1,
          volume: 1
        }
      ],
      volumeRemaining: 4
    }
  }
}

describe('<MarketView />', () => {
  it('Should render the <MarketView /> component.', () => {
    const container = customRender({
      component: MarketView,
      state: customState
    })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

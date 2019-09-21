import { customRender } from '../../test-utils'
import { defaultState } from '../../fixtures'
import PlanetsView from '../../views/planets'

const customState = {
  ...defaultState,
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

describe('<PlanetsView />', () => {
  it('Should render the <PlanetsView /> component.', () => {
    const container = customRender({
      component: PlanetsView,
      state: customState
    })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

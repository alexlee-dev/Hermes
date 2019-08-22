import { customRender } from '../../test-utils'
import { defaultState } from '../../fixtures'
import PlanetsView from '../../views/planets'

describe('<PlanetsView />', () => {
  it('Should render the <PlanetsView /> component.', () => {
    const container = customRender({
      component: PlanetsView,
      state: {
        ...defaultState,
        ship: {
          ...defaultState.ship,
          location: { name: 'Test Location', value: 0 }
        }
      }
    })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

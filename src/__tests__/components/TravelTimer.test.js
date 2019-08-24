import { customRender } from '../../test-utils'
import TravelTimer from '../../components/TravelTimer'
import { defaultState } from '../../fixtures'

const customState = {
  ...defaultState,
  ship: {
    ...defaultState.ship,
    destination: {
      name: 'Test Planet 2',
      value: 50
    },
    isShipTraveling: true
  }
}

describe('<TravelTimer />', () => {
  it('Should render the <TravelTimer /> component.', () => {
    const container = customRender({
      component: TravelTimer,
      state: customState
    })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

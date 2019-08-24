import { customRender } from '../../test-utils'
import { defaultState } from '../../fixtures'
import PlanetsView from '../../views/planets'
import { waitForElement, fireEvent } from '@testing-library/dom'

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

  it('Should handle traveling.', async () => {
    const { getByTestId } = customRender({
      component: PlanetsView,
      state: customState
    })
    const button = await waitForElement(() =>
      getByTestId('travel-button-Test Planet 2')
    )
    fireEvent.click(button)
  })

  it('Should handle adding an item to ship cargo.', async () => {
    const { getByTestId } = customRender({
      component: PlanetsView,
      state: customState
    })
    const button = await waitForElement(() => getByTestId('add-button-1'))
    fireEvent.click(button)
  })
})

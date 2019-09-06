import { customRender } from '../../test-utils'
import ShipView from '../../views/ship'
import { defaultState } from '../../fixtures'
import { waitForElement, fireEvent } from '@testing-library/dom'

const customState = {
  ...defaultState,
  ship: {
    ...defaultState.ship,
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
          volume: 1,
          value: 1
        }
      ],
      volumeRemaining: 4
    }
  }
}

describe('<ShipView />', () => {
  it('Should render the <ShipView /> component.', () => {
    const container = customRender({ component: ShipView, state: customState })
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('Should handle removing an item from ship cargo.', async () => {
    const { getByTestId } = customRender({
      component: ShipView,
      state: customState
    })
    const button = await waitForElement(() => getByTestId('remove-button-0'))
    fireEvent.click(button)
  })
})

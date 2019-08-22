import { fireEvent, waitForElement } from '@testing-library/react'
import { customRender } from '../../test-utils'
import ViewSelector from '../../components/ViewSelector'

describe('<ViewSelector />', () => {
  it('Should render the <ViewSelector /> component.', () => {
    const container = customRender({ component: ViewSelector })
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('Should handle changing the ViewSelector.', async () => {
    const { getByTestId } = customRender({ component: ViewSelector })

    const selector = await waitForElement(() => getByTestId('view-selector'))

    expect(getByTestId('view-selector').value).toBe('Ship')
    fireEvent.change(selector, { target: { value: 'Planets' } })
    expect(getByTestId('view-selector').value).toBe('Planets')
  })
})

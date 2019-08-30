import { customRender } from '../../test-utils'
import { fireEvent } from '@testing-library/react'
import ItemDisplayInput from '../../components/ItemDisplayInput'

const item = {
  destination: {
    name: 'Test Planet 2',
    value: 50
  },
  id: '0',
  name: 'Test Item',
  quantity: 10,
  value: 1,
  volume: 1
}

describe('<ItemDisplayInput />', () => {
  it('Should render the <ItemDisplayInput /> component.', () => {
    const container = customRender({
      component: ItemDisplayInput,
      props: { item }
    })
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('Should handle the user buying an item.', () => {
    const container = customRender({
      component: ItemDisplayInput,
      props: { item }
    })

    const { getByTestId } = container

    const quantityInput = container.container.querySelector('#quantity-input-0')
    const addButton = getByTestId('add-button-0')

    fireEvent.change(quantityInput, { target: { value: 2 } })
    fireEvent.click(addButton)
  })
})

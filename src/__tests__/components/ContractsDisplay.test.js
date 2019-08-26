import { customRender } from '../../test-utils'
import ContractsDisplay from '../../components/ContractsDisplay'
import { defaultState } from '../../fixtures'
import { fireEvent } from '@testing-library/dom';

const customState = {
  ...defaultState,
  user: {
    ...defaultState.user,
    contracts: [{ id: '0', itemType: 'Plasma', value: 2, volume: 1 }]
  }
}

describe('<ContractsDisplay />', () => {
  it('Should render the <ContractsDisplay /> component.', () => {
    const container = customRender({
      component: ContractsDisplay,
      state: customState
    })
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('Should handle selecting a contract.', () => {
    const { debug, container } = customRender({
      component: ContractsDisplay,
      state: customState
    })

    const button = container.querySelector('button')

    fireEvent.click(button)
  })
})

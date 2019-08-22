import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { defaultState, mockStore } from '../../fixtures'
import CashDisplay from '../../components/CashDisplay'

describe('<CashDisplay />', () => {
  it('Should render the <CashDisplay /> component.', () => {
    const container = render(
      <Provider store={mockStore(defaultState)}>
        <CashDisplay />
      </Provider>
    )
    expect(container.asFragment()).toMatchSnapshot()
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { defaultState, mockStore } from '../../fixtures'
import ItemTimer from '../../components/ItemTimer'

describe('<ItemTimer />', () => {
  it('Should render the <ItemTimer /> component.', () => {
    const container = render(
      <Provider store={mockStore(defaultState)}>
        <ItemTimer />
      </Provider>
    )
    expect(container.asFragment()).toMatchSnapshot()
  })
})

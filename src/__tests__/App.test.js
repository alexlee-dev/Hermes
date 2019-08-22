import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { defaultState, mockStore } from '../fixtures'
import App from '../App'

describe('<App />', () => {
  it('Should render the <App /> component.', () => {
    const container = render(
      <Provider store={mockStore(defaultState)}>
        <App />
      </Provider>
    )
    expect(container.asFragment()).toMatchSnapshot()
  })
})

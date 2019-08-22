import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { defaultState, mockStore } from '../../fixtures'
import ViewSelector from '../../components/ViewSelector'

describe('<ViewSelector />', () => {
  it('Should render the <ViewSelector /> component.', () => {
    const container = render(
      <Provider store={mockStore(defaultState)}>
        <ViewSelector />
      </Provider>
    )
    expect(container.asFragment()).toMatchSnapshot()
  })
})

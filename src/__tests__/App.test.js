/**
 * @jest-environment node
 */

import React from 'react'
import App from '../App'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

const defaultState = {
  ship: {
    cargo: [],
    location: {
      name: null,
      value: null
    }
  },
  ui: {
    view: 'Ship'
  },
  user: {
    cash: 100
  },
  world: {
    isTimerRunning: false,
    planets: []
  }
}

const rerenderShallow = props =>
  shallow(
    <Provider store={mockStore(defaultState)}>
      <App {...props} />
    </Provider>
  )

describe('<App />', () => {
  it('Should render the <App /> component.', () => {
    const wrapper = rerenderShallow()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

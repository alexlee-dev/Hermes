/**
 * @jest-environment node
 */

import React from 'react'
import ViewSelector from '../../components/ViewSelector'
import { mount, shallow } from 'enzyme'
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

const rerenderShallow = customState =>
  shallow(
    <Provider store={mockStore(customState ? customState : defaultState)}>
      <ViewSelector />
    </Provider>
  )

const rerenderMount = customState =>
  mount(
    <Provider store={mockStore(customState ? customState : defaultState)}>
      <ViewSelector />
    </Provider>
  )

describe('<ViewSelector />', () => {
  it('Should render the <ViewSelector /> component.', () => {
    const wrapper = rerenderShallow()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

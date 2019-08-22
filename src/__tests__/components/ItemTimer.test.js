/**
 * @jest-environment node
 */

import React from 'react'
import ItemTimer from '../../components/ItemTimer'
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
      <ItemTimer />
    </Provider>
  )

const rerenderMount = customState =>
  mount(
    <Provider store={mockStore(customState ? customState : defaultState)}>
      <ItemTimer />
    </Provider>
  )

describe('<ItemTimer />', () => {
  it('Should render the <ItemTimer /> component.', () => {
    const wrapper = rerenderShallow()
    expect(wrapper.html()).toMatchSnapshot()
  })
})

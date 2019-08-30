import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { defaultState } from './fixtures'
import { render } from '@testing-library/react'

const mockThunks = ({ dispatch, getState }) => next => action => {
  const mockedAction = () => ({ type: 'MOCKED ACTION' })

  let returnValue

  if (typeof action === 'function' || action === undefined) {
    returnValue = mockedAction
  } else {
    returnValue = next(action)
  }

  return returnValue
}

const middlewares = [mockThunks]

export const mockStore = configureStore(middlewares)

export const customRender = options => {
  const { component, state, props } = options

  const Component = component

  return render(
    <Provider store={mockStore(state ? state : defaultState)}>
      <Component {...props} />
    </Provider>
  )
}

import React from 'react'
import { customRender } from '../test-utils'
import App from '../App'

jest.mock('../components/ItemTimer', () => {
  return () => <span>MockedTime</span>
})

describe('<App />', () => {
  it('Should render the <App /> component.', () => {
    const container = customRender({ component: App })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

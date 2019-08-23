import React from 'react';
import { customRender } from '../../test-utils'
import ItemTimer from '../../components/ItemTimer'

jest.mock('../../components/ItemTimer', () => {
  return () => <span>MockedTime</span>
})

describe('<ItemTimer />', () => {
  it('Should render the <ItemTimer /> component.', () => {
    const container = customRender({ component: ItemTimer })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

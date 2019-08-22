import React from 'react'
import { render } from '@testing-library/react'
import Title from '../../components/Title'

describe('<Title />', () => {
  it('Should render the <Title /> component.', () => {
    const container = render(<Title />)
    expect(container.asFragment()).toMatchSnapshot()
  })
})

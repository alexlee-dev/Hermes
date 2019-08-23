import Title from '../../components/Title'
import { customRender } from '../../test-utils'

describe('<Title />', () => {
  it('Should render the <Title /> component.', () => {
    const container = customRender({ component: Title })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

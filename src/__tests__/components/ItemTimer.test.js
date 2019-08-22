import { customRender } from '../../test-utils'
import ItemTimer from '../../components/ItemTimer'

describe('<ItemTimer />', () => {
  it('Should render the <ItemTimer /> component.', () => {
    const container = customRender({ component: ItemTimer })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

import { customRender } from '../../test-utils'
import CreateContract from '../../components/CreateContract'

describe('<CreateContract />', () => {
  it('Should render the <CreateContract /> component.', () => {
    const container = customRender({ component: CreateContract })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

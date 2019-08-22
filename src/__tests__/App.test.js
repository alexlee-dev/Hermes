import { customRender } from '../test-utils'
import App from '../App'

describe('<App />', () => {
  it('Should render the <App /> component.', () => {
    const container = customRender({ component: App })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

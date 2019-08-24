import { customRender } from '../../test-utils'
import CashDisplay from '../../components/CashDisplay'

describe('<CashDisplay />', () => {
  it('Should render the <CashDisplay /> component.', () => {
    const container = customRender({ component: CashDisplay })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

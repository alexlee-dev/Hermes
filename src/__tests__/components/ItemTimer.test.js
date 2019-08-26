import { customRender } from '../../test-utils'
import ItemTimer from '../../components/ItemTimer'

jest.mock('../../util', () => {
  const moment = require('moment')
  const mockCreateDuration = () => moment.duration({ minutes: 60, seconds: 0 })
  const mockItemTimerLogic = () => {}
  return {
    createDuration: mockCreateDuration,
    itemTimerLogic: mockItemTimerLogic
  }
})

describe('<ItemTimer />', () => {
  it('Should render the <ItemTimer /> component.', () => {
    const container = customRender({ component: ItemTimer })
    expect(container.asFragment()).toMatchSnapshot()
  })
})

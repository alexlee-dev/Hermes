import { customRender } from '../../test-utils'
import ImportButton from '../../components/ImportButton'
import { fireEvent } from '@testing-library/dom'

describe('<ImportButton />', () => {
  it('Should render the <ImportButton /> component.', () => {
    const container = customRender({ component: ImportButton })
    expect(container.asFragment()).toMatchSnapshot()
  })

  it('Should handle clicking the import button.', () => {
    const { getByText } = customRender({ component: ImportButton })
    const button = getByText('Import Game')
    fireEvent.click(button)
  })

  it('Should handle when a file is selected.', () => {
    const { getByTestId } = customRender({ component: ImportButton })
    const input = getByTestId('input-import')
    const blob = new Blob(['Mock File'])
    fireEvent.change(input, { target: { files: [blob] } })
  })
})

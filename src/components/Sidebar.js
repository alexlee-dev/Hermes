import React from 'react'
import PropTypes from 'prop-types'
import { push as Menu } from 'react-burger-menu'
import { Anchor, Heading, Box, Button } from 'grommet'
import { connect } from 'react-redux'
import { setView } from '../redux/actions/ui'
import { views } from '../constants'
import Title from './Title'
import ItemTimer from './ItemTimer'
import TravelTimer from './TravelTimer'
import CashDisplay from './CashDisplay'
import ContractsDisplay from './ContractsDisplay'
import { exportGame } from '../util'
import ImportButton from './ImportButton'

/**
 * Sidebar component.
 */
const Sidebar = ({ handleViewChange, outerContainerId, pageWrapId, view }) => {
  return (
    <Menu
      customCrossIcon={null}
      disableAutoFocus
      disableCloseOnEsc
      disableOverlayClick
      isOpen
      noOverlay
      outerContainerId={outerContainerId}
      pageWrapId={pageWrapId}
    >
      <Box>
        <Title />
        <Heading level="2">View</Heading>
        <Box gap="small">
          {Object.keys(views).map((viewName, i) => (
            <Anchor
              color="white"
              disabled={view === viewName}
              key={i}
              label={viewName}
              onClick={() => handleViewChange(viewName)}
            />
          ))}
        </Box>
        <ItemTimer />
        <TravelTimer />
        <CashDisplay />
        <ContractsDisplay />
        <Heading level="3" margin={{ top: 'xlarge' }}>
          Settings
        </Heading>
        <Box direction="row" gap="medium">
          <Button
            data-testid="button-export"
            label="Export Game"
            onClick={exportGame}
            plain
          />
          <ImportButton />
        </Box>
      </Box>
    </Menu>
  )
}

Sidebar.propTypes = {
  handleViewChange: PropTypes.func.isRequired,
  outerContainerId: PropTypes.string,
  pageWrapId: PropTypes.string,
  view: PropTypes.string.isRequired
}

const mapStateToProps = ({ ui }) => ({ view: ui.view })

const mapDispatchToProps = dispatch => ({
  handleViewChange: view => dispatch(setView(view))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

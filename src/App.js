import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initializeApplication } from './redux/actions/world'
import View from './views/View'
import { Box, Heading, Button as GromButt } from 'grommet'
import { views } from './constants'
import { Button } from '@material-ui/core'
import { setView } from './redux/actions/ui'
import TravelTimer from './components/TravelTimer'
import CashDisplay from './components/CashDisplay'
import { exportGame } from './util/main'
import ImportButton from './components/ImportButton'

/**
 * Hermes app.
 */
const App = ({
  handleInitializeApplication,
  handleViewChange,
  isShipTraveling,
  planets,
  view
}) => {
  useEffect(() => {
    if (planets.length === 0) handleInitializeApplication()
    // eslint-disable-next-line
  }, [])

  return (
    <Box id="outer-container" fill>
      <Box
        style={{
          background: 'rgba(173, 216, 230, 0.3)',
          position: 'absolute',
          zIndex: '1000000'
        }}
      >
        {Object.keys(views).map((viewName, i) => (
          <Button
            disabled={view === viewName}
            key={i}
            onClick={() => handleViewChange(viewName)}
          >
            {viewName}
          </Button>
        ))}
        <TravelTimer />
        <CashDisplay />
        <Heading level="3" margin={{ top: 'xlarge' }}>
          Settings
        </Heading>
        <Box direction="row" gap="medium">
          <GromButt
            data-testid="button-export"
            label="Export Game"
            onClick={exportGame}
            plain
          />
          <ImportButton />
        </Box>
      </Box>
      <Box pad="25px">
        <View />
      </Box>
    </Box>
  )
}

App.propTypes = {
  handleInitializeApplication: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ ship, ui, world }) => ({
  isShipTraveling: ship.isShipTraveling,
  planets: world.planets,
  view: ui.view
})

const mapDispatchToProps = dispatch => ({
  handleInitializeApplication: () => dispatch(initializeApplication()),
  handleViewChange: view => {
    console.log({ view })
    dispatch(setView(view))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initializeApplication } from './redux/actions/world'
import View from './views/View'
import { Box } from 'grommet'
import { setView } from './redux/actions/ui'
import TravelTimer from './components/TravelTimer'
import CashDisplay from './components/CashDisplay'
import ImportButton from './components/ImportButton'
import ViewSpeeddial from './components/ViewSpeeddial'

/**
 * Hermes app.
 */
const App = ({ handleInitializeApplication, planets }) => {
  useEffect(() => {
    if (planets.length === 0) handleInitializeApplication()
    // eslint-disable-next-line
  }, [])

  return (
    <Box fill>
      {/* <TravelTimer />  */}
      <ViewSpeeddial />

      {/* <CashDisplay />
          <ImportButton />
        </Box> */}
      {/* </Box> */}
      <Box pad={{ left: '100px', top: '25px', right: '25px', bottom: '25px' }}>
        <View />
      </Box>
    </Box>
  )
}

App.propTypes = {
  handleInitializeApplication: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({
  planets: world.planets
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

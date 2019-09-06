import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  initializeApplication,
  calculateContractExpirations
} from './redux/actions/world'
import View from './views/View'
import { Box } from 'grommet'
import Sidebar from './components/Sidebar'

/**
 * Hermes app.
 */
const App = ({
  contracts,
  handleContractExpirations,
  handleInitializeApplication,
  planets
}) => {
  useEffect(() => {
    if (planets.length === 0) handleInitializeApplication()
    if (contracts.length > 0) handleContractExpirations(contracts)
    // eslint-disable-next-line
  }, [contracts.length])

  return (
    <Box id="outer-container" fill>
      <Sidebar outerContainerId="outer-container" pageWrapId="page-wrap" />
      <Box id="page-wrap" margin={{ left: 'xlarge' }}>
        <View />
      </Box>
    </Box>
  )
}

App.propTypes = {
  contracts: PropTypes.array.isRequired,
  handleContractExpirations: PropTypes.func.isRequired,
  handleInitializeApplication: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({
  contracts: world.contracts,
  planets: world.planets
})

const mapDispatchToProps = dispatch => ({
  handleContractExpirations: contracts => {
    if (!window.Cypress) dispatch(calculateContractExpirations(contracts))
  },
  handleInitializeApplication: () => dispatch(initializeApplication())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

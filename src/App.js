import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initializeApplication } from './redux/actions/world'
import View from './views/View'
import { Box } from 'grommet'
import Sidebar from './components/Sidebar'

/**
 * Hermes app.
 */
const App = ({ handleInitializeApplication, planets }) => {
  useEffect(() => {
    if (planets.length === 0) handleInitializeApplication()
    // eslint-disable-next-line
  }, [])

  return (
    <Box id="outer-container" fill>
      <Sidebar outerContainerId="outer-container" pageWrapId="page-wrap" />
      <Box id="page-wrap" pad="25px" style={{ maxWidth: 'calc(100% - 300px)' }}>
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
  handleInitializeApplication: () => dispatch(initializeApplication())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

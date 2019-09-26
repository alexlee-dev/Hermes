import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { initializeApplication } from './redux/actions/world'
import View from './views/View'
import { Box } from 'grommet'
import { setView } from './redux/actions/ui'
import ViewSpeeddial from './components/ViewSpeeddial'

/**
 * Hermes app.
 */
const App = ({ handleInitializeApplication, planets }) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (planets.length === 0) handleInitializeApplication()
    // eslint-disable-next-line
  }, [])

  useEffect(() => setIsLoading(false), [planets.length])

  return (
    <Box fill>
      {isLoading ? (
        <span style={{ top: '50%', left: '50%', position: 'absolute' }}>
          LOADING
        </span>
      ) : (
        <Fragment>
          <ViewSpeeddial />
          <Box
            pad={{ left: '100px', top: '25px', right: '25px', bottom: '25px' }}
            style={{ maxHeight: '100vh', overflow: 'auto' }}
          >
            <View />
          </Box>
        </Fragment>
      )}
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

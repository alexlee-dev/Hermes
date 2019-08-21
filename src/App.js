import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { generatePlanets } from './util'
import { setPlanets } from './redux/actions/world'
import ItemTimer from './components/ItemTimer'
import View from './views/View'
import ViewSelector from './components/ViewSelector'

const App = ({ handleSetPlanets, planets }) => {
  useEffect(() => {
    if (planets.length === 0) {
      handleSetPlanets(generatePlanets())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>hermes</h1>
      <ItemTimer />
      <br />
      <br />
      <ViewSelector />
      <div>
        <View />
      </div>
    </div>
  )
}

App.propTypes = {
  handleSetPlanets: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({
  planets: world.planets
})

const mapDispatchToProps = dispatch => ({
  handleSetPlanets: planets => dispatch(setPlanets(planets))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

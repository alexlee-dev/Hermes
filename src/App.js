import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { generatePlanets } from './util'
import { setShipLocationValue, setShipLocationName } from './redux/actions/ship'
import { setPlanets } from './redux/actions/world'
import View from './views/View'
import { Box } from 'grommet'
import CashDisplay from './components/CashDisplay'
import ItemTimer from './components/ItemTimer'
import Title from './components/Title'
import ViewSelector from './components/ViewSelector'

const App = ({ handleInitializeApplication, planets }) => {
  useEffect(() => {
    if (planets.length === 0) handleInitializeApplication()
    // eslint-disable-next-line
  }, [])

  return (
    <Box fill>
      <Title />
      <ItemTimer />
      <CashDisplay />
      <ViewSelector />
      <View />
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
  handleInitializeApplication: () => {
    const planets = generatePlanets()
    const homePlanet = planets.find(planet => planet.isHomePlanet === true)
    const value = homePlanet.location
    const name = homePlanet.name

    dispatch(setPlanets(planets))
    dispatch(setShipLocationValue(value))
    dispatch(setShipLocationName(name))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { generatePlanets } from './util'
import { setPlanets } from './redux/actions/world'
import ItemTimer from './components/ItemTimer'
import View from './views/View'
import ViewSelector from './components/ViewSelector'
import { setShipLocationValue, setShipLocationName } from './redux/actions/ship'

const App = ({
  handleInitializeShipLocation,
  handleSetPlanets,
  planets,
  userCash
}) => {
  useEffect(() => {
    if (planets.length === 0) {
      const planets = generatePlanets()

      handleSetPlanets(planets)

      const homePlanet = planets.find(planet => planet.isHomePlanet === true)

      const value = homePlanet.location
      const name = homePlanet.name

      handleInitializeShipLocation(value, name)
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>hermes</h1>
      <ItemTimer />
      <h2>Cash:</h2>
      <span>{userCash}</span>
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
  handleInitializeShipLocation: PropTypes.func.isRequired,
  handleSetPlanets: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ user, world }) => ({
  planets: world.planets,
  userCash: user.cash
})

const mapDispatchToProps = dispatch => ({
  handleSetPlanets: planets => dispatch(setPlanets(planets)),
  handleInitializeShipLocation: (value, name) => {
    dispatch(setShipLocationValue(value))
    dispatch(setShipLocationName(name))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { generatePlanets } from './util'
import useLocalStorage from './hooks/useLocalStorage'
import { storePlanets } from './redux/actions/world'
import ItemTimer from './components/ItemTimer'
import View from './views/View'
import ViewSelector from './components/ViewSelector'
import { setShip } from './redux/actions/ship'

const App = ({
  handleGeneratePlanets,
  handleStorePlanetsInStore,
  handleStoreShipInStore,
  planets,
  ship
}) => {
  const [localStoragePlanets, setlocalStoragePlanets] = useLocalStorage(
    'planets',
    []
  )
  const [localStorageShip, setLocalStorageShip] = useLocalStorage('ship', null)

  const handleUpdatingPlanets = planets => {
    // * Check to see if planets exist
    if (localStoragePlanets.length === 0) {
      // * If no planets exist in localStorage, set the planets in localStorage
      handleGeneratePlanets(setlocalStoragePlanets)
    } else {
      // * Planets exist in localStorage
      // * Check if planets exist in Redux
      if (planets[0]) {
        // * Planets exist in Redux
        // * Check to see if `planets` exactly matches `localStoragePlanets`
        const planetsAndlocalStoragePlanetsMatch = localStoragePlanets.every(
          (planet, i) => {
            const { items } = planet

            let finalReturnValue = true

            items.forEach((item, j) => {
              if (item !== planets[i].items[j]) {
                finalReturnValue = false
              }
            })

            return finalReturnValue
          }
        )

        if (!planetsAndlocalStoragePlanetsMatch) {
          // * planets and localStoragePlanets do not match exactly
          // * update planets in localStorage to match planets in Redux
          setlocalStoragePlanets(planets)
        }
      } else {
        // * Planets do not exist in Redux
        // * Store the planets from localStorage in Redux
        handleStorePlanetsInStore(localStoragePlanets)
      }
    }
  }

  const handleUpdatingShip = ship => {
    // * If there is no localStorage ship
    if (!localStorageShip) {
      // * Set localStorage ship to ship
      setLocalStorageShip(ship)
    } else {
      // * There is a localStorage ship
      // * Check to see if they match exactly.
      // * Check to see if `planets` exactly matches `localStoragePlanets`
      const shipAndLocalStorageShipMatch =
        ship.cargo.length === localStorageShip.cargo.length &&
        ship.cargo.every((item, i) => {
          if (ship.cargo.length !== localStorageShip.cargo.length) {
            return false
          } else {
            return item.id !== localStorageShip.cargo[i].id
          }
        })

      if (!shipAndLocalStorageShipMatch) {
        // * ship and localStorage ship do not match
        // * update ship in localStorage to match ship in Redux

        if (ship.cargo.length > localStorageShip.cargo.length) {
          setLocalStorageShip(ship)
        } else {
          handleStoreShipInStore(localStorageShip)
        }
      }
    }
  }

  useEffect(() => {
    handleUpdatingPlanets(planets)
    handleUpdatingShip(ship)
    // eslint-disable-next-line
  }, [planets, ship])

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
  handleGeneratePlanets: PropTypes.func.isRequired,
  handleStorePlanetsInStore: PropTypes.func.isRequired,
  handleStoreShipInStore: PropTypes.func.isRequired
}

const mapStateToProps = ({ ship, world }) => ({ planets: world.planets, ship })

const mapDispatchToProps = dispatch => ({
  handleGeneratePlanets: setlocalStoragePlanets =>
    generatePlanets(dispatch, setlocalStoragePlanets),
  handleStorePlanetsInStore: localStoragePlanets =>
    dispatch(storePlanets(localStoragePlanets)),
  handleStoreShipInStore: ship => dispatch(setShip(ship))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { generatePlanets } from './util'
import useLocalStorage from './hooks/useLocalStorage'
import { storePlanets } from './redux/actions/world'
import ItemTimer from './components/ItemTimer'

const App = ({ dispatch, ship, world }) => {
  const [storagePlanets, setStoragePlanets] = useLocalStorage('planets', [])

  useEffect(() => {
    // * Check to see if planets exist

    if (storagePlanets.length === 0) {
      generatePlanets(dispatch, setStoragePlanets)
    } else {
      dispatch(storePlanets(storagePlanets))
    }

    // eslint-disable-next-line
  }, [])

  // const { planets } = world
  const { cargo } = ship

  return (
    <div>
      <h1>hermes</h1>
      <ItemTimer />
      <br />
      <div>
        {/* {planets.map(({ items, isHomePlanet, name }) => (
          <div key={name}>
            <h2>{isHomePlanet ? name + ' - Home Planet' : name}</h2>
            <span>Items:</span>
            <pre>{JSON.stringify(items, null, 2)}</pre>
          </div>
        ))} */}

        <h2>Your Ship</h2>
        <h3>Cargo</h3>
        <ul>
          {cargo.map(({ name }, i) => (
            <li key={i}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ship: PropTypes.object.isRequired,
  world: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship, world }) => ({ ship, world })

export default connect(mapStateToProps)(App)

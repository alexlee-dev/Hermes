import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { generatePlanets } from './util'
import useLocalStorage from './hooks/useLocalStorage'
import { storePlanets } from './redux/actions/world'
import ItemTimer from './components/ItemTimer'

const App = ({ dispatch, world }) => {
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

  const { planets } = world

  return (
    <div>
      <h1>hermes</h1>
      <ItemTimer />
      <br />
      <div>
        {planets.map(({ items, isHomePlanet, name }) => (
          <div key={name}>
            <h2>{isHomePlanet ? name + ' - Home Planet' : name}</h2>
            <span>Items:</span>
            <pre>{JSON.stringify(items, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = ({ world }) => ({ world })

export default connect(mapStateToProps)(App)

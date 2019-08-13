import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { generatePlanet } from './util'

const App = ({ dispatch, world }) => {
  useEffect(() => {
    generatePlanet(dispatch)
    generatePlanet(dispatch)
    generatePlanet(dispatch)
    // eslint-disable-next-line
  }, [])

  const { planets } = world

  return (
    <div>
      <h1>hermes</h1>
      <br />
      <div>
        {planets.map(({ items, name }) => (
          <div key={name}>
            <h2>{name}</h2>
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

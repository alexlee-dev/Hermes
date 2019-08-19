import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PlanetsView = ({ planets }) => {
  return (
    <div>
      {planets.map(({ items, isHomePlanet, name }) => (
        <div key={name}>
          <h2>{isHomePlanet ? name + ' - Home Planet' : name}</h2>
          <span>Items:</span>
          <pre>{JSON.stringify(items, null, 2)}</pre>
        </div>
      ))}
    </div>
  )
}

PlanetsView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({ planets: world.planets })

export default connect(mapStateToProps)(PlanetsView)

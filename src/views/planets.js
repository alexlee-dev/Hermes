import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlanetDisplay from '../components/PlanetDisplay'

const PlanetsView = ({ planets }) => {
  return (
    <div>
      {planets.map((planet, i) => (
        <PlanetDisplay key={i} planet={planet} />
      ))}
    </div>
  )
}

PlanetsView.propTypes = {
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({
  planets: world.planets
})

export default connect(mapStateToProps)(PlanetsView)

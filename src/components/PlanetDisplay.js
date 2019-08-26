import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Button, Heading } from 'grommet'
import { Target } from 'grommet-icons'
import { setShipTraveling, setDestination, setETA } from '../redux/actions/ship'
import ItemDisplay from './ItemDisplay'
import { createETA } from '../util'

const PlanetDisplay = ({ handleShipTravel, planet, ship }) => {
  const { isHomePlanet, items, location, name } = planet
  const shipLocationValue = ship.location.value

  return (
    <div key={name}>
      <Box direction="row" gap="medium">
        <Heading level="2">
          {isHomePlanet ? name + ' - Home Planet' : name}
        </Heading>
        {shipLocationValue !== location && !ship.isShipTraveling && (
          <Button
            data-testid={`travel-button-${name}`}
            hoverIndicator
            icon={<Target />}
            onClick={() => handleShipTravel({ name, value: location }, ship)}
            plain
          />
        )}
      </Box>
      <span>Items:</span>
      {items.map(item => (
        <ItemDisplay key={item.id} item={item} location={location} />
      ))}
    </div>
  )
}

PlanetDisplay.propTypes = {
  handleShipTravel: PropTypes.func.isRequired,
  planet: PropTypes.object.isRequired,
  ship: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship }) => ({ ship })

const mapDispatchToProps = dispatch => ({
  handleShipTravel: (destination, ship) => {
    // * set isShipTraveling to true
    dispatch(setShipTraveling(true))
    // * set destination
    dispatch(setDestination(destination))
    // * set ETA
    const eta = createETA(destination, ship)
    dispatch(setETA(eta.format('x')))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanetDisplay)

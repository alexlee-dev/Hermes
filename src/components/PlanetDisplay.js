import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Button, Heading, Text } from 'grommet'
import { Target } from 'grommet-icons'
import { departShip } from '../redux/actions/ship'
import ItemDisplay from './ItemDisplay'
import { createETA, createDiffDuration } from '../util'

/**
 * Displays planet statistics.
 */
const PlanetDisplay = ({ handleShipTravel, planet, ship }) => {
  const { isHomePlanet, items, location, name } = planet
  const shipLocationValue = ship.location.value

  const eta = createETA({ value: planet.location }, ship)
  const diffDuration = createDiffDuration(eta)

  return (
    <div key={name}>
      <Box align="center" direction="row" gap="medium">
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
        {shipLocationValue !== location && !ship.isShipTraveling && (
          <Text>
            ETA: {diffDuration.minutes()} minutes {diffDuration.seconds()}{' '}
            seconds
          </Text>
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
  handleShipTravel: (destination, ship) =>
    dispatch(departShip(destination, ship))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanetDisplay)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Button, Heading } from 'grommet'
import { Target } from 'grommet-icons'
import {
  setShipLocationName,
  setShipLocationValue,
  removeCargo
} from '../redux/actions/ship'
import { addCash } from '../redux/actions/user'
import ItemDisplay from './ItemDisplay'

const PlanetDisplay = ({
  handleShipTravel,
  planet,
  shipCargo,
  shipLocationValue
}) => {
  const { isHomePlanet, items, location, name } = planet

  return (
    <div key={name}>
      <Box direction="row" gap="medium">
        <Heading level="2">
          {isHomePlanet ? name + ' - Home Planet' : name}
        </Heading>
        {shipLocationValue !== location && (
          <Button
            data-testid={`travel-button-${name}`}
            hoverIndicator
            icon={<Target />}
            onClick={() =>
              handleShipTravel({ name, value: location }, shipCargo)
            }
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
  shipCargo: PropTypes.object.isRequired,
  shipLocationValue: PropTypes.number.isRequired
}

const mapStateToProps = ({ ship }) => ({
  shipCargo: ship.cargo,
  shipLocationValue: ship.location.value
})

const mapDispatchToProps = dispatch => ({
  handleShipTravel: (destination, shipCargo) => {
    const sellableItems = shipCargo.items.filter(
      item => item.destination.value === destination.value
    )

    let profit = 0

    sellableItems.forEach(item => {
      const { quantity, value } = item
      const itemProfit = quantity * value
      profit += itemProfit
    })

    dispatch(addCash(profit))

    sellableItems.forEach(item => {
      // * Remove the item from the ship cargo
      dispatch(removeCargo(item))
    })

    dispatch(setShipLocationName(destination.name))
    dispatch(setShipLocationValue(destination.value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanetDisplay)

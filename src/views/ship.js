import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Text, Button } from 'grommet'
import { Subtract } from 'grommet-icons'
import { removeCargo } from '../redux/actions/ship'

/**
 * Displays information about the user's ship.
 */
const ShipView = ({ items, handleRemoveCargo, location, volumeRemaining }) => {
  return (
    <div>
      <h2>Your Ship</h2>
      <h3>Cargo</h3>
      <Box>
        <Text weight="bold">Volume Remaining:</Text>
        <Text>{volumeRemaining}</Text>
      </Box>
      {items.map(item => (
        <Box direction="row" gap="medium" key={item.id}>
          <Text>{item.name}</Text>
          <Text weight="bold">Destination:</Text>
          <Text>{item.destination.name}</Text>
          <Text weight="bold">Quantity:</Text>
          <Text>{item.quantity}</Text>
          <Button
            data-testid={`remove-button-${item.id}`}
            hoverIndicator
            icon={<Subtract />}
            onClick={() => handleRemoveCargo(item)}
            plain
          />
        </Box>
      ))}
      <h3>Location:</h3>
      <Box gap="small" margin={{ left: 'medium' }}>
        <Text size="small" weight="bold">
          Value:
        </Text>
        <Text size="small">{location.value}</Text>
        <Text size="small" weight="bold">
          Name:
        </Text>
        <Text size="small">{location.name}</Text>
      </Box>
    </div>
  )
}

ShipView.propTypes = {
  handleRemoveCargo: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  volumeRemaining: PropTypes.number.isRequired
}

const mapStateToProps = ({ ship }) => ({
  items: ship.cargo.items,
  location: ship.location,
  volumeRemaining: ship.cargo.volumeRemaining
})

const mapDispatchToProps = dispatch => ({
  handleRemoveCargo: item => dispatch(removeCargo(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipView)

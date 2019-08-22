import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Text, Button } from 'grommet'
import { Subtract } from 'grommet-icons'
import { removeCargo } from '../redux/actions/ship'

const ShipView = ({ cargo, handleRemoveCargo, location }) => {
  return (
    <div>
      <h2>Your Ship</h2>
      <h3>Cargo</h3>
      {cargo.map(item => (
        <Box direction="row" gap="medium" key={item.id}>
          <Text>{item.name}</Text>
          <Text weight="bold">Destination:</Text>
          <Text>{item.destination.name}</Text>
          <Button
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
  cargo: PropTypes.array.isRequired,
  handleRemoveCargo: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship }) => ({
  cargo: ship.cargo,
  location: ship.location
})

const mapDispatchToProps = dispatch => ({
  handleRemoveCargo: item => dispatch(removeCargo(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipView)

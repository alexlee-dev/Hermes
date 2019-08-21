import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Text, Button } from 'grommet'
import { Subtract } from 'grommet-icons'
import { removeCargo } from '../redux/actions/ship'

const ShipView = ({ cargo, handleRemoveCargo }) => {
  return (
    <div>
      <h2>Your Ship</h2>
      <h3>Cargo</h3>
      {cargo.map(item => (
        <Box direction="row" gap="medium" key={item.id}>
          <Text>{item.name}</Text>
          <Button
            hoverIndicator
            icon={<Subtract />}
            onClick={() => handleRemoveCargo(item)}
            plain
          />
        </Box>
      ))}
    </div>
  )
}

ShipView.propTypes = {
  cargo: PropTypes.array.isRequired,
  handleRemoveCargo: PropTypes.func.isRequired
}

const mapStateToProps = ({ ship }) => ({ cargo: ship.cargo })

const mapDispatchToProps = dispatch => ({
  handleRemoveCargo: item => dispatch(removeCargo(item))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipView)

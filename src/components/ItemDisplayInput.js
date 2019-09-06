import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from 'grommet'
import { Add } from 'grommet-icons'
import { connect } from 'react-redux'
import { purchaseCargo } from '../redux/actions/ship'

/**
 * Allows the user to select a specific number of this item.
 */
const ItemDisplayInput = ({
  handleStoreCargo,
  isShipTraveling,
  item,
  shipCargoVolumeRemaining,
  userCash
}) => {
  const { id, quantity } = item

  const [value, setValue] = useState(0)

  return (
    !isShipTraveling && (
      <Box gap="small" pad="medium">
        <Button
          data-testid={`add-button-${id}`}
          disabled={
            shipCargoVolumeRemaining === 0 ||
            value === 0 ||
            userCash < value * item.price
          }
          hoverIndicator
          icon={<Add />}
          onClick={() => handleStoreCargo(item, value)}
          plain
        />
        <label htmlFor={`quantity-input-${id}`}>Quantity to Add</label>
        <input
          id={`quantity-input-${id}`}
          max={
            shipCargoVolumeRemaining > quantity
              ? quantity
              : shipCargoVolumeRemaining
          }
          min={0}
          onChange={e => setValue(Number(e.target.value))}
          type="number"
          value={value}
        />
      </Box>
    )
  )
}

ItemDisplayInput.propTypes = {
  handleStoreCargo: PropTypes.func.isRequired,
  isShipTraveling: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  shipCargoVolumeRemaining: PropTypes.number.isRequired,
  userCash: PropTypes.number.isRequired
}

const mapStateToProps = ({ ship, user }) => ({
  isShipTraveling: ship.isShipTraveling,
  shipCargoVolumeRemaining: ship.cargo.volumeRemaining,
  userCash: user.cash
})

const mapDispatchToProps = dispatch => ({
  handleStoreCargo: (item, quantity) => dispatch(purchaseCargo(item, quantity))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDisplayInput)

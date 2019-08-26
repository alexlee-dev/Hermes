import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'grommet'
import { connect } from 'react-redux'
import ItemDisplayInput from './ItemDisplayInput'

/**
 * Displays item statistics.
 */
const ItemDisplay = ({ item, location, shipLocationValue }) => {
  const { destination, id, name, price, quantity, volume, value } = item

  return (
    <Box
      align="center"
      direction="row"
      fill="horizontal"
      justify="start"
      key={id}
    >
      <Box pad="medium">
        <Text>Name: {name}</Text>
      </Box>
      <Box pad="medium">
        <Text>Quantity: {quantity}</Text>
      </Box>
      <Box pad="medium">
        <Text>Volume: {volume}</Text>
      </Box>
      <Box pad="medium">
        <Text>Value: {value}</Text>
      </Box>
      <Box pad="medium">
        <Text>Price: {price}</Text>
      </Box>
      <Box pad="medium">
        <Text>Destination: {destination.name}</Text>
      </Box>
      {shipLocationValue === location && <ItemDisplayInput item={item} />}
    </Box>
  )
}

ItemDisplay.propTypes = {
  item: PropTypes.object.isRequired,
  location: PropTypes.number.isRequired,
  shipLocationValue: PropTypes.number.isRequired
}

const mapStateToProps = ({ ship }) => ({
  shipLocationValue: ship.location.value
})

export default connect(mapStateToProps)(ItemDisplay)

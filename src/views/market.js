import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from 'grommet'
import { connect } from 'react-redux'
import ItemDisplayInput from '../components/ItemDisplayInput'
import { Table } from 'flwww'

/**
 * Displays information about the Markets.
 */
const MarketView = ({ isShipTraveling, shipLocationValue, planets }) => {
  return (
    <Box>
      {planets.map(({ id, items, location, name }) => {
        const columns = [
          'Item',
          'Quantity',
          'Volume',
          'Value',
          'Price',
          'Destination',
          'Add'
        ]
        const rows = items.map(item => ({
          Item: item.name,
          Quantity: item.quantity,
          Volume: item.volume,
          Value: item.value,
          Price: item.price,
          Destination: item.destination.name,
          Add:
            shipLocationValue === location ? (
              <ItemDisplayInput item={item} />
            ) : (
              ''
            )
        }))

        if (shipLocationValue !== location || isShipTraveling) columns.pop()

        return (
          <Box key={id}>
            <Heading level="2">{name}</Heading>
            <Table bordered columns={columns} rows={rows} />
          </Box>
        )
      })}
    </Box>
  )
}

MarketView.propTypes = {
  isShipTraveling: PropTypes.bool.isRequired,
  shipLocationValue: PropTypes.number.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ ship, world }) => ({
  isShipTraveling: ship.isShipTraveling,
  shipLocationValue: ship.location.value,
  planets: world.planets
})

export default connect(mapStateToProps)(MarketView)

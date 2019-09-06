import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text } from 'grommet'
import { connect } from 'react-redux'
import ItemDisplay from '../components/ItemDisplay'

/**
 * Displays information about the Markets.
 */
const MarketView = ({ planets }) => {
  return (
    <Box>
      {planets.map(({ id, items, location, name }) => {
        return (
          <Box key={id}>
            <Heading level="2">{name}</Heading>
            <Text>Items:</Text>
            {items.map(item => (
              <ItemDisplay key={item.id} item={item} location={location} />
            ))}
          </Box>
        )
      })}
    </Box>
  )
}

MarketView.propTypes = {
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({ planets: world.planets })

export default connect(mapStateToProps)(MarketView)

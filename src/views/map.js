import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import Map from '../components/Map'

/**
 * Displays information about the planets.
 */
const MapView = ({ planets }) => {
  return (
    <Box>
      <Map />
    </Box>
  )
}

MapView.propTypes = {
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({
  planets: world.planets
})

export default connect(mapStateToProps)(MapView)

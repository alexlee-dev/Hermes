import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Heading } from 'grommet'
import { landShip } from '../redux/actions/ship'
import { travelTimerLogic } from '../util'

/**
 * A timer that counts the time until the ship reaches its destination.
 */
const TravelTimer = ({ handleTimerStopped, ship }) => {
  const [timeLeft, setTimeLeft] = useState(null)

  // eslint-disable-next-line
  useEffect(() => travelTimerLogic(ship, setTimeLeft, handleTimerStopped), [
    ship.isShipTraveling
  ])

  return ship.isShipTraveling ? (
    <Box>
      <Heading level="3">Travel Timer</Heading>
      {timeLeft && (
        <span>
          {timeLeft.minutes()} minutes {timeLeft.seconds()} seconds
        </span>
      )}
    </Box>
  ) : null
}

TravelTimer.propTypes = {
  handleTimerStopped: PropTypes.func.isRequired,
  ship: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship }) => ({ ship })

const mapDispatchToProps = dispatch => ({
  handleTimerStopped: ship => dispatch(landShip(ship))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelTimer)

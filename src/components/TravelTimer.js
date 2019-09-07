import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Heading } from 'grommet'
import { travelTimerLogic } from '../redux/actions/ship'
import { DefaultProgress } from 'flwww'

/**
 * A timer that counts the time until the ship reaches its destination.
 */
const TravelTimer = ({ handleTravelTimerLogic, ship }) => {
  const [timeLeft, setTimeLeft] = useState(null)
  const [tripPercent, setTripPercent] = useState(0)

  // eslint-disable-next-line
  useEffect(() => handleTravelTimerLogic(ship, setTimeLeft, setTripPercent), [
    ship.isShipTraveling
  ])

  return ship.isShipTraveling ? (
    <Box>
      <Heading level="3">Travel Timer</Heading>
      {timeLeft && (
        <Box>
          <span>
            {timeLeft.minutes()} minutes {timeLeft.seconds()} seconds
          </span>
          <DefaultProgress prcnt={tripPercent} />
        </Box>
      )}
    </Box>
  ) : null
}

TravelTimer.propTypes = {
  handleTravelTimerLogic: PropTypes.func.isRequired,
  ship: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship }) => ({ ship })

const mapDispatchToProps = dispatch => ({
  handleTravelTimerLogic: (
    ship,
    setTimeLeft,
    setTripPercent,
    handleTimerStopped
  ) =>
    dispatch(
      travelTimerLogic(ship, setTimeLeft, setTripPercent, handleTimerStopped)
    )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelTimer)

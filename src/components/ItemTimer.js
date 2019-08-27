import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTimerRunning, itemTimerFinish } from '../redux/actions/world'
import { itemTimerLogic } from '../util'
import { Box, Heading } from 'grommet'

/**
 * A timer that refreshes the items when finished. Restarts itself.
 */
const ItemTimer = ({ handleTimerStarted, handleTimerStopped, world }) => {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(
    () =>
      itemTimerLogic(
        world,
        setTimeLeft,
        handleTimerStarted,
        handleTimerStopped
      ),
    // eslint-disable-next-line
    [world.isTimerRunning]
  )

  return (
    <Box>
      <Heading level="3">Item Timer</Heading>
      <span>{timeLeft}</span>
    </Box>
  )
}

ItemTimer.propTypes = {
  handleTimerStopped: PropTypes.func.isRequired,
  handleTimerStarted: PropTypes.func.isRequired
}

const mapStateToProps = ({ world }) => ({ world })

const mapDispatchToProps = dispatch => ({
  handleTimerStarted: () => dispatch(setTimerRunning(true)),
  handleTimerStopped: () => dispatch(itemTimerFinish())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTimer)

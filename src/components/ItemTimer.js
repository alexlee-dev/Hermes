import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  setTimerRunning,
  clearItems,
  refreshItems
} from '../redux/actions/world'
import { itemTimerLogic } from '../util'
import { Box, Heading } from 'grommet'

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
  handleTimerStopped: () => {
    // * Clear all items from planets
    dispatch(clearItems())
    // * Put new items on planets
    dispatch(refreshItems())
    // * Tell Redux the timer is no longer running
    dispatch(setTimerRunning(false))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTimer)

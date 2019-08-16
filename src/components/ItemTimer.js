import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import { setTimerRunning } from '../redux/actions/world'

const ItemTimer = ({ handleTimerStarted, handleTimerStopped, world }) => {
  const { isTimerRunning } = world

  let duration = moment.duration({ minutes: 10, seconds: 0 })
  const [timeLeft, setTimeLeft] = useState(
    `${duration.minutes()} minutes ${duration.seconds()} seconds`
  )

  const startTimer = () => {
    if (!isTimerRunning) {
      handleTimerStarted()
      let timer = setInterval(() => {
        duration.subtract(1, 'second')
        setTimeLeft(
          `${duration.minutes()} minutes ${duration.seconds()} seconds`
        )
        console.log({
          timeLeft: `${duration.minutes()} minutes ${duration.seconds()} seconds`
        })
        if (duration.asMilliseconds() === 0) {
          clearInterval(timer)
          handleTimerStopped()
        }
      }, 1000)
    }
  }

  useEffect(startTimer, [isTimerRunning])

  return <span>{timeLeft}</span>
}

ItemTimer.propTypes = {
  handleTimerStopped: PropTypes.func.isRequired,
  handleTimerStarted: PropTypes.func.isRequired
}

const mapStateToProps = ({ world }) => ({ world })

const mapDispatchToProps = dispatch => ({
  handleTimerStarted: () => dispatch(setTimerRunning(true)),
  handleTimerStopped: () => dispatch(setTimerRunning(false))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTimer)

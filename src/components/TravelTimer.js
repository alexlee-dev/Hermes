import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTravelDuration } from '../util'
import { Box, Heading } from 'grommet'
import { addCash } from '../redux/actions/user'
import {
  removeCargo,
  setShipLocationName,
  setShipLocationValue,
  setDestination,
  setTravelDuration
} from '../redux/actions/ship'
import moment from 'moment'

const TravelTimer = ({
  handleTravelDurationCreated,
  handleTimerStopped,
  ship
}) => {
  const [timeLeft, setTimeLeft] = useState('NOT TRAVELING')
  const { travelDuration } = ship

  const timerLogic = () => {
    // TODO - every 10 seconds, update ship location value by 1
    // ! Might run into trouble at the end of the timer if time is not divisible by 10

    // ! STUCK

    if (ship.isShipTraveling) {
      // * Instead of immediately selling everything,
      // * calculate how long it will take to travel to the destination

      if (!travelDuration) {
        const newTravelDuration = createTravelDuration(ship.destination, ship)
        handleTravelDurationCreated(newTravelDuration)
        setTimeLeft({
          minutes: newTravelDuration.minutes(),
          seconds: newTravelDuration.seconds()
        })
      } else {
        const travelTimer = setInterval(() => {
          const duration = moment.duration({
            minutes: timeLeft.minutes,
            seconds: timeLeft.seconds
          })
          duration.subtract(1, 'second')
          setTimeLeft({
            minutes: duration.minutes(),
            seconds: duration.seconds()
          })
          // handleTravelDurationCreated(duration)

          if (duration.asMilliseconds() === 0) {
            clearInterval(travelTimer)
            // * Only do the selling stuff when the ship arrives
            handleTimerStopped(ship)
          }
        }, 1000)
      }
    }
  }

  useEffect(timerLogic, [ship.isShipTraveling, ship.travelDuration])

  return (
    <Box>
      <Heading level="3">Travel Timer</Heading>
      <span>{`${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}</span>
    </Box>
  )
}

TravelTimer.propTypes = {
  handleTravelDurationCreated: PropTypes.func.isRequired,
  handleTimerStopped: PropTypes.func.isRequired,
  ship: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship }) => ({ ship })

const mapDispatchToProps = dispatch => ({
  handleTimerStopped: ship => {
    const { cargo, destination } = ship
    const sellableItems = cargo.items.filter(
      item => item.destination.value === destination.value
    )
    let profit = 0
    sellableItems.forEach(item => {
      const { quantity, value } = item
      const itemProfit = quantity * value
      profit += itemProfit
    })
    dispatch(addCash(profit))
    sellableItems.forEach(item => {
      // * Remove the item from the ship cargo
      dispatch(removeCargo(item))
    })
    dispatch(setShipLocationName(destination.name))
    dispatch(setShipLocationValue(destination.value))

    dispatch(setDestination(null))
  },
  handleTravelDurationCreated: travelDuration => {
    dispatch(
      setTravelDuration({
        minutes: travelDuration.minutes(),
        seconds: travelDuration.seconds()
      })
    )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelTimer)

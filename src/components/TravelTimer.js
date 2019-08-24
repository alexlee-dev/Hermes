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
  setShipTraveling,
  setTravelDuration
} from '../redux/actions/ship'
import moment from 'moment'

const TravelTimer = ({ handleSetTravelDuration, handleTimerStopped, ship }) => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const timerLogic = () => {
    if (ship.isShipTraveling) {
      let timerDuration
      if (ship.travelDuration) {
        // * There is already a travel durataion, use it
        timerDuration = moment.duration({
          minutes: ship.travelDuration.minutes,
          seconds: ship.travelDuration.seconds
        })
      } else {
        timerDuration = createTravelDuration(ship.destination, ship)
      }
      setMinutes(timerDuration.minutes())
      setSeconds(timerDuration.seconds())

      const travelTimer = setInterval(() => {
        timerDuration.subtract(1, 'second')
        setMinutes(timerDuration.minutes())
        setSeconds(timerDuration.seconds())
        handleSetTravelDuration(timerDuration)

        if (timerDuration.asMilliseconds() === 0) {
          clearInterval(travelTimer)
          handleTimerStopped(ship)
        }
      }, 1000)
    }
  }

  useEffect(timerLogic, [ship.isShipTraveling])

  return ship.isShipTraveling ? (
    <Box>
      <Heading level="3">Travel Timer</Heading>
      <span>
        {minutes} minutes {seconds} seconds
      </span>
    </Box>
  ) : null
}

TravelTimer.propTypes = {
  handleSetTravelDuration: PropTypes.func.isRequired,
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
      dispatch(removeCargo(item))
    })
    dispatch(setShipLocationName(destination.name))
    dispatch(setShipLocationValue(destination.value))
    dispatch(setDestination(null))
    dispatch(setShipTraveling(false))
  },
  handleSetTravelDuration: travelDuration => {
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

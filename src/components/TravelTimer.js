import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createETA } from '../util'
import { Box, Heading } from 'grommet'
import { addCash } from '../redux/actions/user'
import {
  removeCargo,
  setShipLocation,
  setDestination,
  setETA,
  setShipTraveling
} from '../redux/actions/ship'
import moment from 'moment'

const TravelTimer = ({ handleSetETA, handleTimerStopped, ship }) => {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const timerLogic = () => {
    if (ship.isShipTraveling) {
      let eta
      if (ship.destination.eta) {
        console.log('Used the eta that already existed.', ship.destination.eta)
        // * There is already an eta, use it
        eta = moment()
        eta.minute(ship.destination.eta.minutes)
        eta.second(ship.destination.eta.seconds)
        console.log('The eta is now', eta)
      } else {
        eta = createETA(ship.destination, ship)
        console.log('Created a new eta.', eta)
      }
      setMinutes(eta.minutes())
      setSeconds(eta.seconds())

      const travelTimer = setInterval(() => {
        eta.subtract(1, 'second')
        setMinutes(eta.minutes())
        setSeconds(eta.seconds())
        handleSetETA({ minutes: eta.minutes(), seconds: eta.seconds() })

        if (eta.milliseconds() === 0) {
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
  handleSetETA: PropTypes.func.isRequired,
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
    dispatch(
      setShipLocation({ name: destination.name, value: destination.value })
    )
    dispatch(setDestination(null))
    dispatch(setShipTraveling(false))
  },
  handleSetETA: eta => {
    dispatch(setETA(eta))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelTimer)

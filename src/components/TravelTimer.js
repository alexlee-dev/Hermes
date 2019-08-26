import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Heading } from 'grommet'
import { addCash } from '../redux/actions/user'
import {
  removeCargo,
  setShipLocation,
  setDestination,
  setShipTraveling
} from '../redux/actions/ship'
import moment from 'moment'

const TravelTimer = ({ handleTimerStopped, ship }) => {
  const [differenceInMilliseconds, setDifferenceInMilliseconds] = useState(0)

  // ? Why is this so hard
  // * All you need to do:
  // TODO 1 - ✅ Calculate how long it will take to reach the destination
  // TODO 2 - ✅ Set an ETA in Redux
  // TODO 3 - Set a duration in the TravelTimer based on the ETA in Redux
  // TODO 4 - Start a timer that ticks down the duration every second
  // TODO 5 - Display the time of that duration

  const timerLogic = () => {
    if (ship.isShipTraveling) {
      const travelTimer = setInterval(() => {
        const now = moment()
        const differenceMill = moment(ship.destination.eta, 'x').diff(now) // * gives the number of milliseconds betweeen the eta and now

        const diffDuration = moment.duration({ milliseconds: differenceMill })

        diffDuration.subtract(1, 'second')
        setDifferenceInMilliseconds(diffDuration.asMilliseconds())

        if (diffDuration.milliseconds() === 0) {
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
      <span>{moment(differenceInMilliseconds, 'SSS')}</span>
    </Box>
  ) : null
}

TravelTimer.propTypes = {
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelTimer)

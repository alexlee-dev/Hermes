import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import { connect } from 'react-redux'
import { instantTravel, setDestination } from '../redux/actions/ship'
import { hidePlanets } from '../util/map'

const TravelPrompt = ({
  destination,
  handleTravel,
  planets,
  open,
  setDestination,
  setOpen,
  ship
}) => {
  const handleClose = () => setOpen(false)

  return (
    <Dialog id="travel-prompt" open={open} onClose={handleClose}>
      <DialogTitle>TRAVEL_PROMPT</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to travel to {destination.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          id="travel-button"
          onClick={() =>
            handleTravel(
              destination,
              setOpen,
              planets,
              ship,
              setDestination,
              setOpen
            )
          }
          color="primary"
        >
          TRAVEL
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TravelPrompt.propTypes = {
  destination: PropTypes.object.isRequired,
  handleTravel: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  setDestination: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  ship: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship, world }) => ({ planets: world.planets, ship })

const mapDispatchToProps = dispatch => ({
  handleTravel: (destination, setOpen, planets, ship, setDestination) => {
    hidePlanets(destination, dispatch, planets, ship, setDestination, setOpen)
    // dispatch(instantTravel(destination))
    setOpen(false)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelPrompt)

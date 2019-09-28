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
import { instantTravel } from '../redux/actions/ship'
import { hidePlanets } from '../util/map'

const TravelPrompt = ({ destination, handleTravel, open, setOpen }) => {
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
          onClick={() => handleTravel(destination, setOpen)}
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
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  handleTravel: (destination, setOpen) => {
    hidePlanets(destination)
    // dispatch(instantTravel(destination))
    setOpen(false)
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelPrompt)

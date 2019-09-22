import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

const TravelPrompt = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false)
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>TRAVEL_PROMPT</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to travel to PLANET_NAME?
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default TravelPrompt

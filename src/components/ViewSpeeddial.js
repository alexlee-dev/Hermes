import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@material-ui/lab'
import Icon from '@material-ui/core/Icon'
import { setView } from '../redux/actions/ui'
import { exportGame } from '../util/main'

const useStyles = makeStyles(theme => ({
  exampleWrapper: {
    position: 'absolute',
    zIndex: '100000'
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  }
}))

const ViewSpeeddial = ({ handleViewChange }) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)
  const classes = useStyles()

  const actions = [
    {
      icon: <Icon className="fas fa-globe-europe lol" />,
      name: 'Map',
      onClick: () => handleViewChange('Map')
    },
    {
      icon: <Icon className="fad fa-coins" />,
      name: 'Market',
      onClick: () => handleViewChange('Market')
    },
    {
      icon: <Icon className="fas fa-space-shuttle" />,
      name: 'Ship',
      onClick: () => handleViewChange('Ship')
    },
    {
      icon: <Icon className="fas fa-download" />,
      name: 'Import Game',
      onClick: () => {}
    },
    {
      icon: <Icon className="fas fa-upload" />,
      name: 'Export Game',
      onClick: exportGame
    }
  ]

  return (
    <div className={classes.exampleWrapper}>
      <SpeedDial
        ariaLabel="Menu"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        id="view-speeddial"
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map(({ icon, name, onClick }) => (
          <SpeedDialAction
            key={name}
            icon={icon}
            id={`btn-${name}`}
            onClick={onClick}
            tooltipTitle={name}
          />
        ))}
      </SpeedDial>
    </div>
  )
}

ViewSpeeddial.propTypes = {
  handleViewChange: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleViewChange: view => dispatch(setView(view))
})

export default connect(
  null,
  mapDispatchToProps
)(ViewSpeeddial)

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { resetState } from '../redux/actions/world'

const ResetState = ({ handleResetState }) => {
  return (
    <Button
      color="secondary"
      className="reset-state"
      onClick={handleResetState}
      variant="contained"
    >
      RESET STATE
    </Button>
  )
}

ResetState.propTypes = {
  handleResetState: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleResetState: () => dispatch(resetState())
})

export default connect(
  null,
  mapDispatchToProps
)(ResetState)

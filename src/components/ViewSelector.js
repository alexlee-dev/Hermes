import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { views } from '../constants'
import { setView } from '../redux/actions/ui'
import { Box } from 'grommet'

/**
 * A select that gives the user the ability to change views in the application.
 */
const ViewSelector = ({ handleSetView, view }) => {
  const handleChange = e => handleSetView(e.target.value)

  return (
    <Box width="small">
      <select data-testid="view-selector" onChange={handleChange}>
        <option>{view}</option>
        {Object.keys(views).map((viewName, i) => {
          if (viewName !== view) {
            return <option key={i}>{viewName}</option>
          } else {
            return null
          }
        })}
      </select>
    </Box>
  )
}

ViewSelector.propTypes = {
  handleSetView: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired
}

const mapStateToProps = ({ ui }) => ({ view: ui.view })

const mapDispatchToProps = dispatch => ({
  handleSetView: view => dispatch(setView(view))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewSelector)

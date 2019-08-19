import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { views } from '../constants'

const View = ({ view }) => {
  const CurrentView = views[view]
  return <CurrentView />
}

View.propTypes = {
  dispatch: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired
}

const mapStateToProps = ({ ui }) => ({ view: ui.view })

export default connect(mapStateToProps)(View)

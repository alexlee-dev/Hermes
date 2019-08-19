import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ShipView = ({ cargo }) => {
  return (
    <div>
      <h2>Your Ship</h2>
      <h3>Cargo</h3>
      <ul>
        {cargo.map(({ name }, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

ShipView.propTypes = {
  cargo: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ ship }) => ({ cargo: ship.cargo })

export default connect(mapStateToProps)(ShipView)

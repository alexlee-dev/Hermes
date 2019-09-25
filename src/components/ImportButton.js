import React, { Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replaceShip } from '../redux/actions/ship'
import { replaceUI } from '../redux/actions/ui'
import { replaceUser } from '../redux/actions/user'
import { replaceWorld } from '../redux/actions/world'
import Icon from '@material-ui/core/Icon'

/**
 * Allows the user to import their game from an exported file.
 */
const ImportButton = ({ handleImportGame }) => {
  const inputRef = createRef()
  const handleImportGameClick = () => {
    if (window.Cypress) {
      localStorage.setItem('importedGame', true)
      return
    }
    inputRef.current.click()
  }

  const handleFileAdded = e => {
    const reader = new FileReader()

    reader.onload = e => handleImportGame(JSON.parse(e.target.result))

    reader.onerror = err => {
      console.error(err)
      alert('An error occured while importing the file.')
    }

    reader.readAsText(e.target.files[0])
  }

  return (
    <Fragment>
      <Icon className="fas fa-download" onClick={handleImportGameClick} />
      <input
        accept=".json"
        data-testid="input-import"
        onChange={handleFileAdded}
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </Fragment>
  )
}

ImportButton.propTypes = {
  handleImportGame: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleImportGame: ({ ship, ui, user, world }) => {
    dispatch(replaceShip(ship))
    dispatch(replaceUI(ui))
    dispatch(replaceUser(user))
    dispatch(replaceWorld(world))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(ImportButton)

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { generatePlanets } from './util'
import useLocalStorage from './hooks/useLocalStorage'
import { storePlanets } from './redux/actions/world'
import ItemTimer from './components/ItemTimer'
import View from './views/View'
import ViewSelector from './components/ViewSelector'

const App = ({ handleGeneratePlanets, handleStorePlanets }) => {
  const [storagePlanets, setStoragePlanets] = useLocalStorage('planets', [])

  useEffect(() => {
    // * Check to see if planets exist

    if (storagePlanets.length === 0) {
      handleGeneratePlanets(setStoragePlanets)
    } else {
      handleStorePlanets(storagePlanets)
    }

    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>hermes</h1>
      <ItemTimer />
      <br />
      <br />
      <ViewSelector />
      <div>
        <View />
      </div>
    </div>
  )
}

App.propTypes = {
  handleGeneratePlanets: PropTypes.func.isRequired,
  handleStorePlanets: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleGeneratePlanets: setStoragePlanets =>
    generatePlanets(dispatch, setStoragePlanets),
  handleStorePlanets: storagePlanets => dispatch(storePlanets(storagePlanets))
})

export default connect(
  null,
  mapDispatchToProps
)(App)

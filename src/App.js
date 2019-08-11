import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fireExampleAction } from './redux/actions/app'

const App = ({ dispatch }) => {
  useEffect(() => {
    dispatch(fireExampleAction())
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <h1>hermes</h1>
    </div>
  )
}

const mapDispatchToProps = ({ dispatch }) => ({ dispatch })

export default connect(mapDispatchToProps)(App)

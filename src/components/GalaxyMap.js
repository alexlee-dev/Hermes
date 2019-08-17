import React, { Fragment } from 'react'
import { RangeInput } from 'grommet'
import { connect } from 'react-redux'

// * Look here to style more in a future story
// https://github.com/grommet/grommet/blob/master/src/js/components/RangeInput/StyledRangeInput.js

// ? Possibly use a <Stack /> for the container

const defaultPlanetProps = {
  max: '100',
  min: '0',
  readOnly: true,
  style: { position: 'absolute', cursor: 'auto', pointerEvents: 'none' }
}

const galaxyMapContainerStyle = {
  height: '30px',
  marginBottom: '20px',
  marginTop: '20px',
  position: 'relative'
}

const GalaxyMap = ({ world }) => {
  const { planets } = world
  return (
    <div style={galaxyMapContainerStyle}>
      {planets.map(({ location, name }) => (
        <Fragment key={name}>
          <RangeInput {...defaultPlanetProps} value={location} />
          <span
            style={{
              left: `calc(${location}%)`,
              marginTop: '30px',
              position: 'absolute'
            }}
          >
            {name}
          </span>
        </Fragment>
      ))}
    </div>
  )
}

const mapStateToProps = ({ world }) => ({ world })

export default connect(mapStateToProps)(GalaxyMap)

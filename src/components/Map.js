import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import TravelPrompt from './TravelPrompt'
import {
  addEventsToNodes,
  createHomePlanetInd,
  createLabels,
  createLinks,
  createNodes,
  createShipInd,
  createSimulation,
  createSvg,
  getHeight,
  getWidth,
  updateShipLocation
} from '../util/map'

const Map = ({ currentShipLocation, planets, ship }) => {
  const drawChart = () => {
    const height = getHeight('#map-root')
    const width = getWidth('#map-root')

    const svg = createSvg('#map-root', height, width)

    const nodes_data = planets

    const links_data = [
      { source: nodes_data[0].name, target: nodes_data[1].name },
      { source: nodes_data[1].name, target: nodes_data[2].name }
    ]

    createSimulation(nodes_data)

    createNodes(svg, nodes_data, currentShipLocation, height, width)

    createLinks(svg, links_data, height, width)

    createLabels(svg, height, width)

    createHomePlanetInd(svg, planets, height, width)

    createShipInd(svg, ship, height, width)

    addEventsToNodes(svg, setDestination, setOpen, currentShipLocation)
  }

  const [open, setOpen] = useState(false)
  const [destination, setDestination] = useState({})

  useEffect(() => {
    drawChart()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    updateShipLocation(
      currentShipLocation,
      setOpen,
      setDestination,
      d3.select('#map-root').property('clientHeight'),
      d3.select('#map-root').property('clientWidth')
    )
  }, [currentShipLocation])

  return (
    <Fragment>
      <Paper id="map-root" style={{ height: 'calc(100vh - 50px)' }} />
      <TravelPrompt destination={destination} open={open} setOpen={setOpen} />
    </Fragment>
  )
}

Map.propTypes = {
  currentShipLocation: PropTypes.object.isRequired,
  planets: PropTypes.array.isRequired,
  ship: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship, world }) => ({
  currentShipLocation: ship.location,
  planets: world.planets,
  ship
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

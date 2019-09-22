import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import * as d3 from 'd3'
import { connect } from 'react-redux'
import TravelPrompt from './TravelPrompt'

const radius = 23
const fill = '#1976d2'
const fillHover = 'rgb(17, 82, 147)'

const createSvg = (selector, height, width) =>
  d3
    .select(selector)
    .append('svg')
    .attr('height', height)
    .attr('width', width)

const createSimulation = nodes => d3.forceSimulation().nodes(nodes)

const updateLinks = link =>
  link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)

const addForces = (simulation, height, width) =>
  simulation
    .force('charge_force', d3.forceManyBody())
    .force('center_force', d3.forceCenter(width / 2, height / 2))

const createNode = (svg, data) =>
  svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('g')
    .attr('class', planet =>
      planet.isHomePlanet ? 'node-container home-planet' : 'node-container'
    )
    .attr('style', planet => (planet.isHomePlanet ? 'cursor: default' : ''))
    .attr('id', planet => planet.name)
    .append('circle')
    .attr('r', radius)
    .attr('fill', fill)

const createLink = (svg, data) =>
  svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('stroke-width', 2)

const addEventsToNodes = (svg, setOpen) => {
  svg.selectAll('.node-container').on('mouseover', function(data) {
    // * Function has in scope: data, d3.event, d3.mouse(this), this

    if (!data.isHomePlanet) {
      d3.select(this)
        .select('text')
        .style('font-size', '20px')
      d3.select(this)
        .select('circle')
        .attr('fill', fillHover)
    }
  })
  svg.selectAll('.node-container').on('mouseleave', function(data) {
    d3.select(this)
      .select('circle')
      .attr('fill', fill)
    d3.select(this)
      .select('text')
      .style('font-size', '16px')
  })
  svg.selectAll('.node-container').on('click', function(data) {
    if (!data.isHomePlanet) setOpen(true)
  })
}

const Map = ({ planets, ship }) => {
  const drawChart = () => {
    const height = d3.select('#map-root').property('clientHeight')
    const width = d3.select('#map-root').property('clientWidth')

    const svg = createSvg('#map-root', height, width)

    const nodes_data = planets

    const simulation = createSimulation(nodes_data)

    const handleTick = () => {
      //update circle positions each tick of the simulation
      node.attr('cx', d => d.x).attr('cy', d => d.y)

      textLabels
        .attr('x', ({ x }) => x + radius + 2)
        .attr('y', ({ y }) => y + radius / 2)

      homePlanetInd
        .attr('x', ({ x }) => x + radius + 2)
        .attr('y', ({ y }) => y - 10)

      shipInd.attr('x', ({ x }) => x + radius + 2).attr('y', ({ y }) => y + 30)

      //update link positions
      //simply tells one end of the line to follow one node around
      //and the other end of the line to follow the other node around
      updateLinks(link)
    }
    //add forces
    //we're going to add a charge to each node
    //also going to add a centering force
    addForces(simulation, height, width)

    //draw circles for the nodes
    const node = createNode(svg, nodes_data)

    //add tick instructions:
    simulation.on('tick', handleTick)

    //Time for the links

    //Create links data
    const links_data = [
      { source: planets[0].name, target: planets[1].name, distance: 5 },
      { source: planets[1].name, target: planets[2].name, distance: 10 }
    ]

    //Create the link force
    //We need the id accessor to use named sources and targets

    const link_force = d3
      .forceLink(links_data)
      .id(d => d.name)
      .distance(200)

    //Add a links force to the simulation
    //Specify links  in d3.forceLink argument

    simulation.force('links', link_force)
    simulation.force('manyBody', d3.forceManyBody().strength(-800))

    //draw lines for the links
    const link = createLink(svg, links_data)

    const textLabels = svg
      .selectAll('.node-container')
      .append('text')
      .text(({ name }) => name)
      .attr('x', ({ x }) => x)
      .attr('y', ({ y }) => y)

    // Indicate home planet
    const homePlanet = planets.find(planet => planet.isHomePlanet === true)
    const homePlanetInd = svg
      .select(`#${homePlanet.name}`)
      .append('text')
      .text('(Home Planet)')
      .attr('id', 'home-planet-ind')
      .attr('x', ({ x }) => x)
      .attr('y', ({ y }) => y)
      .style('font-size', '10px')

    const shipInd = svg
      .select(`#${ship.location.name}`)
      .append('text')
      .text('(YOUR_SHIP)')
      .attr('id', 'ship-ind')
      .attr('x', ({ x }) => x)
      .attr('y', ({ y }) => y)
      .style('font-size', '10px')

    addEventsToNodes(svg, setOpen)
  }

  useEffect(() => {
    drawChart()
    // eslint-disable-next-line
  }, [])

  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Paper id="map-root" style={{ height: 'calc(100vh - 50px)' }} />
      <TravelPrompt open={open} setOpen={setOpen} />
    </Fragment>
  )
}

Map.propTypes = {
  planets: PropTypes.array.isRequired,
  ship: PropTypes.object.isRequired
}

const mapStateToProps = ({ ship, world }) => ({ planets: world.planets, ship })

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)

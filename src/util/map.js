import * as d3 from 'd3'

const radius = 23
const fill = '#1976d2'
const fillHover = 'rgb(17, 82, 147)'

export const createSvg = (selector, height, width) =>
  d3
    .select(selector)
    .append('svg')
    .attr('height', height)
    .attr('width', width)
// .style('padding', '25px')

export const createSimulation = data =>
  d3
    .forceSimulation()
    .nodes(data)
    .stop()

export const modifyCursor = (selection, currentShipLocation) =>
  selection.attr('style', ({ name }) =>
    name !== currentShipLocation.name ? 'cursor: pointer' : 'cursor: default'
  )

const createCircle = (selection, height, width) =>
  selection
    .append('circle')
    .attr('r', radius)
    .attr('fill', fill)
    .attr('cx', ({ location }) => width / 2 + location.x * width)
    .attr('cy', ({ location }) => height / 2 - location.y * height)

export const createNodes = (svg, data, currentShipLocation, height, width) => {
  const selection = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'node-container')
    .attr('id', ({ name }) => name)

  modifyCursor(selection, currentShipLocation)
  createCircle(selection, height, width)

  return selection
}

export const createLinks = (svg, data, height, width) =>
  svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(data)
    .enter()
    .append('line')
    .attr('stroke-width', 2)
    .attr(
      'x1',
      ({ source }) =>
        width / 2 + svg.select(`#${source}`).data()[0].location.x * width
    )
    .attr(
      'y1',
      ({ source }) =>
        height / 2 - svg.select(`#${source}`).data()[0].location.y * height
    )
    .attr(
      'x2',
      ({ target }) =>
        width / 2 + svg.select(`#${target}`).data()[0].location.x * width
    )
    .attr(
      'y2',
      ({ target }) =>
        height / 2 - svg.select(`#${target}`).data()[0].location.y * height
    )

const getLabelWidth = (svg, selector) => {
  if (svg.select(selector).property('children')[1]) {
    return svg.select(selector).property('children')[1].textLength.baseVal.value
  } else {
    return svg.select(selector)._groups[0][0].textLength.baseVal.value
  }
}
export const createLabels = (svg, height, width) => {
  const selection = svg
    .selectAll('.node-container')
    .append('text')
    .text(({ name }) => name)
    .attr(
      'x',
      ({ location, name }) =>
        width / 2 + location.x * width - getLabelWidth(svg, `#${name}`) / 2
    )
    .attr('y', ({ location }) => height / 2 - location.y * height + radius + 20)

  return selection
}

export const createHomePlanetInd = (svg, planets, height, width) => {
  const homePlanet = planets.find(planet => planet.isHomePlanet === true)

  const selection = svg
    .select(`#${homePlanet.name}`)
    .append('text')
    .text('(Home Planet)')
    .attr('id', 'home-planet-ind')
    .style('font-size', '10px')
    .attr('x', ({ location }) => width / 2 + location.x * width - 58.61 / 2)
    .attr('y', ({ location }) => height / 2 - location.y * height + radius + 40)

  return selection
}

export const createShipInd = (svg, ship, height, width) =>
  svg
    .select(`#${ship.location.name}`)
    .append('text')
    .text('(YOUR_SHIP)')
    .attr('id', 'ship-ind')
    .style('font-size', '10px')
    .attr('x', ({ location }) => width / 2 + location.x * width - 61.67 / 2)
    .attr('y', ({ location }) => height / 2 - location.y * height - radius - 10)

export const addEventsToNodes = (
  svg,
  setDestination,
  setOpen,
  currentShipLocation
) => {
  const width = getWidth('#map-root')
  svg.selectAll('.node-container').on('mouseover', function(planet) {
    // * Function has in scope: data, d3.event, d3.mouse(this), this

    if (planet.name !== currentShipLocation.name) {
      d3.select(this)
        .select('text')
        .style('font-size', '20px')
        .attr(
          'x',
          ({ location, name }) =>
            width / 2 + location.x * width - getLabelWidth(svg, `#${name}`) / 2
        )
      d3.select(this)
        .select('circle')
        .attr('fill', fillHover)
    }
  })
  svg.selectAll('.node-container').on('mouseleave', function(planet) {
    d3.select(this)
      .select('circle')
      .attr('fill', fill)
    d3.select(this)
      .select('text')
      .style('font-size', '16px')
      .attr(
        'x',
        ({ location, name }) =>
          width / 2 + location.x * width - getLabelWidth(svg, `#${name}`) / 2
      )
  })
  svg.selectAll('.node-container').on('click', function(planet) {
    // debugger;
    if (planet.name !== currentShipLocation.name) {
      setDestination(planet)
      setOpen(true)
    }
  })
}

export const updateShipLocation = (
  currentShipLocation,
  setOpen,
  setDestination,
  height,
  width
) => {
  const svg = d3.select('#map-root > svg')
  const destinationNode = svg.select(`#${currentShipLocation.name}`)

  svg
    .select(`#ship-ind`)
    .attr(
      'x',
      () =>
        width / 2 + destinationNode.data()[0].location.x * width - radius - 8
    )
    .attr(
      'y',
      () =>
        height / 2 - destinationNode.data()[0].location.y * height - radius - 10
    )

  // * Remove event listeners from nodes
  svg.selectAll('.node-container').on('mouseover', null)
  svg.selectAll('.node-container').on('mouseleave', null)
  svg.selectAll('.node-container').on('click', null)

  addEventsToNodes(svg, setDestination, setOpen, currentShipLocation)

  // * Update cursor stuff
  modifyCursor(svg.selectAll('.node-container'), currentShipLocation)
}

export const getHeight = selector =>
  d3.select(selector).property('clientHeight')

export const getWidth = selector => d3.select(selector).property('clientWidth')

export const hidePlanets = destination => {
  d3.selectAll('g').style('pointer-events', 'none')
  let value = 1.0
  const interval = setInterval(() => {
    if (value <= 0) {
      clearInterval(interval)
      d3.selectAll('g').remove()
      showWarpingTo(destination)
    }
    d3.selectAll('g').style('opacity', value - 0.05)
    value -= 0.05
  }, 100)
}

const showWarpingTo = destination => {
  const svg = d3.select('#map-root > svg')
  const height = getHeight('#map-root > svg')
  const width = getWidth('#map-root > svg')

  svg
    .append('text')
    .text(`Warping to ${destination.name}...`)
    .attr('id', 'warping-to')
    .attr('x', () => width / 2 - getLabelWidth(svg, `#warping-to`) / 2)
    .attr('y', height / 2)
}

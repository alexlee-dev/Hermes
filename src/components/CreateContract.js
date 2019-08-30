import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { itemList } from '../constants'
import { connect } from 'react-redux'
import { createContract } from '../redux/actions/world'
import { generateContract } from '../util'

/**
 * Inputs for creating a contract.
 */
const CreateContract = ({ handleCreateContract, planets }) => {
  const [itemType, setItemType] = useState(itemList[0])
  const [destination, setDestination] = useState({
    location: planets[0].location,
    name: planets[0].name
  })

  return (
    <Box width="medium">
      <label htmlFor="item-type">Item Type</label>
      <select
        id="item-type"
        onChange={e => setItemType(JSON.parse(e.target.value))}
      >
        {itemList.map(item => (
          <option key={item.name} value={JSON.stringify(item)}>
            {item.name}
          </option>
        ))}
      </select>
      <label htmlFor="item-volume">Item Volume</label>
      <input
        disabled
        id="item-volume"
        type="number"
        value={itemType ? itemType.volume : 0}
      />
      <label htmlFor="item-value">Item Value</label>
      <input
        disabled
        id="item-value"
        type="number"
        value={itemType ? itemType.value : 0}
      />
      <label htmlFor="item-destination">Destination</label>
      <select
        id="item-destination"
        onChange={e => {
          const planet = planets.find(planet => planet.id === e.target.value)
          setDestination({ location: planet.location, name: planet.name })
        }}
      >
        {planets.map(planet => (
          <option key={planet.id} value={planet.id}>
            {planet.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          handleCreateContract(
            generateContract(planets, itemType.name, destination)
          )
        }}
      >
        Create Contract
      </button>
    </Box>
  )
}

CreateContract.propTypes = {
  handleCreateContract: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({ planets: world.planets })

const mapDispatchToProps = dispatch => ({
  handleCreateContract: contract => dispatch(createContract(contract))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateContract)

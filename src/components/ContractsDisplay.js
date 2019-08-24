import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text } from 'grommet'
import { connect } from 'react-redux'

const ContractsDisplay = ({ contracts }) => {
  return (
    <Box>
      <Heading level="3">Contracts</Heading>
      {contracts.map(contract => (
        <Box direction="row" key={contract.id} gap="small">
          <Text weight="bold">Item Type</Text>
          <Text>{contract.itemType}</Text>
          <Text weight="bold">Volume</Text>
          <Text>{contract.volume}</Text>
          <Text weight="bold">Value</Text>
          <Text>{contract.value}</Text>
        </Box>
      ))}
    </Box>
  )
}

ContractsDisplay.propTypes = {
  contracts: PropTypes.array.isRequired
}

const mapStateToProps = ({ world }) => ({
  contracts: world.contracts
})

export default connect(mapStateToProps)(ContractsDisplay)

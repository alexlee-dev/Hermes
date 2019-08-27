import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text, Button } from 'grommet'
import { Checkmark, Close } from 'grommet-icons'
import { connect } from 'react-redux'
import { resetContract, setContract } from '../redux/actions/user'

/**
 * Displays a set of item contracts.
 */
const ContractsDisplay = ({
  contracts,
  currentContract,
  handleResetContract,
  handleSetContract
}) => {
  return (
    <Box gap="small" margin={{ vertical: 'medium' }}>
      <Heading level="3">Contracts</Heading>
      {currentContract && (
        <Box direction="row" gap="small">
          <Text>Current Contract: {currentContract.id}</Text>
          <Button
            hoverIndicator
            icon={<Close />}
            onClick={() => handleResetContract()}
            plain
          />
        </Box>
      )}
      {contracts.map(contract => (
        <Box direction="row" key={contract.id} gap="small">
          <Text weight="bold">Item Type</Text>
          <Text>{contract.itemType}</Text>
          <Text weight="bold">Volume</Text>
          <Text>{contract.volume}</Text>
          <Text weight="bold">Value</Text>
          <Text>{contract.value}</Text>
          <Text weight="bold">Destination</Text>
          <Text>{contract.destination.name}</Text>
          <Button
            disabled={currentContract !== null}
            hoverIndicator
            icon={<Checkmark />}
            onClick={e =>
              handleSetContract(
                contracts.find(
                  contract => contract.id === e.target.parentElement.value
                )
              )
            }
            plain
            value={contract.id}
          />
        </Box>
      ))}
    </Box>
  )
}

ContractsDisplay.propTypes = {
  contracts: PropTypes.array.isRequired,
  currentContract: PropTypes.object,
  handleResetContract: PropTypes.func.isRequired,
  handleSetContract: PropTypes.func.isRequired
}

const mapStateToProps = ({ user, world }) => ({
  contracts: world.contracts,
  currentContract: user.contract
})

const mapDispatchToProps = dispatch => ({
  handleResetContract: () => {
    dispatch(resetContract())
  },
  handleSetContract: contract => {
    dispatch(setContract(contract))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractsDisplay)

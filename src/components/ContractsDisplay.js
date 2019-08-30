import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text, Button } from 'grommet'
import { Checkmark, Close } from 'grommet-icons'
import { connect } from 'react-redux'
import { resetContract, setContract } from '../redux/actions/user'
import CreateContract from './CreateContract'
import { setIsCreatingContract } from '../redux/actions/ui'

/**
 * Displays a set of item contracts.
 */
const ContractsDisplay = ({
  contracts,
  currentContract,
  handleCreateInit,
  handleResetContract,
  handleSetContract,
  isCreatingContract
}) => {
  return (
    <Box gap="small" margin={{ vertical: 'medium' }}>
      <Box align="center" direction="row" gap="medium">
        <Heading level="3">Contracts</Heading>
        <Button
          hoverIndicator
          label="Create"
          onClick={() => handleCreateInit()}
          plain
        />
      </Box>
      {isCreatingContract && <CreateContract />}
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
            onClick={() => handleSetContract(contract)}
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
  handleCreateInit: PropTypes.func.isRequired,
  handleResetContract: PropTypes.func.isRequired,
  handleSetContract: PropTypes.func.isRequired,
  isCreatingContract: PropTypes.bool.isRequired
}

const mapStateToProps = ({ ui, user, world }) => ({
  contracts: world.contracts,
  currentContract: user.contract,
  isCreatingContract: ui.isCreatingContract
})

const mapDispatchToProps = dispatch => ({
  handleCreateInit: () => {
    dispatch(setIsCreatingContract(true))
  },
  handleResetContract: () => {
    dispatch(resetContract())
  },
  handleSetContract: contract => {
    console.log({ contract })
    dispatch(setContract(contract))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractsDisplay)

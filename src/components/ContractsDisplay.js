import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text, Button, Layer } from 'grommet'
import { Checkmark, Close } from 'grommet-icons'
import { connect } from 'react-redux'
import { resetContract, setContract } from '../redux/actions/user'
import CreateContract from './CreateContract'
import { setIsCreatingContract } from '../redux/actions/ui'
import { Table } from 'flwww'
import { formatExpiration } from '../util'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewContracts = () => setIsModalOpen(true)

  const columns = [
    'Item Type',
    'Volume',
    'Value',
    'Destination',
    'Expiration',
    'Add'
  ]
  const rows = contracts.map(contract => ({
    'Item Type': contract.itemType,
    Volume: contract.volume,
    Value: contract.value,
    Destination: contract.destination.name,
    Expiration: formatExpiration(contract.expiration),
    Add: (
      <Button
        disabled={currentContract !== null}
        hoverIndicator
        icon={<Checkmark />}
        onClick={() => handleSetContract(contract)}
        plain
        value={contract.id}
      />
    )
  }))

  return (
    <Box gap="small" margin={{ vertical: 'medium' }}>
      <Box>
        <Heading level="3">Contracts</Heading>
        <Box align="center" direction="row" justify="between" width="small">
          <Button
            hoverIndicator
            label="Create"
            onClick={() => handleCreateInit()}
            plain
          />
          <Button
            hoverIndicator
            label="View"
            onClick={() => handleViewContracts()}
            plain
          />
        </Box>
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
      {isModalOpen && (
        <Layer
          onClickOutside={() => setIsModalOpen(false)}
          onEsc={() => setIsModalOpen(false)}
        >
          <Box pad="medium">
            <Heading level="2" margin={{ top: 'none', bottom: 'small' }}>
              Contracts
            </Heading>
            <Table bordered columns={columns} rows={rows} />
          </Box>
        </Layer>
      )}
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
  handleCreateInit: () => dispatch(setIsCreatingContract(true)),
  handleResetContract: () => dispatch(resetContract()),
  handleSetContract: contract => dispatch(setContract(contract))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractsDisplay)

import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Text, Box } from 'grommet'
import { connect } from 'react-redux'

const CashDisplay = ({ cash }) => {
  return (
    <Box margin={{ bottom: 'small' }}>
      <Heading level="2" margin={{ bottom: 'xsmall' }}>
        Cash:
      </Heading>
      <Text>{cash}</Text>
    </Box>
  )
}

CashDisplay.propTypes = {
  cash: PropTypes.number.isRequired
}

const mapStateToProps = ({ user }) => ({ cash: user.cash })

export default connect(mapStateToProps)(CashDisplay)

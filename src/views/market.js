import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Tab, Tabs, Text } from 'grommet'
import { LinkDown, LinkUp } from 'grommet-icons'
import { connect } from 'react-redux'
import { itemList } from '../constants'
import MarketTable from '../components/MarketTable'
import MarketItemList from '../components/MarketItemList'

const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
)

/**
 * Displays information about the Markets.
 */
const MarketView = ({ buyers, sellers }) => {
  const [item, setItem] = useState(itemList[0].name)

  return (
    <Box>
      <Box>
        <Tabs>
          <Tab title={<RichTabTitle icon={<LinkDown />} label="Buy" />}>
            <Box direction="row">
              <MarketItemList item={item} setItem={setItem} />
              <MarketTable data={buyers} item={item} />
            </Box>
          </Tab>
          <Tab title={<RichTabTitle icon={<LinkUp />} label="Sell" />}>
            <Box direction="row">
              <MarketItemList item={item} setItem={setItem} />
              <MarketTable data={sellers} item={item} />
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </Box>
  )
}

MarketView.propTypes = {
  buyers: PropTypes.array.isRequired,
  sellers: PropTypes.array.isRequired
}

const mapStateToProps = ({ market }) => ({
  buyers: market.buyers,
  sellers: market.sellers
})

export default connect(mapStateToProps)(MarketView)

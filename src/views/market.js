import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'grommet'
import { connect } from 'react-redux'
import { itemList } from '../constants'
import MarketTable from '../components/MarketTable'
import MarketItemList from '../components/MarketItemList'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'

const Table = ({ buyers, item, sellers, setItem, value }) => {
  return (
    <Box direction="row">
      <MarketItemList item={item} setItem={setItem} />
      <MarketTable data={value === 0 ? buyers : sellers} item={item} />
    </Box>
  )
}

/**
 * Displays information about the Markets.
 */
const MarketView = ({ buyers, sellers }) => {
  const [item, setItem] = useState(itemList[0].name)
  const [value, setValue] = useState(0)

  const handleTabClick = (e, value) => setValue(value)

  return (
    <Box>
      <Box>
        <AppBar color="default" position="static">
          <Tabs
            centered
            indicatorColor="primary"
            onChange={handleTabClick}
            textColor="primary"
            value={value}
          >
            <Tab label="Buy" icon={<ArrowDownward />} />
            <Tab label="Sell" icon={<ArrowUpward />} />
          </Tabs>
        </AppBar>
        <Table
          buyers={buyers}
          item={item}
          sellers={sellers}
          setItem={setItem}
          value={value}
        />
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

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Tab, Tabs, Text } from 'grommet'
import { LinkDown, LinkUp } from 'grommet-icons'
import { connect } from 'react-redux'
import { itemList, mockBuyers, mockSellers } from '../constants'
import { Paper, MenuItem, MenuList } from '@material-ui/core'
import MarketTable from '../components/MarketTable'

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
const MarketView = ({ isShipTraveling, shipLocationValue, planets }) => {
  const [item, setItem] = useState(itemList[0].name)

  return (
    <Box>
      <Box>
        <Tabs>
          <Tab title={<RichTabTitle icon={<LinkDown />} label="Buy" />}>
            <Box direction="row">
              <Paper style={{ width: '200px' }}>
                <MenuList>
                  {itemList.map(({ description, name, value, volume }) => (
                    <MenuItem
                      key={name}
                      onClick={() => setItem(name)}
                      selected={name === item}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
              <MarketTable data={mockBuyers} item={item} />
            </Box>
          </Tab>
          <Tab title={<RichTabTitle icon={<LinkUp />} label="Sell" />}>
            <Box direction="row">
              <Paper style={{ width: '200px' }}>
                <MenuList>
                  {itemList.map(({ description, name, value, volume }) => (
                    <MenuItem
                      key={name}
                      onClick={() => setItem(name)}
                      selected={name === item}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
              <MarketTable data={mockSellers} item={item} />
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </Box>
  )
}

MarketView.propTypes = {
  isShipTraveling: PropTypes.bool.isRequired,
  shipLocationValue: PropTypes.number.isRequired,
  planets: PropTypes.array.isRequired
}

const mapStateToProps = ({ ship, world }) => ({
  isShipTraveling: ship.isShipTraveling,
  shipLocationValue: ship.location.value,
  planets: world.planets
})

export default connect(mapStateToProps)(MarketView)

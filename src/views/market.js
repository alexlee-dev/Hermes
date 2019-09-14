import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Tab, Tabs, Text } from 'grommet'
import { LinkDown, LinkUp, StatusUnknown } from 'grommet-icons'
import { connect } from 'react-redux'
import ItemDisplayInput from '../components/ItemDisplayInput'
import { Table } from 'flwww'
import ReactTooltip from 'react-tooltip'
import { itemList } from '../constants'
import Paper from '@material-ui/core/Paper'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'

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
  return (
    <Box>
      <Box>
        <Tabs>
          <Tab title={<RichTabTitle icon={<LinkDown />} label="Buy" />}>
            <Box direction="row">
              <Paper style={{ width: '200px' }}>
                <MenuList>
                  {itemList.map(({ description, name, value, volume }) => (
                    <MenuItem key={name}>{name}</MenuItem>
                  ))}
                </MenuList>
              </Paper>
              <Box
                align="center"
                background="yellow"
                fill="horizontal"
                justify="center"
                pad="large"
              >
                <Text>BUY INFO</Text>
              </Box>
            </Box>
          </Tab>
          <Tab title={<RichTabTitle icon={<LinkUp />} label="Sell" />}>
            <Box direction="row">
              <Paper style={{ width: '200px' }}>
                <MenuList>
                  {itemList.map(({ description, name, value, volume }) => (
                    <MenuItem key={name}>{name}</MenuItem>
                  ))}
                </MenuList>
              </Paper>
              <Box
                align="center"
                background="green"
                fill="horizontal"
                justify="center"
                pad="large"
              >
                <Text>SELL INFO</Text>
              </Box>
            </Box>
          </Tab>
        </Tabs>
      </Box>

      <Box margin={{ top: 'large' }}>
        {planets.map(({ id, items, location, name }) => {
          const columns = [
            'Item',
            'Quantity',
            'Volume',
            'Value',
            'Price',
            'Destination',
            'Add'
          ]
          const rows = items.map(item => ({
            Item: (
              <Box align="center" direction="row" gap="small" key={item.id}>
                <Text>{item.name}</Text>
                <StatusUnknown data-tip data-for={item.id} />
                {
                  <ReactTooltip id={item.id} type="info">
                    <span>{item.description}</span>
                  </ReactTooltip>
                }
              </Box>
            ),
            Quantity: item.quantity,
            Volume: item.volume,
            Value: item.value,
            Price: item.price,
            Destination: item.destination.name,
            Add:
              shipLocationValue === location ? (
                <ItemDisplayInput item={item} />
              ) : (
                ''
              )
          }))

          if (shipLocationValue !== location || isShipTraveling) columns.pop()

          return (
            <Box key={id}>
              <Heading level="2">{name}</Heading>
              <Table bordered columns={columns} rows={rows} />
            </Box>
          )
        })}
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

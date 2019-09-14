import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Tab, Tabs, Text } from 'grommet'
import { LinkDown, LinkUp, StatusUnknown } from 'grommet-icons'
import { connect } from 'react-redux'
import ItemDisplayInput from '../components/ItemDisplayInput'
import { Table as FlawTable } from 'flwww'
import ReactTooltip from 'react-tooltip'
import { itemList } from '../constants'
import {
  Paper,
  MenuItem,
  MenuList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

const mockBuyersOrSellers = [
  { id: 1, name: 'Sergio', price: '¥9.87', location: 'Argentina' },
  { id: 2, name: 'Vonny', price: '¥6.28', location: 'Russia' },
  { id: 3, name: 'Cassy', price: '¥8.87', location: 'Poland' },
  { id: 4, name: 'Isabelita', price: '¥1.23', location: 'Nicaragua' },
  { id: 5, name: 'Georas', price: '¥9.90', location: 'Indonesia' },
  { id: 6, name: 'Milly', price: '¥2.44', location: 'Sweden' },
  { id: 7, name: 'Gene', price: '¥7.23', location: 'Poland' },
  { id: 8, name: 'Liliane', price: '¥5.48', location: 'Philippines' },
  { id: 9, name: 'Roi', price: '¥2.12', location: 'Portugal' },
  { id: 10, name: 'Casper', price: '¥1.01', location: 'France' }
]

const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
)

const MockInfo = ({ text }) => (
  <Box
    align="center"
    background="yellow"
    fill="horizontal"
    justify="center"
    pad="large"
  >
    <Text>{text}</Text>
  </Box>
)

const MockTable = () => (
  <Paper style={{ width: '100%' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {mockBuyersOrSellers.map(({ id, name, price, location }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell align="right">{price}</TableCell>
            <TableCell align="right">{location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
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
              <MockTable />
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
              <MockInfo text="SELL INFO" />
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
              <FlawTable bordered columns={columns} rows={rows} />
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

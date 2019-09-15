import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Tab, Tabs, Text } from 'grommet'
import { LinkDown, LinkUp } from 'grommet-icons'
import { connect } from 'react-redux'
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
import ItemCard from '../components/ItemCard'

const mockBuyers = [
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

const mockSellers = [
  { id: 1, name: 'Mikol', price: '¥7.41', location: 'China' },
  { id: 2, name: 'Leonhard', price: '¥1.78', location: 'Kuwait' },
  { id: 3, name: 'Jule', price: '¥7.34', location: 'Poland' },
  { id: 4, name: 'Hew', price: '¥3.46', location: 'China' },
  { id: 5, name: 'Kellia', price: '¥2.49', location: 'Cyprus' },
  { id: 6, name: 'Yancey', price: '¥3.10', location: 'China' },
  { id: 7, name: 'Maridel', price: '¥2.54', location: 'Sweden' },
  { id: 8, name: 'Amandy', price: '¥4.64', location: 'China' },
  { id: 9, name: 'Parker', price: '¥4.50', location: 'Philippines' },
  { id: 10, name: 'Kylynn', price: '¥5.03', location: 'Morocco' }
]

const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
)

const MockTable = ({ data, item }) => (
  <Paper style={{ width: '100%' }}>
    <ItemCard item={item} />
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, name, price, location }) => (
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
              <MockTable data={mockBuyers} item={item} />
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
              <MockTable data={mockSellers} item={item} />
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

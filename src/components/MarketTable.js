import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core'
import ItemCard from '../components/ItemCard'
import { simpleCompare } from '../util/main'
import MarketAvatar from './MarketAvatar'

const MarketTable = ({ data, item }) => {
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortBy, setSortBy] = useState('price')

  const createSortHandler = property => () => handleSortClick(property)

  const handleSortClick = property => {
    if (sortOrder === 'asc') {
      setSortOrder('desc')
    } else {
      setSortOrder('asc')
    }
    setSortBy(property)
  }

  const compareBySortOrder = (sortOrder, sortBy) => (a, b) => {
    const order =
      sortOrder === 'asc'
        ? simpleCompare(a[0][sortBy], b[0][sortBy])
        : -simpleCompare(a[0][sortBy], b[0][sortBy])
    if (order !== 0) return order
    return a[1][sortBy] - b[1][sortBy]
  }

  const sortRows = (data, sortOrder, sortBy) => {
    const dataByItem = data.filter(datum => datum.item.name === item)
    const stableArr = dataByItem.map((element, i) => [element, i])

    stableArr.sort(compareBySortOrder(sortOrder, sortBy))

    return stableArr.map(el => el[0])
  }

  return (
    <Paper style={{ overflow: 'auto', width: '100%' }}>
      <ItemCard item={item} />
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right" sortDirection={sortOrder}>
              <TableSortLabel
                active={sortBy === 'price'}
                direction={sortOrder}
                onClick={createSortHandler('price')}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={sortBy === 'jumps'}
                direction={sortOrder}
                onClick={createSortHandler('jumps')}
              >
                Jumps Away
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortRows(data, sortOrder, sortBy).map(
            ({ color, id, item, jumps, location, name, price }) => {
              return (
                <TableRow key={id}>
                  <TableCell>
                    <MarketAvatar color={color} name={name} />
                  </TableCell>
                  <TableCell align="right">${price}</TableCell>
                  <TableCell align="right">{location.name}</TableCell>
                  <TableCell align="right">{jumps}</TableCell>
                </TableRow>
              )
            }
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default MarketTable

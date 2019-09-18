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
import { simpleCompare } from '../util'

const MarketTable = ({ data, item }) => {
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortBy, setSortBy] = useState('price')

  const handleSortPrice = () => {
    if (sortOrder === 'asc') {
      setSortOrder('desc')
    } else {
      setSortOrder('asc')
    }
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
    const stableArr = data.map((element, i) => [element, i])
    stableArr.sort(compareBySortOrder(sortOrder, sortBy))

    return stableArr.map(el => el[0])
  }

  return (
    <Paper style={{ width: '100%' }}>
      <ItemCard item={item} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right" sortDirection={sortOrder}>
              <TableSortLabel
                active={true}
                direction={sortOrder}
                onClick={() => handleSortPrice()}
              >
                Price
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortRows(data, sortOrder, sortBy).map(
            ({ id, name, price, location }) => (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{price}</TableCell>
                <TableCell align="right">{location}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default MarketTable

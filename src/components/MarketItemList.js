import React from 'react'
import { Paper, MenuItem, MenuList } from '@material-ui/core'
import { itemList } from '../constants'

const MarketItemList = ({ item, setItem }) => {
  return (
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
  )
}

export default MarketItemList

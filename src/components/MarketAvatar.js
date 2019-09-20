import React from 'react'
import { Avatar, Box } from '@material-ui/core'

const MarketAvatar = ({ color, name }) => {
  return (
    <Box alignItems="center" display="flex" flexDirection="row">
      <Avatar
        style={{
          backgroundColor: color[500],
          color: '#fff',
          marginRight: '10px'
        }}
      >{`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`}</Avatar>
      {name}
    </Box>
  )
}

export default MarketAvatar

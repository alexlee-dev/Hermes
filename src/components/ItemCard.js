import React from 'react'
import { Box, Card, CardContent, Typography } from '@material-ui/core'
import { itemList } from '../constants'

const ItemCard = ({ item }) => {
  const currentItem = itemList.find(({ name }) => name === item)
  const Icon = currentItem.icon
  return (
    <Card>
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h5" component="h2">
              {item}
            </Typography>
            <Icon />
          </Box>
          <Box>
            <Typography color="textSecondary">
              {currentItem.description}
            </Typography>
            <Typography variant="caption">
              Value: {currentItem.value}
            </Typography>
            <br />
            <Typography variant="caption">
              Volume: {currentItem.volume}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ItemCard

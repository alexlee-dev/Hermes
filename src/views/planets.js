import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Text, Button } from 'grommet'
import { Add } from 'grommet-icons'
import useLocalStorage from '../hooks/useLocalStorage'
import { storeCargo } from '../redux/actions/ship'
import { removeItem } from '../redux/actions/world'

const PlanetsView = ({ planets, handleStoreCargo }) => {
  const [storagePlanets, setStoragePlanets] = useLocalStorage('planets', [])

  return (
    <div>
      {planets.map(({ items, isHomePlanet, name }) => (
        <div key={name}>
          <h2>{isHomePlanet ? name + ' - Home Planet' : name}</h2>
          <span>Items:</span>
          {items.map(item => {
            const { id, name, space, value } = item

            return (
              <Box
                align="center"
                direction="row"
                fill="horizontal"
                justify="start"
                key={id}
              >
                <Box pad="medium">
                  <Text>Name: {name}</Text>
                </Box>
                <Box pad="medium">
                  <Text>Space: {space}</Text>
                </Box>
                <Box pad="medium">
                  <Text>Value: {value}</Text>
                </Box>
                <Box pad="medium">
                  <Button
                    hoverIndicator
                    icon={<Add />}
                    onClick={() =>
                      handleStoreCargo(item, storagePlanets, setStoragePlanets)
                    }
                    plain
                  />
                </Box>
              </Box>
            )
          })}
        </div>
      ))}
    </div>
  )
}

PlanetsView.propTypes = {
  planets: PropTypes.array.isRequired,
  handleStoreCargo: PropTypes.func.isRequired
}

const mapStateToProps = ({ world }) => ({ planets: world.planets })

const mapDispatchToProps = dispatch => ({
  handleStoreCargo: (item, currentPlanets, setStoragePlanets) => {
    // * dispatch an action to store the item in ship cargo
    dispatch(storeCargo(item))
    // * dispatch an action to remove the item from the list of stored items on this planet
    dispatch(removeItem(item))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanetsView)

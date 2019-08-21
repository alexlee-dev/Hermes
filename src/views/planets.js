import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Text, Button, Heading } from 'grommet'
import { Add, Target } from 'grommet-icons'
import useLocalStorage from '../hooks/useLocalStorage'
import {
  storeCargo,
  setShipLocationName,
  setShipLocationValue
} from '../redux/actions/ship'
import { removeItem } from '../redux/actions/world'

const PlanetsView = ({
  handleShipTravel,
  handleStoreCargo,
  planets,
  shipLocationValue
}) => {
  const [storagePlanets, setStoragePlanets] = useLocalStorage('planets', [])

  return (
    <div>
      {planets.map(({ items, isHomePlanet, location, name }) => (
        <div key={name}>
          <Box direction="row" gap="medium">
            <Heading level="2">
              {isHomePlanet ? name + ' - Home Planet' : name}
            </Heading>
            {shipLocationValue !== location && (
              <Button
                hoverIndicator
                icon={<Target />}
                onClick={() => handleShipTravel({ name, value: location })}
                plain
              />
            )}
          </Box>
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
  handleShipTravel: PropTypes.func.isRequired,
  handleStoreCargo: PropTypes.func.isRequired,
  planets: PropTypes.array.isRequired,
  shipLocationValue: PropTypes.number.isRequired
}

const mapStateToProps = ({ ship, world }) => ({
  planets: world.planets,
  shipLocationValue: ship.location.value
})

const mapDispatchToProps = dispatch => ({
  handleStoreCargo: (item, currentPlanets, setStoragePlanets) => {
    // * dispatch an action to store the item in ship cargo
    dispatch(storeCargo(item))
    // * dispatch an action to remove the item from the list of stored items on this planet
    dispatch(removeItem(item))
  },
  handleShipTravel: destination => {
    dispatch(setShipLocationName(destination.name))
    dispatch(setShipLocationValue(destination.value))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanetsView)

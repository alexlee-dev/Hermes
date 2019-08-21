// * ACTION TYPES
const STORE_PLANETS = 'STORE_PLANETS'
const SET_TIMER_RUNNING = 'SET_TIMER_RUNNING'
const REMOVE_ITEM = 'REMOVE_ITEM'

// * ACTION GENERATORS
export const storePlanets = planets => ({
  type: STORE_PLANETS,
  payload: { planets }
})

export const setTimerRunning = isTimerRunning => ({
  type: SET_TIMER_RUNNING,
  payload: { isTimerRunning }
})

export const removeItem = item => ({
  type: REMOVE_ITEM,
  payload: {
    item
  }
})

// * PROMISES
// const thing = () => {
//   return new Promise((resolve, reject) => {
//     console.log('Promise timer started.')
//     setTimeout(() => {
//       resolve(true)
//     }, 3000)
//   })
// }

// * THUNKS
// export const generatePlanet = () => {
//   return async dispatch => {
//     const thingy = await thing()
//     console.log(thingy)
//   }
// }

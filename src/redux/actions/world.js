// * ACTION TYPES
const STORE_PLANETS = 'STORE_PLANETS'
const SET_TIMER_RUNNING = 'SET_TIMER_RUNNING'

// * ACTION GENERATORS
export const storePlanets = planets => ({
  type: STORE_PLANETS,
  payload: { planets }
})

export const setTimerRunning = isTimerRunning => ({
  type: SET_TIMER_RUNNING,
  payload: { isTimerRunning }
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

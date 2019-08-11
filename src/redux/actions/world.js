// * ACTION TYPES
const STORE_PLANET = 'STORE_PLANET'

// * ACTION GENERATORS
export const storePlanet = planet => ({
  type: STORE_PLANET,
  payload: { planet }
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

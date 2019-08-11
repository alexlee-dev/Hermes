export const EXAMPLE_ACTION = 'EXAMPLE_ACTION'

export const fireExampleAction = () => ({
  type: EXAMPLE_ACTION,
  payload: { isExampleAction: true }
})

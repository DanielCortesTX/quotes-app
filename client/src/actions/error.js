import { SET_ERROR, REMOVE_ERROR } from './types'
import uuid from 'uuid'

export const setError = (message, timeout = 5000) => dispatch => {
  const id = uuid.v4()
  const color = 'red'
  console.log('fired')
  dispatch({
    type: SET_ERROR,
    payload: { message, color, id}
  })

  setTimeout(() => dispatch({ type: REMOVE_ERROR, payload: id}), timeout)
}
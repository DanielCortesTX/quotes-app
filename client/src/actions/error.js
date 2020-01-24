import { SET_ERROR, REMOVE_ERROR } from './types'
import uuid from 'uuid'

export const setError = (message, errorType, timeout = 5000) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: SET_ERROR,
    payload: { message, errorType, id}
  })

  setTimeout(() => dispatch({ type: REMOVE_ERROR, payload: id}), timeout)
}
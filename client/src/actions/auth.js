import axios from 'axios'
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './types'

// Load User
export const loadUser = (decoded) => {
  return {
    type: USER_LOADED,
    payload: decoded
  }
}

// Register User
export const register = ({ username, password }) =>
async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password })

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if(errors) {
      errors.forEach(error => console.log('oops'))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Load User
export const login = ({ username, password }) =>
async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password })

  try {
    const res = await axios.post('/api/users', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if(errors) {
      errors.forEach(error => console.log('oops'))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// dispatch(setAlert(error.msg, 'danger'))
import axios from 'axios'
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  CLEAR_USER,
  LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'

// Load User
export const loadUser = () => async (dispatch) => {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('/api/users/me')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  } 
}

// Register User
export const register = (username, password) =>
async (dispatch) => {
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

// Login User
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ username, password })

  try {
    console.log(username, 'actions')
    const res = await axios.post('/api/users/login', body, config)

    console.log('after call')

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    // dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if(errors) {
      errors.forEach(error => console.log(error))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / clear user
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_USER })
  dispatch({ type: LOGOUT })
}

// dispatch(setAlert(error.msg, 'danger'))
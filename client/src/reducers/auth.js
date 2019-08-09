import {
  USER_LOADED,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_USER
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false
      }  
    default: return state
  }
}
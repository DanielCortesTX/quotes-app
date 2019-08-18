import {
  LOAD_AUTHORS
} from '../actions/types'

const initialState = {
  authors: null,
  isLoaded: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case LOAD_AUTHORS:
      return {
        authors: payload,
        isLoaded: true
      }
    default: return state  
  }
}
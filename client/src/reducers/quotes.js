import {
  LOAD_AUTHORS,
  ADD_QUOTE,
  LOAD_QUOTES
} from '../actions/types'

const initialState = {
  authors: null,
  quotes: [],
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
    case ADD_QUOTE:
      return {
        ...state,
        quotes: payload, ...state
      }
    case LOAD_QUOTES:
      return {
        ...state,
        quotes: payload
      }  
    default: return state  
  }
}
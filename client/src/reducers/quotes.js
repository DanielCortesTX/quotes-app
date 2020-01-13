import {
  LOAD_AUTHORS,
  ADD_QUOTE,
  GET_QUOTES,
  CLEAR_QUOTES
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
    case GET_QUOTES:
      return {
        ...state,
        quotes: payload
      }  
    case ADD_QUOTE:
      return {
        ...state,
        quotes: [payload, ...state.quotes],
        isLoaded: true
      }
    case CLEAR_QUOTES:
      return {
        ...state,
        quotes: []
      }  
    default: return state  
  }
}
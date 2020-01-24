import {
  LOAD_AUTHORS,
  ADD_QUOTE,
  GET_QUOTES,
  CLEAR_QUOTES,
  SET_ACTIVE_QUOTE,
  LOADING_QUOTES
} from '../actions/types'

const initialState = {
  authors: null,
  quotes: [],
  isLoaded: false,
  activeQuote: null
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch(type) {
    case LOAD_AUTHORS:
      return {
        authors: payload,
        isLoaded: true
      }
    case LOADING_QUOTES:
      return {
        ...state,
        isLoaded: false
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
    case SET_ACTIVE_QUOTE:
      return {
        ...state,
        activeQuote: payload,
        isLoaded: true
      }  
    default: return state  
  }
}
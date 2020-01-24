import { SET_ERROR, REMOVE_ERROR } from '../actions/types'
const initialState = []

export default function(state = initialState, action){
  const { type, payload } = action

  switch(type) {
    case SET_ERROR:
      return [...state, payload]
    case REMOVE_ERROR:
      return state.filter(alert => alert.id !== payload)  
    default:
      return state
  }
}
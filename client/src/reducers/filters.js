import {
  SET_FILTERS
} from '../actions/types'

const initialState = {
  activeFilter: '',
  searchField: ''
}

export default function (state = initialState, action){
  const { type, payload } = action

  switch(type){
    case SET_FILTERS:
      return {
        activeFilter: payload.filter,
        searchField: payload.search
      }
    default: return state
  }
}
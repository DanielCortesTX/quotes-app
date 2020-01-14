import { combineReducers } from 'redux'
import quotes from './quotes'
import auth from './auth'
import filter from './filter'

export default combineReducers({
  auth,
  quotes,
  filter
})
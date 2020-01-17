import { combineReducers } from 'redux'
import quotes from './quotes'
import auth from './auth'
import filters from './filters'

export default combineReducers({
  auth,
  quotes,
  filters
})
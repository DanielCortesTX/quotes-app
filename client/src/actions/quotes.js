import axios from 'axios'
import {
  LOAD_AUTHORS,
  ADD_QUOTE
} from './types'

// load authors
export const loadAuthors = () => async dispatch => {

  try{
    const res = await axios.get('/api/quotes/authors')

  dispatch({
    type: LOAD_AUTHORS,
    payload: res.data
  })
  console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}

// New Quote
export const addQuote = () => async dispatch => {
  try {
    const res = await axios.post('/api/quotes')

    dispatch({
      type: ADD_QUOTE,
      payload: res.data
    })
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}
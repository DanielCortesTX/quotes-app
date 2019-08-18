import axios from 'axios'
import {
  LOAD_AUTHORS
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
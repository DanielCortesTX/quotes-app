import axios from 'axios'
import {
  LOAD_AUTHORS,
  ADD_QUOTE,
  GET_QUOTES
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

//get quotes that user added
export const getQuotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/quotes/mine')

    dispatch({
      type: GET_QUOTES,
      payload: res.data
    })
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}

// export const loadQuotes = () => async dispatch => {
//   try {
//     const res = await axios.get('/api/quotes')

//     dispatch({
//       type: LOAD_QUOTES,
//       payload: res.data
//     })
//     console.log(res.data)
//   } catch (err) {
//     console.log(err)
//   }
// }

// New Quote
export const addQuote = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/quotes', formData, config)

    dispatch({
      type: ADD_QUOTE,
      payload: res.data
    })
    history.push('/home')
    console.log(res.data)
  } catch (err) {
    console.log(err)
  }
}
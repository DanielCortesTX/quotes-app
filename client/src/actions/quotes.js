import axios from 'axios'
import {
  LOAD_AUTHORS,
  ADD_QUOTE,
  GET_QUOTES,
  SET_ACTIVE_QUOTE,
  LOADING_QUOTES,
  SET_FILTERS
} from './types'

import { setError } from './error'

// load authors
export const loadAuthors = () => async dispatch => {

  try{
    const res = await axios.get('/api/quotes/authors')

  dispatch({
    type: LOAD_AUTHORS,
    payload: res.data
  })
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
  } catch (err) {
    console.log(err)
  }
}

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
    dispatch({
      type: SET_FILTERS,
      payload: {activeFilter: '', searchField: ''}
    })
    history.push('/userpage')
  } catch (err) {
    console.log(err)
    const errors = err.response.data.errors
    let errArray = []
    if(errors.text){
      errArray.push(errors.text.message)
    }

    if(errors.author){
      errArray.push(errors.author.message)
    }

    console.log(errArray, 'yessssss')

    if(errArray.length > 0) {
      errArray.forEach(error => dispatch(setError(error, 'red')))
    }
  }
}

// Delete Quote
export const deleteQuote = (quoteId, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'content-Type': 'application/json'
      }
    }

    const res = await axios.delete(`/api/quotes/${quoteId}`, config)

    dispatch({
      type: GET_QUOTES,
      payload: res.data
    })

    history.push('/userpage')
  } catch (err) {
    console.log(err)
  }
}

// Edit quote 
export const editQuote = (quoteId, formData, history) => async dispatch => {
  const config = {
    headers: {
      'content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.patch(`/api/quotes/${quoteId}`, formData, config)

    dispatch({
      type: SET_ACTIVE_QUOTE,
      payload: res.data
    })
    dispatch({
      type: SET_FILTERS,
      payload: {activeFilter: '', searchField: ''}
    })
    history.push('/userpage')
  } catch (err) {
    console.log(err)
  }
}

// search by filter
export const getFilteredQuotes = ({filter, search}, history) => async dispatch => {
  const config = {
    headers: {
      'content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.get(`/api/quotes/${filter}/${search}`, config)
  
    dispatch({
      type: GET_QUOTES,
      payload: res.data
    })
    
    history.push('/userpage')
  } catch (err) {
    
  }
}

// get specific quote
export const setActiveQuote = (quoteId) => async dispatch => {
  dispatch(setPostLoading())
  const config = {
    headers: {
      'content-Type': 'application/json'
    }

  } 
  try {
    const res = await axios.get(`/api/quotes/${quoteId}` ,config)
    dispatch({
      type: SET_ACTIVE_QUOTE,
      payload: res.data
    })

  } catch (err) {
    console.log(err)
  }
}

// Set loading page
export const setPostLoading = () => {
  return {
    type: LOADING_QUOTES
  }
}
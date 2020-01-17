import axios from 'axios'
import { getFilteredQuotes } from './quotes'
import { SET_FILTERS } from './types'

export const setFilters = (formData) => async dispatch => {
  try {
    const res = await axios.get('/api/quotes/authors')

    console.log(res)

    dispatch({
      type: SET_FILTERS,
      payload: formData
    })

  } catch (err) {
    console.log(err)
  }
}

export const check = () => {
  console.log(SET_FILTERS)
}
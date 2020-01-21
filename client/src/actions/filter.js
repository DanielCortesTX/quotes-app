import axios from 'axios'
import { getFilteredQuotes } from './quotes'
import { SET_FILTERS, GET_QUOTES } from './types'

export const setFilters = (formData) => async dispatch => {
  try {
    // const config = {
    //   headers: {
    //     'content-Type': 'application/json'
    //   }
    // }

    // console.log(config)

    // console.log(formData)
  
    // const res = await axios.get('/api/quotes/search', formData)

    // console.log(res.data)

    dispatch({
      type: SET_FILTERS,
      payload: formData
    })

    // dispatch({
    //   type: GET_QUOTES,
    //   payload: res.data
    // })

  } catch (err) {
    console.log(err)
  }
}
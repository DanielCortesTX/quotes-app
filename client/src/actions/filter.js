import { SET_FILTERS } from './types'

export const setFilters = (formData, history) => async dispatch => {
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
    
    history.push('/userpage')

    // getFilteredQuotes(formData, history)

  } catch (err) {
    // console.log(err)
  }
}
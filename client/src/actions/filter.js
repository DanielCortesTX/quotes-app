import { SET_FILTERS } from './types'

export const setFilters = (formData, history) => async dispatch => {
  try {
    dispatch({
      type: SET_FILTERS,
      payload: formData
    })
    
    history.push('/userpage')
  } catch (err) {

  }
}
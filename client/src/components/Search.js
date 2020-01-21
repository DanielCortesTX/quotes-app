import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFilters } from '../actions/filter'
import { getFilteredQuotes } from '../actions/quotes'

const Search = ({ setFilters, getFilteredQuotes }) => {
  const [formData, setFormData] = useState({
    filter: '',
    search: ''
  })

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  // const { filter, search } = formData

  const onSubmit = async e => {
    e.preventDefault()
    if(formData.search === ''){
      return console.log('Error, must put input in')
    }

    setFilters(formData)
    getFilteredQuotes(formData)
  }

  return (
    <div>
      THis is the search page.
      <div className="card">
        <form onSubmit={e => onSubmit(e)}>
          <select name="filter" onChange={e => onChange(e)}>
            <option
              value={null}
            >
              Select
            </option>
            <option 
              value="author"
            >
              Author
            </option>
            <option
              value="dateOfQuote" 
            >
              Year
            </option>
            <option
              value="bodyOfWork"
            >
              Body of Work
            </option>
          </select>
          <input 
            type="text"
            name="search"
            placeholder="Search for"
            onChange={e => onChange(e)}/>
          <input type="submit"/>
        </form>
      </div>
    </div>
  )
}

Search.propTypes = {
  setFilters: PropTypes.func.isRequired
}

const mapStateToProps = ({ filters, quotes }) => ({
  quotes: quotes.quotes
})

export default connect(mapStateToProps, { setFilters, getFilteredQuotes })(withRouter(Search))

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFilters, check } from '../actions/filter'

const Search = ({ filter, setFilters }) => {
  const [formData, setFormData] = useState({
    filter: 'author',
    search: ''
  })

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()
    if(formData.search === ''){
      return console.log('Error, must put input in')
    }
    check()
    setFilters(formData)
    console.log(formData)
  }

  return (
    <div>
      THis is the search page.
      <div className="card">
        <form onSubmit={e => onSubmit(e)}>
          <select onChange={e => onChange(e)}>
            <option 
              name="author" 
              value="author"
            >
              Author
            </option>
            <option
              name="dateOfQuote" 
              value="dateOfQuote" 
            >
              Year
            </option>
            <option
              name="bodyOfWork" 
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
  quotes: quotes.quotes,
  filter: filters.activeFilter
})

export default connect(mapStateToProps, { setFilters, check })(withRouter(Search))

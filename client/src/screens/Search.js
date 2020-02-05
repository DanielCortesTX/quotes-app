import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setFilters } from '../actions/filter'
import { setError } from '../actions/error'
import { getFilteredQuotes } from '../actions/quotes'

const Search = ({ setFilters, getFilteredQuotes, history }) => {
  const [formData, setFormData] = useState({
    filter: '',
    search: ''
  })

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  // const { filter, search } = formData

  const onSubmit = async e => {
    e.preventDefault()
    if(formData.search === ''){
      return setError('search cannot be blank')
      // console.log('Error, must put input in')
      // // throw new Error('Must have input')
    }

    setFilters(formData)
    getFilteredQuotes(formData, history)
  }

  return (
    <div className="my-1">
      <div className="page p-1">
        <h2 className="py-1">Search for quotes</h2>
        <p className="py-1">Hone in on the quotes you're looking for. Select Author, year the quote was made or the body of work it belongs to and then type in your search (Be precise). Finally hit search and view the results.</p>
        <form onSubmit={e => onSubmit(e)} id="search-form">
          <select className="search-select" name="filter" onChange={e => onChange(e)}>
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
            className="search-select"
            onChange={e => onChange(e)}/>
          <input type="submit" className="btn-quote"/>
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

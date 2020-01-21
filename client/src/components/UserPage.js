import React, { Component, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QuoteDisplay from './QuoteDisplay'
import { getQuotes } from '../actions/quotes'
import { getFilteredQuotes } from '../actions/quotes'

const UserPage = ({ getQuotes, auth, quotes, filter, search, getFilteredQuotes }) => {
  useEffect(( )=> {
    if(filter && search !== ''){
      // adjust this....
      const formData = {filter, search }
      console.log(filter, search)
      getFilteredQuotes(formData)
    } else {
      getQuotes()
    }
  }, [])
  let render
  if(quotes && auth.user !== null){
    render = quotes.map((quote, index) => {
      return <QuoteDisplay key={index} quote={quote}/>
    })
  } else {
    render = <h1>Sign in to view</h1>
  }
  return (
    <div>
      SPECIFIC USER PAGE
      <h1>Hello</h1>
      {render}
    </div>
  )
}

UserPage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ({auth, quotes, filters}) => ({
  auth,
  quotes: quotes.quotes,
  filter: filters.activeFilter,
  search: filters.searchField
})

export default connect(mapStateToProps, {getQuotes, getFilteredQuotes})(UserPage)
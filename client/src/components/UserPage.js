import React, { Component, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getQuotes } from '../actions/quotes'

const UserPage = ({ getQuotes, auth, quotes }) => {
  useEffect(( )=> {
    getQuotes()
  }, [])
  let render
  if(quotes && auth.user !== null){
    render = quotes.map((quote, index) => {
      return <p key={index}>{quote.text}</p>
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

const mapStateToProps = ({auth, quotes}) => ({
  auth,
  quotes: quotes.quotes
})

export default connect(mapStateToProps, {getQuotes})(UserPage)
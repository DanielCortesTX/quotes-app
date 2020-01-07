import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const QuotesFeed = ({ auth }) => {

  useEffect(() => {

  },[])
  
  return (
    <div>
      SPECIFIC USER PAGE
      <h1>Hello {auth.user.username}</h1>
    </div>
  )
}

UserPage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ({quotes}) => ({
  auth
})

export default connect(mapStateToProps)(QuotesFeed)
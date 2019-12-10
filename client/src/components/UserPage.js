import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const UserPage = ({ auth }) => {
  return (
    <div>
      SPECIFIC USER PAGE
      <h1>{auth.user.username}</h1>
    </div>
  )
}

UserPage.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps)(UserPage)
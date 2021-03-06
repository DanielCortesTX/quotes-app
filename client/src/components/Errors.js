import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Errors = ({ errors }) => 
errors !== null && errors.length > 0 && errors.map(error => (
  <div key={error.id} className='error p-1 my-2'>
    { error.message }
  </div>
))

Errors.propTypes = {
  errors: PropTypes.array.isRequired
}

const mapStateToProps = ({error}) => ({
  errors: error
})

export default connect(mapStateToProps)(Errors)
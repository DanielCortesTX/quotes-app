import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Errors = ({ errors }) => 
errors !== null && errors.length > 0 && errors.map(error => (
  <div key={error.id} className={`error error-${error.errorType}`}>
    { error.message }
  </div>
))
// errors !== null && errors.length > 0 && errors.map(error => (
//   <div>
//     { error.message }
//   </div>
// ))

Errors.propTypes = {
  errors: PropTypes.array.isRequired
}

const mapStateToProps = ({error}) => ({
  errors: error
})

export default connect(mapStateToProps)(Errors)
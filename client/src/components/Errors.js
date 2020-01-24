import React from 'react'
import { connect } from 'react-redux'

const Errors = ({ errors }) => {
  return (
    <div>
    <h1>errors</h1>
  </div>
  )
}
// errors !== null && errors.length > 0 && errors.map(error => (
//   <div>
//     { error.message }
//   </div>
// ))

const mapStateToProps = ({errors}) => ({
  errors
})

export default connect(mapStateToProps)(Errors)
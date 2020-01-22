import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const QuoteDisplay = ({quote}) => {

  useEffect(() => {

  },[])
  
  return (
    <div className="card">
      <div>{quote.text}</div>
      <div>{quote.author}</div>
      <div>{quote.dateOfQuote}</div>
      <div>{quote.bodyOfWork}</div>
    </div>
  )
}

// UserPage.propTypes = {
//   auth: PropTypes.object.isRequired
// }

// const mapStateToProps = ({quotes}) => ({
//   auth
// })

// export default connect(mapStateToProps)(QuoteDisplay)
export default QuoteDisplay
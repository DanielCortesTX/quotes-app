import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const QuoteDisplay = ({match}) => {

  useEffect(() => {
    console.log(match.params.id)
  },[])
  
  return (
    <div className="card">
      <p className="display-4">INDIVIDUAL</p>
      <p>{match.params.id}</p>
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


// <div>{quote.text}</div>
//       <div>{quote.author}</div>
//       <div>{quote.dateOfQuote}</div>
//       <div>{quote.bodyOfWork}</div>
//       <button><Link className="btn-primary" to={``}>Details</Link></button>
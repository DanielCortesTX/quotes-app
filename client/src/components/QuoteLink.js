import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const QuoteDisplay = ({quote}) => {

  useEffect(() => {

  },[])
  
  return (
    <div className="quote-link p-1">
      <h3 className="">{quote.text.slice(0,30)}...</h3>
      <p>- {quote.author}</p>
      <Link className="btn-quote" to={`/display/${quote._id}`}>Details</Link>
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
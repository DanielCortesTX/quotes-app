import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const QuoteDisplay = ({quote}) => {

  useEffect(() => {

  },[])
  
  return (
    <div className="quote-link p-1">
      <h3 className="">{quote.text}</h3>
      <p>{quote.author}</p>
      <button  className="btn"><Link to={`/display/${quote._id}`}>Details</Link></button>
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
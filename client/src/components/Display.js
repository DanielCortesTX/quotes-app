import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { setActiveQuote } from '../actions/quotes'

const QuoteDisplay = ({match, setActiveQuote, quote, loading}) => {

  useEffect(() => {
    setActiveQuote(match.params.id)
  },[])

  let display

  if(!loading || quote === undefined){
    display = <h1>Loading</h1>
  } else {
    display = <div>
    <p className="display-4">INDIVIDUAL</p>
      <p>{match.params.id}</p>
      <p>{quote.text}</p>
    </div>
  }
  
  return (
    <div className="card">
      {display}
    </div>
  )
}

// UserPage.propTypes = {
//   auth: PropTypes.object.isRequired
// }

const mapStateToProps = ({quotes}) => ({
  quote: quotes.activeQuote,
  loading: quotes.isLoaded
})

export default connect(mapStateToProps, { setActiveQuote })(QuoteDisplay)
// export default QuoteDisplay


// <div>{quote.text}</div>
//       <div>{quote.author}</div>
//       <div>{quote.dateOfQuote}</div>
//       <div>{quote.bodyOfWork}</div>
//       <button><Link className="btn-primary" to={``}>Details</Link></button>
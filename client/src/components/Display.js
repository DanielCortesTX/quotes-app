import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loading from './frequents/Loading'
import { setActiveQuote } from '../actions/quotes'

const QuoteDisplay = ({match, setActiveQuote, quote, loading}) => {

  useEffect(() => {
    setActiveQuote(match.params.id)
  },[])

  let display

  if(!loading || quote === undefined){
    display = <Loading />
  } else {
    display = <div className="page p-1">
      <div className="quote-specifics">
        <h2>"{quote.text}"</h2>
        <p>-{quote.author}</p>
        <p>{quote.dateOfQuote}</p>
        <p>{quote.bodyOfWork}</p>
      </div>
    </div>
  }
  
  return (
    <div className="my-1">
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
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import Loading from '../components/frequents/Loading'
import { Link } from 'react-router-dom'
import { setActiveQuote } from '../actions/quotes'

const QuoteDisplay = ({match, setActiveQuote, quote, loading}) => {

  useEffect(() => {
    setActiveQuote(match.params.id)
  },[])

  let display

  if(!loading || quote === undefined){
    display = <Loading />
  } else {
    display = <div className="page p-1 quote-specifics">
      <div>
        <h1 className="display-text">"{quote.text}"</h1>
        <h3 className="display-author py-1">-{quote.author}</h3>
        <p>{quote.dateOfQuote ? quote.dateOfQuote : "No Date"}</p>
        <p>{quote.bodyOfWork ? quote.bodyOfWork: "No Body of work"}</p>
      </div>
      <Link to="/userpage" className="btn my-1">Back</Link>
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
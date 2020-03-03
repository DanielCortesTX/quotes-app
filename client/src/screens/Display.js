import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from '../components/frequents/Loading'
import { Link, withRouter } from 'react-router-dom'
import { setActiveQuote, deleteQuote } from '../actions/quotes'

const QuoteDisplay = ({match, setActiveQuote, deleteQuote, quote, loading, history}) => {

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
      <div className="display-btns">
        <Link to="/userpage" className="btn-display confirm my-1">Back</Link>
        <button className="btn-display delete my-1" onClick={() => deleteQuote(match.params.id, history)}>Delete</button>
        <Link to="/edit" className="btn-display edit my-1">edit</Link>
      </div>
    </div>
  }
  
  return (
    <div className="my-1">
      {display}
    </div>
  )
}

QuoteDisplay.propTypes = {
  quote: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
}

const mapStateToProps = ({quotes}) => ({
  setActiveQuote: PropTypes.func.isRequired,
  deleteQuote: PropTypes.func.isRequired,
  quote: quotes.activeQuote,
  loading: quotes.isLoaded
})

export default connect(mapStateToProps, { setActiveQuote, deleteQuote })(withRouter(QuoteDisplay))
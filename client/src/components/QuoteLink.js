import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const QuoteDisplay = ({quote}) => {

  useEffect(() => {

  },[])
  
  return (
    <div className="quote-link p-1">
      <h2>{quote.text.slice(0,30)}...</h2>
      <p>- {quote.author}</p>
      <Link className="btn-quote" to={`/display/${quote._id}`}>Details</Link>
    </div>
  )
}

export default QuoteDisplay
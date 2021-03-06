import React from 'react'
import QuoteLink from '../components/QuoteLink'

const UserFeed = ({ quotes, user, filter, filters, search }) => {
  let filterDisplay
  let renderDisplay

  if(filter === 'author'){
    filterDisplay = 'Author'
  } else if (filter === 'dateOfQuote'){
    filterDisplay = 'Year'
  } else if (filter === 'bodyOfWork'){
    filterDisplay = 'Body of Work'
  }

  if(quotes.length === 0){
    renderDisplay = <div className="no-quotes">
    <h1>No results</h1>
    <h1>Add quotes or refine your search</h1>
    </div>
  } else {
    renderDisplay = <div className="quotes-feed">
      {quotes.map((quote, index) => {
        return <QuoteLink key={index} quote={quote}/>
      })}
    </div>
  }

  return (
    <div>
      <h1 className="py-1">Hello {user.username}</h1>
      {quotes.length > 1 &&
        <div className="filter-display">
        {/* eslint-disable-next-line */}
        {filter !== "" || '' && <h3 className="p-1">Current filter = {filterDisplay}</h3>} 
        {/* eslint-disable-next-line */}
        {search !== "" || '' && <h3 className="p-1">Current search = {search}</h3>}
        </div>
      }
      <div className="">
        {renderDisplay}
      </div>
    </div>
  )
}

export default UserFeed
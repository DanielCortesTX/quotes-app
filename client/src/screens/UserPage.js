import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserFeed from '../components/UserFeed'
import { getQuotes } from '../actions/quotes'
import { getFilteredQuotes } from '../actions/quotes'

const UserPage = ({ getQuotes, quotes, filter, search, getFilteredQuotes, user }) => {
  useEffect(( )=> {
    if(filter && search !== ''){
      // adjust this....
      const formData = {filter, search }

      getFilteredQuotes(formData)
    } else {
      getQuotes()
    }
  }, [])
  let render
  if(quotes && user !== null){
    render = <UserFeed 
      quotes={quotes}  
      user={user}
      filter={filter}
      search={search}
    />
  } else {
    render = <h1>Sign in to view</h1>
  }
  return (
    <div className="my-1">
      <div className="page p-1">
        {render}
      </div>
    </div>
  )
}

UserPage.propTypes = {
  // auth: PropTypes.object.isRequired
}

const mapStateToProps = ({auth, quotes, filters}) => ({
  user: auth.user,
  quotes: quotes.quotes,
  filter: filters.activeFilter,
  search: filters.searchField
})

export default connect(mapStateToProps, {getQuotes, getFilteredQuotes})(UserPage)
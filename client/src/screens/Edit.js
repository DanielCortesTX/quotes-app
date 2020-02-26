import React, { Fragment, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { editQuote } from '../actions/quotes'

const Edit = ({ quote, editQuote, history }) => {
  const [formData, setFormData] = useState({
    'text': quote.text,
    'author': quote.author,
    'dateOfQuote': quote.dateOfQuote !== null ?  quote.dateOfQuote: '',
    'bodyOfWork': quote.bodyOfWork !== null ?  quote.bodyOfWork: ''
  })

  const { text, author, dateOfQuote, bodyOfWork } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()
    editQuote(quote._id, formData, history)
  }
  return (
    <Fragment>
      <div className="my-1">
        <div className="page p-1">
          <h1 className="py-1">Edit a quote</h1>
          <p>Edit your quote here. Text and author are required, but utilize date of quote and body of work for organization!</p>
          <form onSubmit={e => onSubmit(e)}  className="py-1 mx-1">
            <div className="py-1">
              <textarea 
                type="text"
                placeholder="Quote"
                name="text"
                value={text}
                className="search-select add-text text-body"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="py-1">
              <input 
                type="text"
                placeholder="Author"
                name="author"
                value={author}
                className="search-select add-text"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="py-1">
              <input 
                type="text"
                placeholder="Date of Quote"
                name="dateOfQuote"
                value={dateOfQuote}
                className="search-select add-text"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="py-1">
              <input 
                type="text"
                placeholder="Body of Work"
                name="bodyOfWork"
                value={bodyOfWork}
                className="search-select  add-text"
                onChange={e => onChange(e)}
              />
            </div>
            <input type="submit" className="btn-quote" value="Submit"/>      
          </form>
        </div>
      </div>
    </Fragment>
  )
}

Edit.propTypes = {
  editQuote: PropTypes.func.isRequired
}

const mapStateToProps = ({ quotes }) => ({
  quotes: quotes.quotes,
  quote: quotes.activeQuote
})

export default connect(mapStateToProps, { editQuote })(withRouter(Edit))
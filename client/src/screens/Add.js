import React, { Fragment, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addQuote } from '../actions/quotes'

const Add = ({ addQuote, history }) => {
  const [formData, setFormData] = useState({
    'text': '',
    'author': '',
    'dateOfQuote': '',
    'bodyOfWork': ''
  })

  const { text, author, dateOfQuote, bodyOfWork } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()
    
    addQuote(formData, history)
  }
  return (
    <Fragment>
      <div className="my-1">
        <div className="page p-1">
          <h1 className="py-1">Add a quote</h1>
          <p>Add your own quote here. Text and author are required, but utilize date of quote and body of work for organization!</p>
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

Add.propTypes = {
  addQuote: PropTypes.func.isRequired
}

const mapStateToProps = ({ quotes }) => ({
  quotes: quotes.quotes
})

export default connect(mapStateToProps, { addQuote })(withRouter(Add))
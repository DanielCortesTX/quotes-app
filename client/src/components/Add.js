import React, { Fragment, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addQuote } from '../actions/quotes'

const Add = ({ quotes, addQuote, history }) => {
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
      <h1>Add a quote</h1>
      <p>Add your own quote here. Text and author are required, but utilize date of quote and body of work for organization!</p>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input 
            type="text"
            placeholder="Quote"
            name="text"
            value={text}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input 
            type="text"
            placeholder="Author"
            name="author"
            value={author}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input 
            type="text"
            placeholder="Date of Quote"
            name="dateOfQuote"
            value={dateOfQuote}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input 
            type="text"
            placeholder="Body of Work"
            name="bodyOfWork"
            value={bodyOfWork}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-success" value="Submit"/>      
      </form>
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
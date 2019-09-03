import React, { Fragment, useState} from 'react'
import { Link, Redirect } from 'react-router-dom'

const Add = () => {
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

    console.log(formData)
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
        <input type="submit" className="btn btn-danger" value="Login"/>      
      </form>
    </Fragment>
  )
}

export default Add
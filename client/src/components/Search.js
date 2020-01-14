import React, { useState } from 'react'

const Search = () => {
  const [formData, setFormData] = useState({
    filter: 'author',
    search: ''
  })
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})
  const onSubmit = async e => {
    e.preventDefault()
    console.log(formData)
  }  
  return (
    <div>
      THis is the search page.
      <div className="card">
        <form onSubmit={e => onSubmit(e)}>
          <select onChange={e => onChange(e)}>
            <option>Author</option>
            <option>Year</option>
            <option>Body of Work</option>
          </select>
          <input 
            type="text"
            name="search"
            placeholder="Search for"
            onChange={e => onChange(e)}/>
          <input type="submit"/>
        </form>
      </div>
    </div>
  )
}

export default Search

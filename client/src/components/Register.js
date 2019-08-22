import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../actions/auth'

const Register = ({register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()

    register(username, password)
  }

  if(isAuthenticated){
    return <Redirect to="/add"/>
  }
  return (
    <Fragment>
      <h1>Register</h1>
      <p>Register for full experience</p>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input 
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input 
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-danger" value="Register"/>  
      </form>
      <p>Already signed up? 
        <Link to="/login">Sign In</Link></p>
    </Fragment>
  )
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = ({auth}) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, {register})(Register)
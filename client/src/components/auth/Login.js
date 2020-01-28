import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const { username, password } = formData

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value})

  const onSubmit = async e => {
    e.preventDefault()

    login(username, password)
  }

  if(isAuthenticated) {
    return <Redirect to="/userpage"/>
  }

  return (
    <Fragment>
      <h1>Login</h1>
      <p>Sign in for full experience</p>
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
        <input type="submit" className="btn btn-danger" value="Login"/>      
      </form>
      <p>Haven't signed up yet? 
        <Link to="/register">Register</Link></p>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
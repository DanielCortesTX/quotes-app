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
      <div className="my-3">
        <div className="page p-1">
          <h1 className="py-1">Login</h1>
          <p>Sign in for full experience</p>
          <form className="p-1 auth-body" onSubmit={e => onSubmit(e)}>
            <div>
              <input 
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                className="search-select add-text"
                onChange={e => onChange(e)}
              />
            </div>
            <div>
              <input 
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                className="search-select add-text"
                onChange={e => onChange(e)}
              />
            </div>
            <input type="submit" className="btn" value="Login"/>      
          </form>
          <div>
          </div>
          <p className="my-1">Haven't signed up yet? </p>
          <Link to="/register" className="btn my-1">Register</Link>
        </div>
      </div>
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
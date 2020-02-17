import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/auth'

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
    return <Redirect to="/userpage"/>
  }
  return (
    <Fragment>
      <div className="my-1">
        <div className="page p-1">
          <h1 className="py-1">Register</h1>
          <p>Register for full experience</p>
          <form className="p-1 auth-body" onSubmit={e => onSubmit(e)}>
            <div className="">
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
            <input type="submit" className="btn" value="Register"/>  
          </form>
          <div>
          <p className="my-1">Already signed up? </p>
          <Link to="/login" className="btn">Sign In</Link>
          </div>
        </div>
      </div>
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
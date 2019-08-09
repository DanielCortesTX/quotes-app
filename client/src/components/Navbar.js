import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

// @desc Navbar has different links depending on if user is logged in or is logged in as administrator

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logout()
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const unlogged = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/userpage">User page</Link>
        </li>
      </ul>
    )

    const loggedIn = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/add">Add</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/userpage">User page</Link>
        </li>
        <li>
          <button onClick={this.onLogoutClick.bind(this)}>Logout</button>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm bg-secondary navbar-dark p-3">
        <div className="container">
          <div className="navbar-nav">
            <Link className="navbar-brand" to="/">Home</Link>  
            <Link className="nav-link nav-item" to="/search">{' '}Search</Link>
          </div>
          {isAuthenticated ? loggedIn : unlogged} 
        </div>
      </nav>
    )
  }
}

// {isAuthenticated ? loggedIn : unlogged}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = ({auth}) => ({
  auth
})

export default connect(mapStateToProps, { logout })(Navbar)
// export default Navbar
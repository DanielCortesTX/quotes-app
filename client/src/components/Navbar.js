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
      <ul className="">
        <li className="">
          <Link className="" to="/login">Login</Link>
        </li>
        <li className="n">
          <Link className="" to="/register">Register</Link>
        </li>
      </ul>
    )

    const loggedIn = (
      <ul className="">
        <li>
          <Link className="" to="/search">{' '}Search</Link>
        </li>
        <li className="">
          <Link className="" to="/add">Add</Link>
        </li>
        <li className="">
          <Link className="" to="/userpage">User page</Link>
        </li>
        <li>
          <button onClick={this.onLogoutClick.bind(this)}>Logout</button>
        </li>
      </ul>
    )

    return (
      <nav className="navbar-h">
        <div className="">
          <Link className="" to="/">Home</Link>  
        </div>
        {isAuthenticated ? loggedIn : unlogged} 
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
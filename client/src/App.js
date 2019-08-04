import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Search from './components/Search'
import Add from './components/Add'
import Login from './components/Login'
import Register from './components/Register'
import UserPage from './components/UserPage'
import Navbar from './components/Navbar'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import './styles/style.scss'

if(localStorage.token){
  setAuthToken(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  store.dispatch(loadUser(decoded))
}

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/search" component={Search}/>
              <Route exact path="/add" component={Add}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/userpage" component={UserPage}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Search from './components/Search'
import Add from './components/Add'
import Login from './components/Login'
import Register from './components/Register'
import UserPage from './components/UserPage'
import Navbar from './components/Navbar'
import PrivateRoute from './components/routing/PrivateRoute'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import { loadAuthors, loadQuotes } from './actions/quotes'
import setAuthToken from './utils/setAuthToken'

import './styles/style.scss'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadAuthors())
    store.dispatch(loadQuotes())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/search" component={Search}/>
              
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <PrivateRoute exact path="/add" component={Add}/>
              <PrivateRoute exact path="/userpage" component={UserPage}/>
              
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
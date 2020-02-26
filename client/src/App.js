import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/Navbar'
import PrivateRoute from './components/routing/PrivateRoute'
import Errors from './components/Errors'
import Footer from './components/Footer'

import Home from './screens/Home'
import Login from './screens/auth/Login'
import Register from './screens/auth/Register'
import Search from './screens/Search'
import Add from './screens/Add'
import Edit from './screens/Edit'
import UserPage from './screens/UserPage'
import Display from './screens/Display'

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import { loadAuthors, getQuotes } from './actions/quotes'
import setAuthToken from './utils/setAuthToken'

import './styles/style.scss'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadAuthors())
    store.dispatch(getQuotes())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <section className="container">
            <Errors />
            <Switch>
              <Route exact path="/" component={Home}/>
              
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <PrivateRoute exact path="/search" component={Search}/>
              <PrivateRoute exact path="/add" component={Add}/>
              <PrivateRoute exact path="/edit" component={Edit}/>
              <PrivateRoute exact path="/display/:id" component={Display}/>
              <PrivateRoute exact path="/userpage" component={UserPage}/>
              
            </Switch>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
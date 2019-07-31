import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Search from './components/Search'
import Add from './components/Add'
import Login from './components/Login'
import Register from './components/Register'
import UserPage from './components/UserPage'
import Navbar from './components/Navbar'

import './styles/style.scss'

// import { Provider } from 'react-redux'

const App = () => {
  return (
    <div>
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
    </div>
  );
}

export default App;

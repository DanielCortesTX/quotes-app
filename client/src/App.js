import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import Search from './components/Search'

// import { Provider } from 'react-redux'

const App = () => {
  return (
    <div>
      <Router>
        <Fragment>
          <section>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/search" component={Search}/>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;

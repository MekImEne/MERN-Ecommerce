import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';

import Home from './containers/Home';
import Products from './containers/Products';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:slug" component={Products} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
